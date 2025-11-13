import { Scanner } from '@yudiel/react-qr-scanner';
import { Button, Container, Input, ScanArea, Text, Title } from '../components';
import Spinner from '../components/spinner';
import Modal from '../components/Modal';
import { useState, useEffect } from 'react';
import { vibrate } from '../utils/vibration';

const formats = [
  'qr_code',
  'micro_qr_code',
  'rm_qr_code',
  'maxi_code',
  'databar',
  'databar_expanded',
  'codabar',
  'code_39',
  'code_93',
  'code_128',
  'ean_8',
  'ean_13',
] as BarcodeFormat[]

export default function Search(props: {
  eventId: string,
  username: string,
  ticket?: any,
  isLoading?: boolean,
  currentSearch?: string
  searchType?: 'scan' | 'input',
  setSearhType?: (type: 'scan' | 'input') => any,
  togglePassed?: (ticket: any, onSuccess?: () => void) => any,
  search?: (value: string) => any,
  setTicket?: (ticket: any) => void
}) {
  const [ searchValue, setSearchValue ] = useState<string>('')
  const { searchType = 'scan', isLoading, ticket, currentSearch, setSearhType } = props

  const [modal, setModal] = useState<{open: boolean, status: 'success'|'error', message: string}>({open: false, status: 'success', message: ''});

  // Показываем модальное окно только при изменении статуса билета
  useEffect(() => {
    if (ticket && ticket.status === 'error') {
      setModal({open: true, status: 'error', message: 'Error'});
    }
  }, [ticket]);

  // Функция для показа модального окна успеха при изменении статуса
  const showSuccessModal = () => {
    setModal({open: true, status: 'success', message: 'Successfully'});
    // Попытка вызвать дополнительную вибрацию (может не сработать если прошло много времени после клика)
    // Основная вибрация уже вызвана синхронно в обработчике клика
    try {
      vibrate(150);
    } catch (e) {
      // Игнорируем ошибку, если вибрация не может быть вызвана асинхронно
    }
  };

  const isScan = searchType === 'scan'

  return (
    <Container>
      <Modal
        open={modal.open}
        status={modal.status}
        message={modal.message}
        onClose={() => {
          setModal(m => ({...m, open: false}));
          props.setTicket?.(null);
        }}
      />

      <Title>Event #{props.eventId}</Title>
      <Text size='12px' status='hint'>{props.username}</Text>
      <Button onClick={() => {
        vibrate(50);
        setSearhType?.(searchType === 'scan' ? 'input' : 'scan')
      }}>{!isScan ? 'Scan ticket with camera' : 'Find by id'}</Button>
      {!isScan ? 
        <Input value={searchValue} onChange={e => setSearchValue(e.currentTarget.value)} /> :
        <ScanArea>
          <Scanner
            formats={formats}
            onScan={(result) => {
              if (result[0]?.rawValue) {
                // Вибрация при сканировании QR-кода
                vibrate(200);
                props.search?.(result[0]?.rawValue)
              }
            }}
            components={{
              onOff: true,
              torch: true,
              zoom: true,
              finder: true,
            }}
          />
        </ScanArea>
      }
      {!ticket && !isLoading && isScan && <Text align='center'>Point the camera at the barcode/QR code part of the ticket to scan</Text>}
      {isLoading && <>
        <Text align='center'><Spinner size={16} /> Loading</Text>
      </>}
      {!isLoading && ticket && <Container style={{ justifyContent: 'space-between', flexDirection: 'row', minHeight: 0 }}>
        {!!ticket?.row && <div>
          <Text status='hint' inline>Row: </Text>
          <Text inline>{ticket.row}</Text>
        </div>}
        {!!ticket?.seat && <div>
          <Text status='hint' inline>Seat: </Text>
          <Text inline>{ticket.seat}</Text>
        </div>}
        <div>
          <Text status='hint' inline>Status: </Text>
          <Text status={ticket.status} inline>{ticket.message}</Text>
        </div>
      </Container>}
      {(!isScan && (ticket?.status === 'error' || currentSearch !== searchValue)) &&
        <Button
        
          onClick={() => {
            // Вибрация при нажатии кнопки поиска
            vibrate(100);
            props.search?.(searchValue)
          }}
          disabled={isLoading}
        >
          {isLoading ? <Spinner size={16} /> : 'Search'}
        </Button>
      }
        {ticket && ticket.status !== 'error' && <Button
          disabled={!ticket || isLoading}
          onClick={(e) => {
            // Вибрация для тактильного отклика при клике (синхронно в обработчике события)
            // Это важно для мобильных устройств, где вибрация должна быть в контексте user gesture
            vibrate(100);
            // Вызываем функцию изменения статуса
            props.togglePassed?.(ticket, showSuccessModal)
          }}
        >
        {ticket?.passed ? 'Revoke status' : 'Mark as scanned'}
        </Button>
      }
    </Container>
  )
}