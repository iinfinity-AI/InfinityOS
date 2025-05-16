const Mood = require("../models/Mood");
const User = require("../models/User");

const saveMood = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res
        .status(400)
        .json({ error: "User is not authenticated or missing user ID." });
    }

    const { mood, note } = req.body;
    const user = req.user.userId;

    const newMood = new Mood({
      user,
      mood,
      note,
    });

    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAllMoods = async (req, res) => {
  try {
    const moods = await Mood.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: 'user',
        select: 'name' 
      });
    
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { saveMood, getMoods, getAllMoods };
