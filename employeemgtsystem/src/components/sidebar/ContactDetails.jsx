import React, { useState } from "react";

export default function ContactDetails({ onSubmit }) {
  const [form, setForm] = useState({
    phone1: "",
    phone2: "",
    email: "",
    city: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    alert("Form submitted successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md py-6 px-6 flex flex-col justify-between h-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number 1</label>
          <input
            type="tel"
            name="phone1"
            value={form.phone1}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded"
            required
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit number"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number 2</label>
          <input
            type="tel"
            name="phone2"
            value={form.phone2}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded"
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit number"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 text-sm font-medium">E-mail Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 text-sm font-medium">City of Residence</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 text-sm font-medium">Residential Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full bg-blue-100 p-2 rounded"
            required
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          Update
        </button>
      </div>
    </form>
  );
}
