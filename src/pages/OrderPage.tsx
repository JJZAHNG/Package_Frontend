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
      instructions: "",
    },
    delivery: {
      building: "",
    },
    speed: "",
    scheduleDate: "",
    scheduleTime: "",
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const submitOrder = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("⚠️ 未登录，无法提交订单！");
      return;
    }

    // ✅ 构造符合后端要求的请求体
    const payload = {
      package_type: formData.packageType,
      weight: formData.weight,
      fragile: formData.fragile === "yes", // 转为布尔值
      description: formData.description,
      pickup_building: formData.pickup.building,
      pickup_instructions: formData.pickup.instructions,
      delivery_building: formData.delivery.building,
      delivery_speed: formData.speed,
      scheduled_date: formData.scheduleDate || null,
      scheduled_time: formData.scheduleTime || null,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        const data = await res.json();
        alert("✅ 订单提交成功！");
        console.log("✅ Created Order:", data);
        setStep(1);
        setFormData({
          packageType: "",
          weight: "",
          fragile: "",
          description: "",
          pickup: { building: "", instructions: "" },
          delivery: { building: "" },
          speed: "",
          scheduleDate: "",
          scheduleTime: "",
        });
      } else {
        const error = await res.json();
        console.error("❌ 提交失败", error);
        alert(`❌ 提交失败：${JSON.stringify(error)}`);
      }
    } catch (err) {
      console.error("请求错误", err);
      alert("网络错误，请稍后再试");
    }
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
