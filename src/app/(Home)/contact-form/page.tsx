"use client"
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    phone: '',
    area: '',
    location: '',
    budget: '',
    interiorTypes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('Email sent successfully!');
    } else {
      alert('Failed to send email.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="type">Type:</label>
      <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />

      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

      <label htmlFor="phone">Phone:</label>
      <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

      <label htmlFor="area">Area:</label>
      <input type="text" id="area" name="area" value={formData.area} onChange={handleChange} required />

      <label htmlFor="location">Location:</label>
      <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />

      <label htmlFor="budget">Budget:</label>
      <input type="text" id="budget" name="budget" value={formData.budget} onChange={handleChange} required />

      <label htmlFor="interiorTypes">Interior Types:</label>
      <input type="text" id="interiorTypes" name="interiorTypes" value={formData.interiorTypes} onChange={handleChange} required />

      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
