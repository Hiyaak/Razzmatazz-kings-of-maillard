// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ApiService, { ImagePath } from "../../Services/Apiservice";

// const Qrorder = () => {
//   const { orderId } = useParams();

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     console.log("Order ID:", orderId);

//     if (orderId) {
//       fetchQRData(orderId);
//     } else {
//       setError("Invalid QR Code");
//       setLoading(false);
//     }
//   }, [orderId]);

//   const fetchQRData = async (id) => {
//     try {
//       const response = await fetch(
//         `https://dev.razzmatazz-hospitality.com/api/qr/order/${id}`,
//       );

//       const result = await response.json();

//       if (result.status) {
//         setData(result.data);
//       } else {
//         setError("Data not found");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
//   if (error) return <h3 style={{ textAlign: "center" }}>{error}</h3>;

//   const branch = data?.branch;

//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h2>QR Order Details</h2>

//       <p>
//         <b>Order ID:</b> {data?.orderId}
//       </p>

//       {/* BRAND LOGO */}
//       {branch?.brand?.logo && (
//         <img
//           src={branch.brand.logo}
//           alt="brand"
//           width="120"
//           style={{ marginBottom: 10 }}
//         />
//       )}

//       {/* BRANCH IMAGE */}
//       {/* {branch?.image && (
//         <img
//           src={`https://dev.razzmatazz-hospitality.com/${branch.image}`}
//           alt='branch'
//           width='200'
//           style={{ marginBottom: 10 }}
//         />
//       )} */}

//       {branch?.image ? (
//         <img
//           src={`https://dev.razzmatazz-hospitality.com/${branch.image}`}
//           alt="branch"
//           width="200"
//           style={{ marginBottom: 10 }}
//         />
//       ) : (
//         <p>No Branch Image</p>
//       )}

//       <h3>{branch?.name}</h3>

//       {/* LOCATION */}
//       {branch?.url && (
//         <div>
//           <a href={branch.url} target="_blank" rel="noreferrer">
//             Open Location
//           </a>
//         </div>
//       )}

//       {/* BRAND NAME */}
//       <h4>Brand</h4>
//       <p>{branch?.brand?.name?.en}</p>
//       <p>{branch?.brand?.name?.ar}</p>
//     </div>
//   );
// };

// export default Qrorder;

// import React, { useEffect, useState } from "react";

// const Qrorder = () => {
//   // ✅ Get orderId from HashRouter
//   const getOrderIdFromHash = () => {
//     const hash = window.location.hash;
//     const parts = hash.split("/");
//     return parts[2] || "";
//   };

//   const [orderId, setOrderId] = useState(getOrderIdFromHash());
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Language state
//   const [lang, setLang] = useState("en"); // default English

//   useEffect(() => {
//     if (orderId) {
//       fetchQRData(orderId);
//     } else {
//       setError("Invalid QR Code");
//       setLoading(false);
//     }
//   }, [orderId]);

//   const fetchQRData = async (id) => {
//     try {
//       const response = await fetch(
//         `https://dev.razzmatazz-hospitality.com/api/qr/order/${id}`
//       );

//       const result = await response.json();

//       if (result.status) {
//         setData(result.data);
//       } else {
//         setError("Data not found");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Image helper (with uploads fix)
//   const getImageUrl = (path) => {
//     if (!path) return "";
//     if (path.startsWith("http")) return path;
//     return `https://dev.razzmatazz-hospitality.com/uploads/${path}`;
//   };

//   if (loading)
//     return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

//   if (error)
//     return <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>;

//   const branch = data?.branch;

//   return (
//     <div
//       style={{
//         padding: "20px",
//         textAlign: "center",
//         direction: lang === "ar" ? "rtl" : "ltr",
//       }}
//     >
//       {/* 🔥 LANGUAGE TOGGLE */}
//       <div style={{ marginBottom: 20 }}>
//         <button
//           onClick={() => setLang("en")}
//           style={{
//             marginRight: 10,
//             padding: "6px 12px",
//             background: lang === "en" ? "#007bff" : "#ccc",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           EN
//         </button>

//         <button
//           onClick={() => setLang("ar")}
//           style={{
//             padding: "6px 12px",
//             background: lang === "ar" ? "#007bff" : "#ccc",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           AR
//         </button>
//       </div>

//       <h2>
//         {lang === "en" ? "QR Order Details" : "تفاصيل الطلب"}
//       </h2>

//       {/* ORDER ID */}
//       <p>
//         <b>{lang === "en" ? "Order ID:" : "رقم الطلب:"}</b>{" "}
//         {data?.orderId}
//       </p>

//       {/* BRAND LOGO */}
//       {branch?.brand?.logo && (
//         <img
//           src={getImageUrl(branch.brand.logo)}
//           alt="brand"
//           width="120"
//           style={{ marginBottom: 10 }}
//         />
//       )}

//       {/* BRANCH IMAGE */}
//       {branch?.image && (
//         <img
//           src={getImageUrl(branch.image)}
//           alt="branch"
//           width="200"
//           style={{ marginBottom: 10 }}
//         />
//       )}

//       {/* BRANCH NAME */}
// <h3>
//   {lang === "en"
//     ? branch?.name || "No Branch Name"
//     : branch?.name || "لا يوجد اسم"}
// </h3>

//       {/* LOCATION */}
//       {branch?.url && (
//         <div style={{ marginBottom: 10 }}>
//           <a href={branch.url} target="_blank" rel="noreferrer">
//             {lang === "en" ? "Open Location" : "افتح الموقع"}
//           </a>
//         </div>
//       )}

//       {/* BRAND NAME */}
//       <h4>{lang === "en" ? "Brand" : "العلامة التجارية"}</h4>

//       <p>
//         {lang === "en"
//           ? branch?.brand?.name?.en || "No Name"
//           : branch?.brand?.name?.ar || "لا يوجد اسم"}
//       </p>
//     </div>
//   );
// };

// export default Qrorder;

import React, { useEffect, useState } from "react";

const Qrorder = () => {
  // ✅ Get orderId from HashRouter
  const getOrderIdFromHash = () => {
    const hash = window.location.hash;
    const parts = hash.split("/");
    return parts[2] || "";
  };

  const [orderId, setOrderId] = useState(getOrderIdFromHash());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Language state
  const [lang, setLang] = useState("en");

  // ✅ Optional: persist language
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

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
        `https://dev.razzmatazz-hospitality.com/api/qr/order/${id}`,
      );

      const result = await response.json();

      if (result.status) {
        setData(result.data);
      } else {
        setError("Data not found");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Image helper
  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `https://dev.razzmatazz-hospitality.com/uploads/${path}`;
  };

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  if (error)
    return <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>;

  const branch = data?.branch;

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        direction: lang === "ar" ? "rtl" : "ltr",
      }}
    >
      {/* 🔥 LANGUAGE TOGGLE */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setLang("en")}
          style={{
            marginRight: 10,
            padding: "6px 12px",
            background: lang === "en" ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          EN
        </button>

        <button
          onClick={() => setLang("ar")}
          style={{
            padding: "6px 12px",
            background: lang === "ar" ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          AR
        </button>
      </div>

      <h2>{lang === "en" ? "QR Order Details" : "تفاصيل الطلب"}</h2>

      

      {/* ORDER ID */}
      <p>
        <b>{lang === "en" ? "Order ID:" : "رقم الطلب:"}</b> {data?.orderId}
      </p>

      {/* BRAND LOGO */}
      {branch?.brand?.logo && (
        <img
          src={getImageUrl(branch.brand.logo)}
          alt="brand"
          width="120"
          style={{ marginBottom: 10 }}
        />
      )}

      {/* LOCATION IMAGE */}
      {/* {branch?.loc_image && (
        <img
          src={getImageUrl(branch.loc_image)}
          alt="location"
          width="200"
          style={{ marginBottom: 10 }}
        />
      )} */}

      {/* ✅ LOCATION NAME (FIXED) */}
      {/* <h3>
        {lang === "en"
          ? branch?.locname || "No Location"
          : branch?.locname || "لا يوجد موقع"}
      </h3> */}
      <h3>
        {lang === "en"
          ? branch?.name || "No Branch Name"
          : branch?.name || "لا يوجد اسم"}
      </h3>

      {/* LOCATION LINK */}
      {/* {branch?.url && (
        <div style={{ marginBottom: 10 }}>
          <a href={branch.url} target="_blank" rel="noreferrer">
            {lang === "en" ? "Open Location" : "افتح الموقع"}
          </a>
        </div>
      )} */}

      {branch?.url && (
        <div className="mb-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.open(branch.url, "_blank")}
          >
            {lang === "en" ? "Open Location" : "افتح الموقع"}
          </button>
        </div>
      )}

      {/* BRAND NAME */}
      <h4>{lang === "en" ? "Brand" : "العلامة التجارية"}</h4>

      <p>
        {lang === "en"
          ? branch?.brand?.name?.en || "No Name"
          : branch?.brand?.name?.ar || "لا يوجد اسم"}
      </p>
    </div>
  );
};

export default Qrorder;
