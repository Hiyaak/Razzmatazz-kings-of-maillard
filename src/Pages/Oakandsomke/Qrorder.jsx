import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Qrorder = () => {
  const { orderId } = useParams()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    console.log('Order ID:', orderId)

    if (orderId) {
      fetchQRData(orderId)
    } else {
      setError('Invalid QR Code')
      setLoading(false)
    }
  }, [orderId])

  const fetchQRData = async id => {
    try {
      const response = await fetch(
        `https://dev.razzmatazz-hospitality.com/api/qr/order/${id}`
      )

      const result = await response.json()

      if (result.status) {
        setData(result.data)
      } else {
        setError('Data not found')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <h3 style={{ textAlign: 'center' }}>Loading...</h3>
  if (error) return <h3 style={{ textAlign: 'center' }}>{error}</h3>

  const branch = data?.branch

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>QR Order Details</h2>

      <p>
        <b>Order ID:</b> {data?.orderId}
      </p>

      {/* BRAND LOGO */}
      {branch?.brand?.logo && (
        <img
          src={branch.brand.logo}
          alt='brand'
          width='120'
          style={{ marginBottom: 10 }}
        />
      )}

      {/* BRANCH IMAGE */}
      {branch?.image && (
        <img
          src={`https://dev.razzmatazz-hospitality.com/${branch.image}`}
          alt='branch'
          width='200'
          style={{ marginBottom: 10 }}
        />
      )}

      <h3>{branch?.name}</h3>

      {/* LOCATION */}
      {branch?.url && (
        <div>
          <a href={branch.url} target='_blank' rel='noreferrer'>
            Open Location
          </a>
        </div>
      )}

      {/* BRAND NAME */}
      <h4>Brand</h4>
      <p>{branch?.brand?.name?.en}</p>
      <p>{branch?.brand?.name?.ar}</p>
    </div>
  )
}

export default Qrorder
