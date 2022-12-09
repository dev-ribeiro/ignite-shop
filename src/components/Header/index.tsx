import Link from 'next/link'
import Image from 'next/image'
import logoImage from '../../assets/logo.svg'
import { HeaderContainer, IconWrapper } from './styles'
import { Handbag } from 'phosphor-react'
import { useContext } from 'react'
import { StoreContext } from '../../contexts/StoreContext'

export function Header() {
  const { openCheckoutCart } = useContext(StoreContext)

  return (
    <HeaderContainer>
      <Link href="/" prefetch={false}>
        <Image src={logoImage} alt="" />
      </Link>
      <IconWrapper>
        <Handbag size={24} onClick={() => openCheckoutCart()} />
      </IconWrapper>
    </HeaderContainer>
  )
}
