import { createContext, ReactNode, useState } from 'react'

interface StoreContextType {
  showCheckoutCart: boolean
  checkoutPricesId: string[]
  openCheckoutCart: () => void
  closeCheckoutCart: () => void
  addProductToCheckout: (id) => void
  removeProductFromCheckout: (id) => void
}

export const StoreContext = createContext({} as StoreContextType)

interface StoreContextProviderType {
  children: ReactNode
}

export function StoreContextProvider({ children }: StoreContextProviderType) {
  const [showCheckoutCart, setShowCheckoutCart] = useState(false)
  const [checkoutPricesId, setCheckoutPricesId] = useState<string[]>([])

  function openCheckoutCart() {
    setShowCheckoutCart(true)
  }

  function closeCheckoutCart() {
    setShowCheckoutCart(false)
  }

  function addProductToCheckout(id: string) {
    setCheckoutPricesId((state) => {
      return [...state, id]
    })
  }

  function removeProductFromCheckout(id: string) {
    const processProducts = checkoutPricesId.filter((productId) => {
      return productId !== id
    })

    setCheckoutPricesId(processProducts)
  }

  return (
    <StoreContext.Provider
      value={{
        showCheckoutCart,
        checkoutPricesId,
        openCheckoutCart,
        closeCheckoutCart,
        addProductToCheckout,
        removeProductFromCheckout,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
