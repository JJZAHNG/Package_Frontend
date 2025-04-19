// src/pages/OrderPage.tsx
import React, { useState } from "react";
import PackageStep from "../components/order/PackageStep";
import LocationStep from "../components/order/LocationStep";
import ScheduleStep from "../components/order/ScheduleStep";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/OrderPage.css";

const OrderPage: React.FC = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    packageType: "",
    weight: "",
    fragile: "", // "yes" / "no"
    description: "",
    pickup: {
      building: "",
      room: "",
      instructions: "",
    },
    delivery: {
      building: "",
      room: "",
    },
    speed: "",
    scheduleDate: "",
    scheduleTime: "",
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const submitOrder = () => {
    console.log("📦 提交订单：", formData);
    alert("订单已提交！");
    // TODO: 后续对接后端 POST 请求
  };

  return (
    <div className="order-wrapper">
      <Navbar />

      <StepIndicator step={step} />

      {step === 1 && (
        <PackageStep
          formData={formData}
          setFormData={setFormData}
          next={next}
        />
      )}

      {step === 2 && (
        <LocationStep
          formData={formData}
          setFormData={setFormData}
          next={next}
          back={back}
        />
      )}

      {step === 3 && (
        <ScheduleStep
          formData={formData}
          setFormData={setFormData}
          back={back}
          submit={submitOrder}
        />
      )}

      <Footer />
    </div>
  );
};

// 步骤导航组件
const StepIndicator: React.FC<{ step: number }> = ({ step }) => {
  const steps = ["📦 Package", "📍 Locations", "⏱️ Schedule"];
  return (
    <div className="step-indicator">
      {steps.map((label, index) => (
        <span key={index} className={step === index + 1 ? "active" : ""}>
          {label}
        </span>
      ))}
    </div>
  );
};

export default OrderPage;
