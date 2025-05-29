const db = require("../../../models");
const Notification = db.notify;

exports.createNotification = async (data) => {
    const { name, email, number, projectId } = data;

    if (!name || !email || !number) {
        throw new Error("All fields (name, email, number) are required.");
    }

    const saved = await Notification.create({
        name,
        email,
        number,
        projectId: projectId || null,
    });

    return {
        success: true,
        message: "Notification saved successfully.",
        data: saved,
    };
};

exports.getAllNotifications = async () => {
    const notifications = await Notification.findAll({
        order: [["createdAt", "DESC"]],
    });

    return {
        success: true,
        data: notifications,
    };
};
