import Image from 'next/image'
import { X } from 'phosphor-react'
import { useContext } from 'react'
import { StoreContext } from '../../contexts/StoreContext'
import {
  CheckoutCartContainer,
  OrderPrice,
  OrderSummaryContainer,
  ProductCheckout,
  ProductCheckoutContainer,
} from './styles'

export function CheckoutCart() {
  const { showCheckoutCart, closeCheckoutCart } = useContext(StoreContext)

  if (!showCheckoutCart) {
    return <aside></aside>
  }

  return (
    <CheckoutCartContainer>
      <X size={22} onClick={() => closeCheckoutCart()} />
      <h2>Sacola de compras</h2>
      <ProductCheckoutContainer>
        <ProductCheckout>
          <Image
            src="https://files.stripe.com/links/MDB8YWNjdF8xTTZMREpLeGtHUFE2R295fGZsX3Rlc3RfRFVaR3B3aVBGbTZ4THE0WGF4azlRUW5V00e0T9g51o"
            alt=""
            width={102}
            height={93}
          />
          <span>Camisa beyond your limits</span>
          <h3>R$ 79,90</h3>
          <button>Remover</button>
        </ProductCheckout>
      </ProductCheckoutContainer>
      <OrderSummaryContainer>
        <div>
          <span>Quantidade</span>
          <span>3 itens</span>
        </div>
        <OrderPrice>
          <span>Valor total</span>
          <span>R$ 270,00</span>
        </OrderPrice>
        <button>Finalizar compra</button>
      </OrderSummaryContainer>
    </CheckoutCartContainer>
  )
}
