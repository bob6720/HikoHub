import React, { useState } from "react";
import Layout from "@/Layouts/MainLayout";
import "../../css/booking.css";
import axios from "axios";

export default function Booking() {
  const initialState = {
    event_name: "",
    organiser: "",
    business: "",
    contact_number: "",
    contact_email: "",
    event_date: "",
    start_time: "",
    end_time: "",
    number_of_people: "",
    parking: "",
    access_required: "",
    aircon_time: "",
    catering_required: "",
    caterer: "",
    catering_organiser: "",
    alcohol: "",
    catering_time_required: "",
    catering_gl_code: "",
    dietary_requirements: "",
    wants_equipment: "",
    av_equipment: "",
    chairs: "",
    tables: "",
    displays: "",
    marketing_signage: "",
    equipment_gl_code: "",
    wants_extras: "",
    boards: "",
    furniture: "",
    comms: "",
    for_visitors: "",
    music: "",
    arriving: "",
  };

  const [formData, setFormData] = useState(initialState);

  // calculate tomorrow for date min
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // update state when inputs change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // helper: build time string from hour + minute
  const setTime = (field, hour, minute) => {
    if (!hour && !minute) {
      setFormData({ ...formData, [field]: "" });
      return;
    }
    const h = (hour || "09").padStart(2, "0");
    const m = minute || "00";
    setFormData({ ...formData, [field]: `${h}:${m}` });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.start_time &&
      formData.end_time &&
      formData.end_time <= formData.start_time
    ) {
      alert("End time must be later than start time.");
      return;
    }

    try {
      const check = await axios.post("http://hikohub.test/check-booking", {
        event_date: formData.event_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
      });

      if (check.data.overlap) {
        alert("This time slot is already booked. Please choose another.");
        return;
      }

      const res = await axios.post("http://hikohub.test/bookings", formData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Booking submitted successfully.");
      console.log("Server response:", res.data);
      setFormData(initialState);
    } catch (err) {
      console.error("Booking error:", err.response || err);
      alert("Error submitting booking. Check console for details.");
    }
  };

  return (
    <Layout>
      <h1>Book Your Event Space</h1>
      <form onSubmit={handleSubmit}>
        {/* Box 1: Client Details */}
        <h2>Client Details</h2>
        <div className="client-details-box">
          <div className="form-row">
            <label>Event Name:</label>
            <input
              type="text"
              name="event_name"
              value={formData.event_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Organiser:</label>
            <input
              type="text"
              name="organiser"
              value={formData.organiser}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Business:</label>
            <input
              type="text"
              name="business"
              value={formData.business}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Contact Number:</label>
            <input
              type="tel"
              name="contact_number"
              placeholder="123-456-7890"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Contact Email:</label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Event Date:</label>
            <input
              type="date"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              min={minDate}
              required
            />
          </div>

          {/* Start Time */}
          <div className="form-row">
            <label>Start Time:</label>
            <div style={{ display: "flex", gap: "5px" }}>
              <select
                value={formData.start_time.split(":")[0] || ""}
                onChange={(e) =>
                  setTime(
                    "start_time",
                    e.target.value,
                    formData.start_time.split(":")[1]
                  )
                }
                required
              >
                <option value="">-- Hour --</option>
                {["09", "10", "11", "12", "13", "14", "15", "16", "17"].map(
                  (h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  )
                )}
              </select>

              <select
                value={formData.start_time.split(":")[1] || ""}
                onChange={(e) =>
                  setTime(
                    "start_time",
                    formData.start_time.split(":")[0],
                    e.target.value
                  )
                }
                required
              >
                <option value="">-- Min --</option>
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* End Time */}
          <div className="form-row">
            <label>End Time:</label>
            <div style={{ display: "flex", gap: "5px" }}>
              <select
                value={formData.end_time.split(":")[0] || ""}
                onChange={(e) =>
                  setTime(
                    "end_time",
                    e.target.value,
                    formData.end_time.split(":")[1]
                  )
                }
                required
              >
                <option value="">-- Hour --</option>
                {["09", "10", "11", "12", "13", "14", "15", "16", "17"].map(
                  (h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  )
                )}
              </select>

              <select
                value={formData.end_time.split(":")[1] || ""}
                onChange={(e) =>
                  setTime(
                    "end_time",
                    formData.end_time.split(":")[0],
                    e.target.value
                  )
                }
                required
              >
                <option value="">-- Min --</option>
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <label>Number of People:</label>
            <input
              type="number"
              name="number_of_people"
              value={formData.number_of_people}
              onChange={handleChange}
              min="1"
              max="500"
              required
            />
          </div>
        </div>

        {/* Box 2: Access & Facilities */}
        <h2>Access & Facilities</h2>
        <div className="client-details-box">
          <div className="form-row">
            <label>Parking:</label>
            <select
              name="parking"
              value={formData.parking}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-row">
            <label>Access Required:</label>
            <select
              name="access_required"
              value={formData.access_required}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-row">
            <label>Aircon Time:</label>
            <input
              type="time"
              name="aircon_time"
              value={formData.aircon_time}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Box 3: Catering */}
        <h2>Catering</h2>
        <div className="client-details-box">
          <div className="form-row">
            <label>Catering Required:</label>
            <input
              type="text"
              name="catering_required"
              value={formData.catering_required}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Caterer:</label>
            <input
              type="text"
              name="caterer"
              value={formData.caterer}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Organiser:</label>
            <input
              type="text"
              name="catering_organiser"
              value={formData.catering_organiser}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Alcohol:</label>
            <select
              name="alcohol"
              value={formData.alcohol}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-row">
            <label>Time Required:</label>
            <input
              type="text"
              name="catering_time_required"
              value={formData.catering_time_required}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>GL Code:</label>
            <input
              type="text"
              name="catering_gl_code"
              value={formData.catering_gl_code}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Dietary Requirements:</label>
            <input
              type="text"
              name="dietary_requirements"
              value={formData.dietary_requirements}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Box 4: Equipment */}
        <h2>Equipment</h2>
        <div className="client-details-box">
          <div className="form-row">
            <label>Wants Equipment:</label>
            <select
              name="wants_equipment"
              value={formData.wants_equipment}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-row">
            <label>AV Equipment:</label>
            <input
              type="text"
              name="av_equipment"
              value={formData.av_equipment}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Chairs:</label>
            <input
              type="number"
              name="chairs"
              value={formData.chairs}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Tables:</label>
            <input
              type="number"
              name="tables"
              value={formData.tables}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Displays:</label>
            <input
              type="text"
              name="displays"
              value={formData.displays}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Marketing Signage:</label>
            <input
              type="text"
              name="marketing_signage"
              value={formData.marketing_signage}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Equipment GL Code:</label>
            <input
              type="text"
              name="equipment_gl_code"
              value={formData.equipment_gl_code}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Box 5: Extras */}
        <h2>Extras</h2>
        <div className="client-details-box">
          <div className="form-row">
            <label>Wants Extras:</label>
            <select
              name="wants_extras"
              value={formData.wants_extras}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-row">
            <label>Boards:</label>
            <input
              type="text"
              name="boards"
              value={formData.boards}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Furniture:</label>
            <input
              type="text"
              name="furniture"
              value={formData.furniture}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Comms:</label>
            <input
              type="text"
              name="comms"
              value={formData.comms}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>For Visitors:</label>
            <select
              name="for_visitors"
              value={formData.for_visitors}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-row">
            <label>Music:</label>
            <select
              name="music"
              value={formData.music}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-row">
            <label>Arriving:</label>
            <input
              type="text"
              name="arriving"
              value={formData.arriving}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-submit">
          <button type="submit" className="submit-btn">
            Submit Booking
          </button>
        </div>
      </form>
    </Layout>
  );
}
