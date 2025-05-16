import React, { useState, useEffect } from "react";
import axios from "axios";

const moodOptions = [
  "Very Happy",
  "Satisfied",
  "Neutral",
  "Sad",
  "Frustrated",
  "Stressed",
  "Tired",
];

const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  useEffect(() => {
    const checkMoodStatus = async () => {
      try {
        const res = await axios.get("/api/mood", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // Check if today mood already submitted
        const today = new Date().toISOString().slice(0, 10);
        if (res.data.some((entry) => entry.date.slice(0, 10) === today)) {
          setHasCheckedIn(true);
          setMessage("You have already checked in today.");
        }
      } catch (error) {
        console.error("Error checking mood:", error);
      }
    };
    checkMoodStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) {
      setMessage("Please select a mood.");
      return;
    }
    try {
      await axios.post(
        "/api/mood",
        { mood: selectedMood, note },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage("Mood check-in successful. Thank you!");
      setHasCheckedIn(true);
    } catch (error) {
      setMessage("Failed to submit mood.");
      console.error(error);
    }
  };

  if (hasCheckedIn) {
    return (
      <div className="bg-white p-6 rounded shadow mt-8 max-w-md">
        <p className="text-green-600">{message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow mt-8 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Daily Mood Check-In</h2>

      {message && (
        <p className={`mb-4 ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {moodOptions.map((mood) => (
            <label key={mood} className="mr-4">
              <input
                type="radio"
                name="mood"
                value={mood}
                checked={selectedMood === mood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="mr-1"
              />
              {mood}
            </label>
          ))}
        </div>

        <div>
          <label className="block mb-1 font-medium">Optional note (max 200 chars)</label>
          <textarea
            maxLength={200}
            className="w-full border p-2 rounded"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!selectedMood}
          className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          Submit Mood
        </button>
      </form>
    </div>
  );
};

export default MoodCheckIn;
