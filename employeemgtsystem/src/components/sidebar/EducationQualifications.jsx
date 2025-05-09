import React, { useState } from "react";

export default function EducationQualifications({ onSubmit }) {
  const [academic, setAcademic] = useState([{ institution: "", details: "" }]);
  const [qualifications, setQualifications] = useState([
    { title: "", institution: "", duration: "" },
  ]);
  const [experience, setExperience] = useState([
    { title: "", company: "", duration: "", description: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ academic, qualifications, experience });
      alert("Details submitted!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded shadow-md max-w-4xl mx-auto h-full"
    >
      <div className="space-y-2">
        {/* Academic Records */}
        <div>
          <h2 className="text-base font-semibold mb-1">Academic Records</h2>
          {academic.map((item, i) => (
            <div key={i} className="mb-1 space-y-1">
              <input
                type="text"
                name="institution"
                required
                placeholder="Institution"
                className="w-full bg-blue-100 p-1.5 text-sm rounded"
                value={item.institution}
                onChange={(e) => {
                  const updated = [...academic];
                  updated[i].institution = e.target.value;
                  setAcademic(updated);
                }}
              />
              <input
                type="text"
                name="details"
                required
                placeholder="Details (e.g. B.Sc, Duration)"
                className="w-full bg-blue-100 p-1.5 text-sm rounded"
                value={item.details}
                onChange={(e) => {
                  const updated = [...academic];
                  updated[i].details = e.target.value;
                  setAcademic(updated);
                }}
              />
            </div>
          ))}
        </div>

        {/* Professional Qualifications */}
        <div>
          <h2 className="text-base font-semibold mb-1">Professional Qualifications</h2>
          {qualifications.map((item, i) => (
            <div key={i} className="mb-1 space-y-1">
              <input
                type="text"
                name="title"
                required
                placeholder="Title"
                className="w-full bg-blue-100 p-1.5 text-sm rounded"
                value={item.title}
                onChange={(e) => {
                  const updated = [...qualifications];
                  updated[i].title = e.target.value;
                  setQualifications(updated);
                }}
              />
              <input
                type="text"
                name="institution"
                required
                placeholder="Institution"
                className="w-full bg-blue-100 p-1.5 text-sm rounded"
                value={item.institution}
                onChange={(e) => {
                  const updated = [...qualifications];
                  updated[i].institution = e.target.value;
                  setQualifications(updated);
                }}
              />
              <input
                type="text"
                name="duration"
                required
                placeholder="Duration"
                className="w-full bg-blue-100 p-1.5 text-sm rounded"
                value={item.duration}
                onChange={(e) => {
                  const updated = [...qualifications];
                  updated[i].duration = e.target.value;
                  setQualifications(updated);
                }}
              />
            </div>
          ))}
        </div>

        {/* Work Experience */}
        <div>
          <h2 className="text-base font-semibold mb-1">Work Experience</h2>
          {experience.map((item, i) => (
            <div key={i} className="mb-1 space-y-1">
              <input
                type="text"
                name="jobTitle"
                required
                placeholder="Job Title"
                className="w-full bg-blue-100 p-1.5 text-sm rounded"
                value={item.title}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[i].title = e.target.value;
                  setExperience(updated);
                }}
              />
              <input
                type="text"
                name="company"
                required
                placeholder="Company"
                className="w-full bg-blue-100 p-1.5 text-sm rounded"
                value={item.company}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[i].company = e.target.value;
                  setExperience(updated);
                }}
              />
              <input
                type="text"
                name="duration"
                required
                placeholder="Duration"
                className="w-full bg-blue-100 p-1.5 text-sm rounded"
                value={item.duration}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[i].duration = e.target.value;
                  setExperience(updated);
                }}
              />
              <textarea
                name="description"
                required
                placeholder="Description"
                className="w-full bg-blue-100 p-1.5 text-sm rounded"
                value={item.description}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[i].description = e.target.value;
                  setExperience(updated);
                }}
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center mt-2">
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-1.5 text-sm rounded shadow"
          >
            Save Details
          </button>
        </div>
      </div>
    </form>
  );
}
