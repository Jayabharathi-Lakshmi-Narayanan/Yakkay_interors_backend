const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password if 2FA enabled
    },
    logger: true,
    debug: true,
});

/**
 * Sends an acknowledgment email to the form submitter.
 * @param {Object} form - The submitted form data.
 */
exports.sendAcknowledgmentEmail = async (form) => {

    const { name, email, phone, service, message } = form;

    const mailOptions = {
        from: `"Yakkay Interiors" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank you for contacting Yakkay Interiors!",
        text: `
Hi ${name},

Thank you for reaching out to Yakkay Interiors! We’ve received your message and will respond shortly.

Here’s a summary of your submission:

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Service: ${service || "N/A"}
Message: ${message}

Warm regards,  
Yakkay Interiors Team
        `,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;  // rethrow if you want upstream to handle it
    }
};
