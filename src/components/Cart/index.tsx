import Image from 'next/image'
import { X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { StoreContext } from '../../contexts/StoreContext'
import { api } from '../../lib/axios'
import { priceFormatter } from '../../utils/formatter'
import {
  CheckoutCartContainer,
  OrderPrice,
  OrderSummaryContainer,
  ProductCheckout,
  ProductCheckoutContainer,
} from './styles'

export function CheckoutCart() {
  const {
    checkout,
    removeProductFromCheckout,
    showCheckoutCart,
    closeCheckoutCart,
  } = useContext(StoreContext)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await api.post('/api/checkout', {
        checkout,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com Datadog ou Sentry
      setIsCreatingCheckoutSession(false)
      console.error(error)
      alert('Falha ao registrar o checkout')
    }
  }

  const orderSummaryPrice = checkout.reduce((acc, product) => {
    return acc + parseInt(product.price) / 100
  }, 0)

  if (!showCheckoutCart) {
    return <aside></aside>
  }

  return (
    <CheckoutCartContainer>
      <X size={22} onClick={() => closeCheckoutCart()} />
      <h2>Sacola de compras</h2>
      <ProductCheckoutContainer>
        {checkout.map((product) => {
          return (
            <ProductCheckout key={product.id}>
              <Image src={product.imageUrl} alt="" width={102} height={93} />
              <span>{product.name}</span>
              <h3>{priceFormatter.format(parseInt(product.price) / 100)}</h3>
              <button onClick={() => removeProductFromCheckout(product)}>
                Remover
              </button>
            </ProductCheckout>
          )
        })}
      </ProductCheckoutContainer>
      <OrderSummaryContainer>
        <div>
          <span>Quantidade</span>
          <span>{checkout.length} itens</span>
        </div>
        <OrderPrice>
          <span>Valor total</span>
          <span>{priceFormatter.format(orderSummaryPrice)}</span>
        </OrderPrice>
        <button
          onClick={() => handleBuyProduct()}
          disabled={isCreatingCheckoutSession}
        >
          Finalizar compra
        </button>
      </OrderSummaryContainer>
    </CheckoutCartContainer>
  )
}
