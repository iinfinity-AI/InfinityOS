import React from "react";

export default function FinancialDetails() {
  const bankData = {
    bankName: "CBE",
    accountNo: "100013455451",
    accountName: "Natnael melaku",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-black mb-4">Financial Details</h2>

        <div className="space-y-4">
          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Bank Name</label>
            <input
              type="text"
              value={bankData.bankName}
              readOnly
              className="w-full bg-blue-100 p-2 rounded"
            />
          </div>

          {/* Account No and Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Account No</label>
              <input
                type="text"
                value={bankData.accountNo}
                readOnly
                className="w-full font-semibold bg-blue-100 p-2 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Account Name</label>
              <input
                type="text"
                value={bankData.accountName}
                readOnly
                className="w-full bg-blue-100 p-2 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="pt-6 text-center">
        <button className="bg-green-700 text-white px-8 py-2 rounded shadow hover:bg-green-800">
          Update Account Details
        </button>
      </div>
    </div>
  );
}
