import { Scanner } from '@yudiel/react-qr-scanner';
import { Button, Container, ScanArea, SubTitle, Text, Title } from '../components';

export default function Scan(props: {
  eventId: string,
  username: string,
}) {
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
          onScan={(result) => console.log(result)}
        />
      </ScanArea>
      <Text>Point the camera at the barcode/QR code part of the ticket to scan</Text>
      <Button disabled>Mark as used</Button>
    </Container>
  )
}