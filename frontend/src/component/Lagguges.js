import React, { useState } from 'react';
import './Lagguges.css';

const Lagguges = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        emergency_first_name: '',
        emergency_last_name: '',
        emergency_phone_number: '',
        leave_date: '',
        leave_time: '',
        leave_time_period: 'AM',
        return_date: '',
        return_time: '',
        return_time_period: 'AM',
        luggage_type: '',
        luggage_description: '',
        luggage_photo: null,
        luggage_location: '',
    });
    const [disabled, setDisabled] = useState(true)
    // const [other_luggagetype, setOtherLuggageType] = useState('')

    const submitForm = (e) => {
        e.preventDefault();
        

        console.log(formData)
        // fetch('http://localhost:5000/api/lagguges', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         alert(data.message);
        //         console.log(data.body);
        //         setFormData({
        //             first_name: '',
        //             last_name: '',
        //             phone_number: '',
        //             email: '',
        //             emergency_first_name: '',
        //             emergency_last_name: '',
        //             emergency_phone_number: '',
        //             leave_date: '',
        //             leave_time: '',
        //             leave_time_period: 'AM',
        //             return_date: '',
        //             return_time: '',
        //             return_time_period: 'AM',
        //             luggage_type: '',
        //             luggage_description: '',
        //             luggage_photo: null,
        //             luggage_location: '',
        //         });
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    };

    const formatDateToYYYYMMDD = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const formatTimeToHHMMSS = (timeString) => {
        if (timeString.length === 5) {
            timeString += ":00.000";
        }
        return timeString;
    };

    const data = ['Hardside luggage',
                  'Softside Luggage',
                  'Carry-on Luggage',
                  'Duffel Bag',
                  'Travel Totes',
                  'Garment Bag',
                  'Backpack',
                  'Others',
                 ]

    const handleChange1 = (e) => {
        setFormData({ ...formData, luggage_type: e.target.value });

    }

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === 'leave_date' || name === 'return_date') {
            value = formatDateToYYYYMMDD(value);
        } else if (name === 'leave_time' || name === 'return_time') {
            value = formatTimeToHHMMSS(value);
        }

        if (name === 'luggage_type') {
            if (value === 'Others') {
                setFormData({ ...formData, luggage_type: value });
                setDisabled(false);
            } else {
                setFormData({ ...formData, luggage_type: value });
                setDisabled(true);
            }
        }
    
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <div className="container">
                <h1>Luggage Log Form</h1>
                <span className="line"></span>
                <form method="post" name="laggugesform" onSubmit={submitForm}>
                    <h2>Your Name</h2>

                    <div className="Name">
                        <div className="wrapper-container">
                            <label className="text-label" htmlFor="first_name"> First Name </label>
                            <input type="text" id="first_name" name="first_name" value={formData.first_name} required autoComplete="given-name" onChange={handleChange} />
                        </div>

                        <div className="wrapper-container">
                            <label className="text-label" htmlFor="last_name">Last Name</label>
                            <input type="text" id="last_name" name="last_name" value={formData.last_name} required autoComplete="given-name" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="contact">
                        <div className="wrapper-container">
                            <label className="text-label" htmlFor="phone_number">Contact Number</label>
                            <input type="tel" id="phone_number" name="phone_number" placeholder="(000) 000-0000" value={formData.phone_number} required autoComplete="given-name" onChange={handleChange} />
                        </div>
                        <div className="wrapper-container">
                            <label className="text-label" htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder="example@example.com" value={formData.email} required autoComplete="given-name" onChange={handleChange} />
                        </div>
                    </div>

                    <h2>Emergency Contact Person</h2>

                    <div className="Emergency-Contact">
                        <div className="wrapper-container">
                            <label className="text-label" htmlFor="emergency_first_name">First Name</label>
                            <input type="text" id="emergency_first_name" name="emergency_first_name" value={formData.emergency_first_name} required autoComplete="given-name" onChange={handleChange} />
                        </div>
                        <div className="wrapper-container">
                            <label className="text-label" htmlFor="emergency_last_name">Last Name</label>
                            <input type="text" id="emergency_last_name" name="emergency_last_name" value={formData.emergency_last_name} required autoComplete="given-name" onChange={handleChange} />
                        </div>
                        <div className="wrapper-container">
                            <label className="text-label" htmlFor="emergency_phone_number">Phone Number</label>
                            <input type="tel" id="emergency_phone_number" name="emergency_phone_number" placeholder="(000) 000-0000" value={formData.emergency_phone_number} required autoComplete="given-name" onChange={handleChange} />
                        </div>
                    </div>
                    <h2>When did you leave your luggage?</h2>

                    <div className="datetime-input">
                        <div className="wrapper-container">
                            <label className="text-label" htmlFor="leave_date">Date</label>
                            <input type="date" id="leave_date" name="leave_date" value={formData.leave_date} onChange={handleChange} required />
                        </div>

                        <div className="wrapper-container">
                            <label className="text-label" htmlFor="leave_time">Time</label>
                            <input type="time" id="leave_time" name="leave_time" value={formData.leave_time} onChange={handleChange} required />
                        </div>
                    </div>

                    <h2>When are you going to take it back?</h2>

                    <div className="datetime-input">
                        <div className="wrapper-container">
                            <label className="text-label" htmlFor="return_date">Date</label>
                            <input type="date" id="return_date" name="return_date" value={formData.return_date} onChange={handleChange} required />
                        </div>

                        <div className="wrapper-container">
                            <label className="text-label" htmlFor="return_time">Time</label>
                            <input type="time" id="return_time" name="return_time" value={formData.return_time} onChange={handleChange} required />
                        </div>
                    </div>

                    <h2>Type of Luggage:</h2>

                    <div className="toggle-switch-container">
                        {data.map((option) => (
                            <div className="toggle-switch" key={option}>
                                <input type="radio" id={`toggle_${option.toLowerCase().replace('', '')}`} name="luggage_type" value={option} className="toggle-radio"
                                    checked={formData.luggage_type === option} onChange={handleChange} />
                                <label htmlFor={`toggle_${option.toLowerCase().replace('', '')}`} className="toggle-label">
                                    {option}
                                </label>
                            </div>
                        ))}
                      {
                        disabled ? (
                            ""
                        ) : (
                            <div className="wrapper-container">
                            <input type="text" id="luggage_type" placeholder="Please type another option here..." value={formData.luggage_type} onChange={handleChange1}  />
                            </div>
                        )
                      }

                    </div>

                    <h2>How does your luggage look like?</h2>
                    <textarea name="luggage_description" placeholder="Type here..." spellCheck="false" value={formData.luggage_description} onChange={handleChange} required />

                    <h2>Take a photo of your luggage</h2>
                    <input type="file" id="luggage_photo" name="luggage_photo" accept="image/*" />

                    <h2>Luggage location</h2>
                    <select id="luggage_location" name="luggage_location" value={formData.luggage_location} onChange={handleChange}>
                        <option value="">Select a locker number</option>
                        {Array.from({ length: 1000 }, (_, index) => (
                            <option key={index + 1} value={`Locker ${index + 1}`}> Locker {index + 1}</option>
                        ))}
                    </select>

                    <button className="submit-btn" type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Lagguges;
