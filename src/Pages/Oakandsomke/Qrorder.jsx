import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
 
const Qrorder = () => {
  const { orderId } = useParams();
 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  useEffect(() => {
    if (orderId) {
      fetchQRData(orderId);
    } else {
      setError("Invalid QR Code");
      setLoading(false);
    }
  }, [orderId]);
 
  const fetchQRData = async (id) => {
    try {
      const response = await fetch(
        `https://dev.razzmatazz-hospitality.com/api/qr/order/${id}`
      );
 
      const result = await response.json();
 
      if (result.status) {
        setData(result.data);
      } else {
        setError("Data not found");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
 
  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;
 
  return (
<div style={{ padding: "20px", textAlign: "center" }}>
<h2>QR Order Details</h2>
 
      <p><b>Order ID:</b> {data.orderId}</p>
 
      {/* BRAND LOGO */}
      {data.branch.brand.logo && (
<img
          src={data.branch.brand.logo}
          alt="brand"
          width="120"
        />
      )}
 
      {/* BRANCH IMAGE */}
      {data.branch.image && (
<img
          src={`https://dev.razzmatazz-hospitality.com/${data.branch.image}`}
          alt="branch"
          width="200"
        />
      )}
 
      <h3>{data.branch.name}</h3>
 
      <a href={data.branch.url} target="_blank" rel="noreferrer">
        Open Location
</a>
 
      <h4>Brand</h4>
<p>{data.branch.brand.name.en}</p>
<p>{data.branch.brand.name.ar}</p>
</div>
  );
};
 
export default Qrorder;