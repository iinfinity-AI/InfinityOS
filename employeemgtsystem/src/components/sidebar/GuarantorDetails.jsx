import React, { useState } from "react";

export default function GuarantorDetails() {
  const [guarantors, setGuarantors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    occupation: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.occupation.trim()) newErrors.occupation = "Occupation is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10,}$/.test(form.phone)) newErrors.phone = "Enter a valid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setGuarantors([...guarantors, form]);
    setForm({ name: "", occupation: "", phone: "" });
    setErrors({});
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-lg font-semibold text-green-900 mb-4">
        View Guarantor Details
      </h2>

      {/* Scrollable content section */}
      <div className="flex-1 overflow-auto space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Guarantor’s Name</label>
            <input
              type="text"
              placeholder="Birhanu Alemu"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className={`w-full p-2 rounded bg-blue-100 border ${
                errors.name ? "border-red-500" : "border-transparent"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Title / Occupation</label>
            <input
              type="text"
              placeholder="Accountant"
              value={form.occupation}
              onChange={(e) => setForm({ ...form, occupation: e.target.value })}
              required
              className={`w-full p-2 rounded bg-blue-100 border ${
                errors.occupation ? "border-red-500" : "border-transparent"
              }`}
            />
            {errors.occupation && (
              <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone No</label>
            <input
              type="text"
              placeholder="09345545455"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className={`w-full p-2 rounded bg-blue-100 border ${
                errors.phone ? "border-red-500" : "border-transparent"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded shadow hover:bg-green-800"
            >
              Update
            </button>
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
    </div>
  );
}
