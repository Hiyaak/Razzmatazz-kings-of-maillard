import React, { useEffect, useState } from "react";
import ApiService from "../../Services/Apiservice";
const API_URL = import.meta.env.VITE_API_URL;

const Qrorder = () => {
  const getOrderIdFromHash = () => {
    const hash = window.location.hash;
    const parts = hash.split("/");
    return parts[2] || "";
  };

  const [orderId, setOrderId] = useState(getOrderIdFromHash());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [lang, setLang] = useState("en");

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
      const response = await ApiService.get(`qr/order/${id}`);
      const result = response.data;

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

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API_URL}uploads/${path}`;
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

      <h3>
        {lang === "en"
          ? branch?.name || "No Branch Name"
          : branch?.name || "لا يوجد اسم"}
      </h3>

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
