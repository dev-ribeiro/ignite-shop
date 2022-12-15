import { createContext, ReactNode, useState } from 'react'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
}

interface StoreContextType {
  checkout: Product[]
  showCheckoutCart: boolean
  openCheckoutCart: () => void
  closeCheckoutCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCheckout: (product: Product) => void
}

interface StoreContextProviderType {
  children: ReactNode
}

export const StoreContext = createContext({} as StoreContextType)

export function StoreContextProvider({ children }: StoreContextProviderType) {
  const [checkout, setCheckout] = useState<Product[]>([])
  const [showCheckoutCart, setShowCheckoutCart] = useState(false)

  function openCheckoutCart() {
    setShowCheckoutCart(true)
  }

  function closeCheckoutCart() {
    setShowCheckoutCart(false)
  }

  function addProductToCart(product: Product) {
    setCheckout((state) => {
      return [...state, product]
    })
  }

  function removeProductFromCheckout(product: Product) {
    const deletedProduct = checkout.filter(
      (element) => element.id !== product.id,
    )

    setCheckout(deletedProduct)
  }

  return (
    <StoreContext.Provider
      value={{
        checkout,
        showCheckoutCart,
        openCheckoutCart,
        closeCheckoutCart,
        addProductToCart,
        removeProductFromCheckout,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
