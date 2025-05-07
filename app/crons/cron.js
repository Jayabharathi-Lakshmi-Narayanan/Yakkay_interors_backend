require("dotenv").config();
const cron = require("node-cron");
const db = require("../models");
const moment = require("moment-timezone");
const nodemailer = require("nodemailer");

console.log("✅ Cron job initialized...");

cron.schedule("30 4 * * *", async () => {
    console.log("📬 Cron job running: Sending form summary email...");

    try {
        const todayStart = moment().tz("Asia/Kolkata").startOf("day").toDate();
        const todayEnd = moment().tz("Asia/Kolkata").endOf("day").toDate();

        const forms = await db.form.findAll({
            where: {
                createdAt: {
                    [db.Sequelize.Op.between]: [todayStart, todayEnd]
                }
            }
        });

        if (forms.length === 0) {
            console.log("📭 No forms submitted today.");
            return;
        }

        const emailContent = forms.map(form => (
            `
      Name: ${form.name}
      Email: ${form.email}
      Phone: ${form.phone}
      Service: ${form.service}
      Message: ${form.message}
      Submitted At: ${moment(form.createdAt).format("YYYY-MM-DD HH:mm:ss")}
      ------------------------------`
        )).join("\n");

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Yakkay App" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "📋 Test: Form Submissions Summary (Every Minute)",
            text: emailContent
        });

        console.log("✅ Test email sent.");
    } catch (error) {
        console.error("❌ Cron job failed:", error);
    }
});
