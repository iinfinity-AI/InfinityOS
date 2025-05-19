import React from "react";

const payrolls = [
  { name: "Aman", amount: "LKR 90,000", status: "Paid" },
  { name: "Gelila", amount: "LKR 110,000", status: "Processing" },
  { name: "Shaneli", amount: "LKR 50,000", status: "Processing" },
];

const getColor = (status) =>
  status === "Paid" ? "bg-green-600" : "bg-yellow-400";

const PayrollCard = () => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-bold mb-4">April Payrolls</h2>
    {payrolls.map((pay, index) => (
      <div key={index} className="mb-4">
        <p className="font-semibold">{pay.name}</p>
        <p className="text-sm text-gray-500">Salary Amount: {pay.amount}</p>
        <div className="h-2 bg-gray-200 rounded mt-1">
          <div
            className={`h-2 rounded ${getColor(pay.status)}`}
            style={{ width: pay.status === "Paid" ? "100%" : "50%" }}
          ></div>
        </div>
        <p className="text-xs text-gray-400">{pay.status}</p>
      </div>
    ))}
  </div>
);

export default PayrollCard;
