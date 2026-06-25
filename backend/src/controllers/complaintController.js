const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  try {
    const { citizenName, category, description } = req.body;

    if (!citizenName || !category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const trackingId = "DESC-" + Date.now();

    const complaint = await Complaint.create({
      trackingId,
      citizenName,
      category,
      description,
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
};