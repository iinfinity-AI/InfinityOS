import React, { useState } from "react";

export default function FamilyDetails() {
  const [familyList, setFamilyList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    relationship: "",
    phone: "",
    address: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.relationship || !form.phone || !form.address) return;

    setFamilyList([...familyList, form]);
    setForm({ name: "", relationship: "", phone: "", address: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-lg font-semibold text-green-900 mb-4">
        View Family Details
      </h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Natnael Dawit"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-blue-100 p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Relationship</label>
            <input
              type="text"
              placeholder="Brother"
              value={form.relationship}
              onChange={(e) => setForm({ ...form, relationship: e.target.value })}
              className="w-full bg-blue-100 p-2 rounded"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Phone No</label>
            <input
              type="text"
              placeholder="0901234567"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-blue-100 p-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            placeholder="Djibouti street, Addis Ababa"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full bg-blue-100 p-2 rounded"
            required
          />
        </div>

        <div className="pt-2 text-center">
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded shadow hover:bg-green-800"
          >
            Update
          </button>
        </div>
      </form>

      {/* Display Section */}
      {familyList.length > 0 && (
        <div>
          <h3 className="text-base font-semibold mb-2">Family Details</h3>
          <div className="space-y-3">
            {familyList.map((f, index) => (
              <div key={index} className="bg-blue-100 p-4 rounded-lg">
                <p className="font-semibold text-sm">{f.name}</p>
                <p className="text-xs text-gray-700">
                  Relationship: {f.relationship} | Phone No: {f.phone}
                </p>
                <p className="text-xs text-gray-700">Address: {f.address}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
