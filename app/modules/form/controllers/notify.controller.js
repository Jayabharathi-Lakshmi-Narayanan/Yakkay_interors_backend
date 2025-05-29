const notifyService = require("../services/notify.service");

exports.createNotification = async (req, res) => {
    const { name, email, number, projectId } = req.body;
    console.log("🔍 Incoming request from frontend:", req.body);
    if (!name || !email || !number) {
        return res.status(400).json({
            success: false,
            message: "Name, email, and number are required"
        });
    }

    try {
        const result = await notifyService.createNotification({ name, email, number, projectId });
        res.status(201).json(result);
    } catch (err) {
        console.error("Error creating notification:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getNotification = async (req, res) => {
    try {
        const result = await notifyService.getAllNotifications();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};  