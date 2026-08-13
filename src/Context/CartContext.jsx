import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const capQuantity = (item, requestedQty) => {
  if (!item?.maxQuantity || item.maxQuantity <= 0) return requestedQty

  if (requestedQty > item.maxQuantity) {
    toast.error(`Maximum ${item.maxQuantity} allowed per order`)
    return item.maxQuantity
  }

  return requestedQty
}

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [brandId, setBrandId] = useState(localStorage.getItem('brandId'))

  useEffect(() => {
    const handleStorageChange = () => {
      const newBrandId = localStorage.getItem('brandId')
      if (newBrandId !== brandId) {
        setBrandId(newBrandId)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [brandId])

  useEffect(() => {
    if (!brandId) return

    const savedCart = localStorage.getItem(`shoppingCart_${brandId}`)
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (err) {
        console.error('Invalid cart data', err)
        setCart([])
      }
    } else {
      setCart([])
    }
  }, [brandId])

  useEffect(() => {
    if (brandId) {
      localStorage.setItem(`shoppingCart_${brandId}`, JSON.stringify(cart))
    }
  }, [cart, brandId])

  const addToCart = item => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        cartItem => cartItem.cartItemId === item.cartItemId
      )

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart]

        if (item.type === 'catering') {
          updatedCart[existingIndex] = item
        } else {
          const current = updatedCart[existingIndex]
          const merged = {
            ...current,
            maxQuantity: item.maxQuantity ?? current.maxQuantity
          }
          updatedCart[existingIndex] = {
            ...merged,
            quantity: capQuantity(merged, current.quantity + 1)
          }
        }

        return updatedCart
      }

      return [
        ...prevCart,
        {
          ...item,
          maxQuantity: item.maxQuantity,
          quantity: 1
        }
      ]
    })
  }

  const removeFromCart = cartItemId => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId))
  }

  const updateQuantity = (cartItemId, newQuantity, maxQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartItemId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item => {
        if (item.cartItemId !== cartItemId) return item

        const merged = {
          ...item,
          maxQuantity: maxQuantity ?? item.maxQuantity
        }

        return {
          ...merged,
          quantity: capQuantity(merged, newQuantity)
        }
      })
    )
  }

  const clearCart = () => {
    setCart([])
    if (brandId) {
      localStorage.removeItem(`shoppingCart_${brandId}`)
    }
  }

  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const getCartItemsCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
