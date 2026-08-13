import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RightPanelLayout from '../../Layout/RightPanelLayout'
import { ImagePath } from '../../Services/Apiservice'
import { useCart } from '../../Context/CartContext'
import { useTranslation } from 'react-i18next'

const SubproductDetails = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const location = useLocation()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [disabledDates, setDisabledDates] = useState([])
  const { cart, addToCart, updateQuantity, getCartItemsCount } = useCart()
  const product = location.state?.product

  console.log('Product:', product)
  console.log('Cart:', cart)

  const cartItem = cart.find(
    item => item.cartItemId === `product-${product?._id}`
  )

  const quantity = cartItem ? cartItem.quantity : 0

  const brandId = localStorage.getItem('brandId')

  const { selectedMethod, selectedGovernate, selectedArea } = JSON.parse(
    localStorage.getItem(`selectedLocation_${brandId}`) || '{}'
  )

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      try {
        const year = selectedDate.getFullYear()
        const month = selectedDate.getMonth() + 1

        const response = await ApiService.post('getMonthlyDiyComboReport', {
          brandId: product?.brandId,
          year,
          month
        })

        if (response.data.status) {
          const exceededDates = response.data.report
            .filter(item => item.exceeded)
            .map(item => new Date(item._id))

          setDisabledDates(exceededDates)
        }
      } catch (error) {
        console.log('Report API error:', error)
      }
    }

    if (product?.brandId) {
      fetchMonthlyReport()
    }
  }, [selectedDate, product])

  const handleReviewOrder = () => {
    navigate('/shoopingcart')
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200 flex-shrink-0'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => navigate(-1)}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>

            <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
              {product?.name?.toUpperCase()}
            </h1>

            <div className='w-9' />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
          {/* Product Image */}
          <div className='w-full h-96'>
            <img
              src={`${ImagePath}${product?.image}`}
              alt={product?.name}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Product Info Section */}
          <div className=''>
            {/* Name + Quantity Row */}
            <div className='flex items-center justify-between'>
              {/* Left Side - Name & Price */}
              <div className='p-4'>
                <h2 className='text-xl font-semibold text-gray-900'>
                  {product?.name}
                </h2>

                <p className='text-red-600 font-medium mt-1'>
                  {product?.price} {t('ShoopingCart.KD')}
                </p>
              </div>

              {/* Right Side - Quantity Control */}
              {quantity === 0 ? (
                <button
                  onClick={() =>
                    addToCart({
                      cartItemId: `product-${product._id}`,
                      _id: product._id,
                      brandId: product.brandId,
                      product_id: product.product_id,
                      type: 'product',
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      maxQuantity: product.quantity
                    })
                  }
                  className='px-4 py-1 border border-red-600 text-red-600 rounded-full font-semibold mr-4'
                >
                  + {t('ShoopingCart.Add')}
                </button>
              ) : (
                <div className='flex items-center border rounded-full overflow-hidden mr-4'>
                  <button
                    onClick={() =>
                      updateQuantity(cartItem.cartItemId, quantity - 1)
                    }
                    className='px-3 py-1 text-red-600 font-bold'
                  >
                    -
                  </button>

                  <span className='px-4 py-1'>{quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        cartItem.cartItemId,
                        quantity + 1,
                        product.quantity
                      )
                    }
                    disabled={
                      product?.quantity > 0 && quantity >= product.quantity
                    }
                    className='px-3 py-1 text-red-600 font-bold disabled:opacity-40 disabled:cursor-not-allowed'
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className='border-b border-gray-200'>
              {/* Heading */}
              <div className='bg-gray-100 p-4'>
                <h2 className='text-base font-semibold text-gray-800'>
                  {t('PlaceOrder.Description')}
                </h2>
              </div>

              {/* Content */}
              <div className='p-4 space-y-3'>
                {/* API Description */}
                <p className='text-sm whitespace-pre-line'>
                  {product?.description}
                </p>
              </div>
            </div>
          </div>

          {!(selectedMethod && (selectedArea || selectedGovernate)) ? (
            <div className='p-3 bg-white flex-shrink-0'>
              <button
                onClick={() => navigate('/pickupdeviler')}
                className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-semibold py-3 rounded-lg transition-colors'
              >
                {t('brand.Selectlocation')}
              </button>
            </div>
          ) : (
            <div
              className='p-3 bg-white flex-shrink-0'
              onClick={handleReviewOrder}
            >
              <button className='w-full bg-[#FA0303] hover:bg-[#AF0202] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-between px-6'>
                {/* Left - Items Count */}
                <div className='flex items-center'>
                  <span className='bg-white/20 rounded-sm w-6 h-6 flex items-center justify-center text-sm'>
                    {getCartItemsCount()}
                  </span>
                </div>

                {/* Center - Review Order Text */}
                <span>{t('ShoopingCart.Review Order')}</span>

                {/* Right - Total Price */}
                <span>
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(3)}{' '}
                  {t('ShoopingCart.KD')}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Fixed, No Scroll */}
      <RightPanelLayout />
    </div>
  )
}

export default SubproductDetails
