import React from "react";

export default function ContactDetails({ phone1, phone2, email, city, address }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-11 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number 1</label>
          <input type="text" value={phone1} readOnly className="w-full bg-blue-100 p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number 2</label>
          <input type="text" value={phone2} readOnly className="w-full bg-blue-100 p-2 rounded" />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 text-sm font-medium">E-mail Address</label>
          <input type="email" value={email} readOnly className="w-full bg-blue-100 p-2 rounded" />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 text-sm font-medium">City of Residence</label>
          <input type="text" value={city} readOnly className="w-full bg-blue-100 p-2 rounded" />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 text-sm font-medium">Residential Address</label>
          <textarea value={address} readOnly className="w-full bg-blue-100 p-2 rounded" />
        </div>
      </div>
      <div className="mt-6 text-center">
        <button className="bg-green-700 text-white px-6 py-2 rounded shadow">Update</button>
      </div>
    </div>
  );
}
