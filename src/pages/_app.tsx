import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/App'
import { StoreContextProvider } from '../contexts/StoreContext'
import { CheckoutCart } from './components/CheckoutCart'
import { Header } from './components/Header'

globalStyles()

export default function App({ Component, pageProps }) {
  return (
    <StoreContextProvider>
      <Container>
        <CheckoutCart />
        <Header />
        <Component {...pageProps} />
      </Container>
    </StoreContextProvider>
  )
}
