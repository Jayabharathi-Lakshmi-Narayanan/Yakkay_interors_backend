module.exports = (app) => {
    const router = require("express").Router();
    const notifyController = require("../controllers/notify.controller");

    router.post("/createnotify", notifyController.createNotification);
    router.get("/getnotify", notifyController.getNotification);

    app.use("/api/notify", router);
};
