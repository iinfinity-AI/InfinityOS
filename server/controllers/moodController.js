const Mood = require("../models/Mood");

// POST /api/mood - Save mood
const saveMood = async (req, res) => {
  try {
    const { mood, note } = req.body;

    const newMood = new Mood({
      user: req.user.id,
      mood,
      note,
    });

    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/mood - Get moods
const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { saveMood, getMoods };
