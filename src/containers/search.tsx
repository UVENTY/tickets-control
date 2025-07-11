import { Scanner } from '@yudiel/react-qr-scanner';
import { Button, Container, Input, ScanArea, Text, Title } from '../components';
import Spinner from '../components/spinner';
import Modal from '../components/Modal';
import { useState, useEffect } from 'react';

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
  togglePassed?: (ticket: any, onSuccess?: () => void) => any
  search?: (value: string) => any
}) {
  const [ searchValue, setSearchValue ] = useState<string>('')
  const { searchType = 'scan', isLoading, ticket, currentSearch, setSearhType } = props

  const [modal, setModal] = useState<{open: boolean, status: 'success'|'error', message: string}>({open: false, status: 'success', message: ''});

  // Показываем модальное окно только при изменении статуса билета
  useEffect(() => {
    if (ticket && ticket.status === 'error') {
      setModal({open: true, status: 'error', message: 'Error'});
    }
  }, [ticket?.status === 'error']);

  // Функция для показа модального окна успеха при изменении статуса
  const showSuccessModal = () => {
    setModal({open: true, status: 'success', message: 'Successfully'});
  };

  const isScan = searchType === 'scan'

  return (
    <Container>
      <Modal
        open={modal.open}
        status={modal.status}
        message={modal.message}
        onClose={() => setModal(m => ({...m, open: false}))}
      />
      <Title>Event #{props.eventId}</Title>
      <Text size='12px' status='hint'>{props.username}</Text>
      <Button onClick={() => setSearhType?.(searchType === 'scan' ? 'input' : 'scan')}>{!isScan ? 'Scan ticket with camera' : 'Find by id'}</Button>
      {!isScan ? 
        <Input value={searchValue} onChange={e => setSearchValue(e.currentTarget.value)} /> :
        <ScanArea>
          <Scanner
            formats={formats}
            onScan={(result) => {
              if (result[0]?.rawValue) {
                // Вибрация на 200 мс
                if (window.navigator.vibrate) {
                  window.navigator.vibrate(200);
                }
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
            console.log('Кнопка поиска нажата, значение:', searchValue);
            props.search?.(searchValue)
          }}
          disabled={isLoading}
        >
          {isLoading ? <Spinner size={16} /> : 'Search'}
        </Button>
      }
        {ticket && ticket.status !== 'error' && <Button
          disabled={!ticket || isLoading}
          onClick={() => props.togglePassed?.(ticket, showSuccessModal)}
        >
        {ticket?.passed ? 'Revoke status' : 'Mark as scanned'}
        </Button>
      }
    </Container>
  )
}