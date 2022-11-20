import { globalStyles } from '../styles/global'
import logoImage from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/App'

globalStyles()

export default function App({ Component, pageProps }) {
  return (
    <Container>
      <Header>
        <img src={logoImage.src} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
