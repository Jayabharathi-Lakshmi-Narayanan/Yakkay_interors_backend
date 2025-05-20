require("dotenv").config();
const cron = require("node-cron");
const db = require("../models");
const moment = require("moment-timezone");
const nodemailer = require("nodemailer");

console.log("✅ Cron job initialized...");

// Schedule to run daily at 3:30 AM UTC (9:00 AM IST)
cron.schedule("30 3 * * *", async () => {
    console.log("📬 Cron job running: Sending form summary email...");

    try {
        const now = moment().tz("Asia/Kolkata");

        // Time window: from yesterday 9:01 AM IST to today 8:59:59.999 AM IST
        const start = now.clone().subtract(1, "day").hour(9).minute(1).second(0).millisecond(0);
        const end = now.clone().hour(8).minute(59).second(59).millisecond(999);

        // Fetch forms created in the time window
        const forms = await db.form.findAll({
            where: {
                createdAt: {
                    [db.Sequelize.Op.between]: [start.toDate(), end.toDate()],
                },
            },
        });

        if (forms.length === 0) {
            console.log("📭 No forms submitted in the previous window.");
            return;
        }

        // Prepare email content
        const emailContent = forms
            .map(
                (form) => `Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Service: ${form.service}
Message: ${form.message}
Submitted At: ${moment(form.createdAt).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss")}
------------------------------`
            )
            .join("\n");

        // Setup nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // use TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send email
        await transporter.sendMail({
            from: `"Yakkay App" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "📋 Daily Form Submissions Summary",
            text: emailContent,
        });

        console.log("✅ Daily email sent.");
    } catch (error) {
        console.error("❌ Cron job failed:", error);
    }
});
