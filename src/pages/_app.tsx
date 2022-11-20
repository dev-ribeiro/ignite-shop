import { globalStyles } from '../styles/global'
import logoImage from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/App'
import Image from 'next/image'

globalStyles()

export default function App({ Component, pageProps }) {
  return (
    <Container>
      <Header>
        <Image src={logoImage} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
