import { createContext, ReactNode, useState } from 'react'

interface StoreContextType {
  showCheckoutCart: boolean
  openCheckoutCart: () => void
  closeCheckoutCart: () => void
}

export const StoreContext = createContext({} as StoreContextType)

interface StoreContextProviderType {
  children: ReactNode
}

export function StoreContextProvider({ children }: StoreContextProviderType) {
  const [showCheckoutCart, setShowCheckoutCart] = useState(false)

  function openCheckoutCart() {
    setShowCheckoutCart(true)
  }

  function closeCheckoutCart() {
    setShowCheckoutCart(false)
  }

  return (
    <StoreContext.Provider
      value={{ showCheckoutCart, openCheckoutCart, closeCheckoutCart }}
    >
      {children}
    </StoreContext.Provider>
  )
}
