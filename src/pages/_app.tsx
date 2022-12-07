import { globalStyles } from '../styles/global'
import logoImage from '../assets/logo.svg'
import { Container, Header, IconWrapper } from '../styles/pages/App'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { StoreContextProvider } from './contexts/StoreContext'

globalStyles()

export default function App({ Component, pageProps }) {
  return (
    <StoreContextProvider>
      <Container>
        <Header>
          <Link href="/" prefetch={false}>
            <Image src={logoImage} alt="" />
          </Link>
          <IconWrapper>
            <Handbag size={24} />
          </IconWrapper>
        </Header>
        <Component {...pageProps} />
      </Container>
    </StoreContextProvider>
  )
}
