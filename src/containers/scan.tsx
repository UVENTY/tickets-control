import { Scanner } from '@yudiel/react-qr-scanner';
import { Button, Container, ScanArea, SubTitle, Text, Title } from '../components';
import Spinner from '../components/spinner';

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

export default function Scan(props: {
  eventId: string,
  username: string,
  status?: string,
  ticket?: any,
  onScan?: (value: string) => any
}) {
  const { status, ticket } = props
  console.log(status, ticket);
  
  return (
    <Container>
      <Title>Event #{props.eventId}</Title>
      <SubTitle>{props.username}</SubTitle>
      <Button>Find by id</Button>
      <ScanArea>
        <div className='corner lt' />
        <div className='corner rt' />
        <div className='corner lb' />
        <div className='corner rb' />
        <Scanner
          styles={{ container: { position: 'absolute', inset: 0, zIndex: 10 } }}
          formats={formats}
          // @ts-ignore
          onScan={(result) => console.log(result[0]) || props.onScan?.(result[0]?.rawValue)}
          components={{
            audio: true,
            onOff: true,
            torch: true,
            zoom: true,
            finder: true,
          }}
        />
      </ScanArea>
      {(!status || status === 'idle') && <Text>Point the camera at the barcode/QR code part of the ticket to scan</Text>}
      {(status === 'searching' || status === 'checking') && <>
        <Spinner /> <Text>{status}</Text>
      </>}
      {status === 'found' && <>
        <Text status='success'>Ticket found</Text>
        <Text>{ticket.pass === '0' ? 'Not passed' : 'Passed'}</Text>
      </>}
      {status === 'error' && <Text status='error'>Not found</Text>}
      <Button disabled>Mark as used</Button>
    </Container>
  )
}