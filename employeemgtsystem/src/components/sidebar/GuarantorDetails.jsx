import React, { useState } from "react";

export default function GuarantorDetails() {
  const [guarantors, setGuarantors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    occupation: "",
    phone: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.occupation || !form.phone) return;

    setGuarantors([...guarantors, form]);
    setForm({ name: "", occupation: "", phone: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-lg font-semibold text-green-900 mb-4">
        View Guarantor Details
      </h2>

      {/* Scrollable content section */}
      <div className="flex-1 overflow-auto space-y-8">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Guarantor’s Name</label>
            <input
              type="text"
              placeholder="Birhanu Alemu"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-blue-100 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Title / Occupation</label>
            <input
              type="text"
              placeholder="Accountant"
              value={form.occupation}
              onChange={(e) => setForm({ ...form, occupation: e.target.value })}
              className="w-full bg-blue-100 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone No</label>
            <input
              type="text"
              placeholder="09345545455"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-blue-100 p-2 rounded"
              required
            />
          </div>
        </form>

        {/* Display Section */}
        {guarantors.length > 0 && (
          <div>
            <h3 className="text-base font-semibold mb-2">Guarantor Details</h3>
            <div className="space-y-3">
              {guarantors.map((g, index) => (
                <div key={index} className="bg-blue-100 p-4 rounded-lg">
                  <p className="font-semibold text-sm">{g.name}</p>
                  <p className="text-xs text-gray-700">
                    {g.occupation} – {g.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Update Button at Bottom */}
      <div className="pt-4 mt-6 text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-700 text-white px-6 py-2 rounded shadow hover:bg-green-800"
        >
          Update
        </button>
      </div>
    </div>
  );
}
