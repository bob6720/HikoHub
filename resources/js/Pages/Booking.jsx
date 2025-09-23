import React from 'react';
import Layout from '@/Layouts/MainLayout'; 
import "../../css/booking.css";

export default function Booking() {
	return (
		<Layout>
			<h1>Book Your Event Space</h1>

			{/* Box 1: Client Details */}
			<h2 >Client Details</h2>
			<div className="client-details-box">
				<div className="form-row">
					<label>Event Name:</label>
					<input type="text" name="event_name" placeholder="Type Event Name" />
				</div>
				<div className="form-row">
					<label>Organiser:</label>
					<input type="text" name="organiser" placeholder="Type Organiser Name" />
				</div>
				<div className="form-row">
					<label>Business:</label>
					<input type="text" name="business" placeholder="Type Business Name" />
				</div>
				<div className="form-row">
					<label>Contact Number:</label>
					<input type="tel" name="contact_number" placeholder="123-456-7890" />
				</div>
				<div className="form-row">
					<label>Contact Email:</label>
					<input type="email" name="contact_email" placeholder="example@email.com" />
				</div>
				<div className="form-row">
					<label>Event Date:</label>
					<input type="date" name="event_date" />
				</div>
				<div className="form-row">
					<label>Start Time:</label>
					<input type="time" name="start_time" />
				</div>
				<div className="form-row">
					<label>End Time:</label>
					<input type="time" name="end_time" />
				</div>
				<div className="form-row">
					<label>Number of People:</label>
					<input type="number" name="number_of_people" placeholder="e.g. 50" />
				</div>
			</div>

			{/* Box 2: Access & Facilities */}
			<h2 className="text-2xl font-bold mb-4 mt-8">Access & Facilities</h2>
			<div className="client-details-box">
				<div className="form-row">
					<label>Parking:</label>
					<select name="parking">
						<option value="">-- Select --</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div className="form-row">
					<label>Access Required:</label>
					<select name="access_required">
						<option value="">-- Select --</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div className="form-row">
					<label>Aircon Time:</label>
					<input type="text" name="aircon_time" placeholder="e.g. 9am - 5pm" />
				</div>
			</div>

			{/* Box 3: Catering */}
			<h2 className="text-2xl font-bold mb-4 mt-8">Catering</h2>
			<div className="client-details-box">
				<div className="form-row">
					<label>Catering Required:</label>
					<input type="text" name="catering_required" placeholder="Specify requirements" />
				</div>
				<div className="form-row">
					<label>Caterer:</label>
					<input type="text" name="caterer" placeholder="Type Caterer Name" />
				</div>
				<div className="form-row">
					<label>Organiser:</label>
					<input type="text" name="catering_organiser" placeholder="Who is organising the catering?" />
				</div>
				<div className="form-row">
					<label>Alcohol:</label>
					<select name="alcohol">
						<option value="">-- Select --</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div className="form-row">
					<label>Time Required:</label>
					<input type="text" name="catering_time_required" placeholder="e.g. 6pm - 8pm" />
				</div>
				<div className="form-row">
					<label>GL Code:</label>
					<input type="text" name="catering_gl_code" placeholder="Enter GL code" />
				</div>
				<div className="form-row">
					<label>Dietary Requirements:</label>
					<input type="text" name="dietary_requirements" placeholder="List dietary needs" />
				</div>
			</div>

			{/* Box 4: Equipment */}
			<h2 className="text-2xl font-bold mb-4 mt-8">Equipment</h2>
			<div className="client-details-box">
				<div className="form-row">
					<label>Wants Equipment:</label>
					<select name="wants_equipment">
						<option value="">-- Select --</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div className="form-row">
					<label>AV Equipment:</label>
					<input type="text" name="av_equipment" placeholder="Projector, Microphones..." />
				</div>
				<div className="form-row">
					<label>Chairs:</label>
					<input type="number" name="chairs" placeholder="Number of Chairs" />
				</div>
				<div className="form-row">
					<label>Tables:</label>
					<input type="number" name="tables" placeholder="Number of Tables" />
				</div>
				<div className="form-row">
					<label>Displays:</label>
					<input type="text" name="displays" placeholder="Specify Displays" />
				</div>
				<div className="form-row">
					<label>Marketing Signage:</label>
					<input type="text" name="marketing_signage" placeholder="Banners, Posters..." />
				</div>
				<div className="form-row">
					<label>Equipment GL Code:</label>
					<input type="text" name="equipment_gl_code" placeholder="Enter GL code" />
				</div>
			</div>

			{/* Box 5: Extras */}
			<h2 className="text-2xl font-bold mb-4 mt-8">Extras</h2>
			<div className="client-details-box">
				<div className="form-row">
					<label>Wants Extras:</label>
					<select name="wants_extras">
						<option value="">-- Select --</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div className="form-row">
					<label>Boards:</label>
					<input type="text" name="boards" placeholder="Whiteboards, Noticeboards..." />
				</div>
				<div className="form-row">
					<label>Furniture:</label>
					<input type="text" name="furniture" placeholder="Sofas, Stools..." />
				</div>
				<div className="form-row">
					<label>Comms:</label>
					<input type="text" name="comms" placeholder="WiFi, Phone, etc." />
				</div>
				<div className="form-row">
					<label>For Visitors:</label>
					<select name="for_visitors">
						<option value="">-- Select --</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div className="form-row">
					<label>Music:</label>
					<select name="music">
						<option value="">-- Select --</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div className="form-row">
					<label>Arriving:</label>
					<input type="text" name="arriving" placeholder="Arrival details" />
				</div>
			</div>
      {/* Submit Button */}
				<div className="form-submit">
					<button type="submit" className="submit-btn">
						Submit Booking
					</button>
				</div>
		</Layout>
	);
}
