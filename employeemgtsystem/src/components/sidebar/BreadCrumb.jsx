import React from "react";

export default function BreadCrumb({ current }) {
  return (
    <p className="text-gray-500 mb-4">
      Dashboard &gt; {current}
    </p>
  );
}
