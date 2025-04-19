import React from 'react';

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  next: () => void;
  back: () => void;
}

const LocationStep: React.FC<Props> = ({ formData, setFormData, next, back }) => {
  return (
    <div className="step-container">
      <h2>Pickup & Delivery</h2>
      <p>Where should we pick up and deliver your package?</p>

      {/* Pickup */}
      <h3>Pickup Location</h3>
      <label>Building</label>
      <select
        value={formData.pickup.building}
        onChange={(e) =>
          setFormData({
            ...formData,
            pickup: { ...formData.pickup, building: e.target.value },
          })
        }
      >
        <option value="">Select building</option>
        <option value="Library">Library</option>
        <option value="Dorm A">Dorm A</option>
        <option value="Cafeteria">Cafeteria</option>
      </select>

      <label>Room/Office Number</label>
      <input
        type="text"
        placeholder="e.g., 101, Office 3B"
        value={formData.pickup.room}
        onChange={(e) =>
          setFormData({
            ...formData,
            pickup: { ...formData.pickup, room: e.target.value },
          })
        }
      />

      <label>Pickup Instructions (Optional)</label>
      <textarea
        value={formData.pickup.instructions}
        onChange={(e) =>
          setFormData({
            ...formData,
            pickup: { ...formData.pickup, instructions: e.target.value },
          })
        }
      />

      {/* Delivery */}
      <h3>Delivery Location</h3>
      <label>Building</label>
      <select
        value={formData.delivery.building}
        onChange={(e) =>
          setFormData({
            ...formData,
            delivery: { ...formData.delivery, building: e.target.value },
          })
        }
      >
        <option value="">Select building</option>
        <option value="Engineering">Engineering</option>
        <option value="Admin Office">Admin Office</option>
        <option value="Dorm B">Dorm B</option>
      </select>

      <label>Room/Office Number</label>
      <input
        type="text"
        placeholder="e.g., 101, Office 3B"
        value={formData.delivery.room}
        onChange={(e) =>
          setFormData({
            ...formData,
            delivery: { ...formData.delivery, room: e.target.value },
          })
        }
      />

      <div className="step-buttons">
        <button className="btn-outline" onClick={back}>← Back</button>
        <button className="btn-solid" onClick={next}>Continue →</button>
      </div>
    </div>
  );
};

export default LocationStep;
