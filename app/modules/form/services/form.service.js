const db = require("../../../models");

const Form = db.form; // Assuming 'form' is the name of the model
const { sendAcknowledgmentEmail } = require('./emailservice'); // ✅ Import email service

// Create a new form entry
const createForm = async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !phone || !service || !message) {
    return res.status(400).send({
      message: "All required fields are not provided."
    });
  }

  try {
    // Create a new form object
    const form = {
      name,
      email,
      phone,
      service,
      message,
    };

    // Save the form in the database
    const formData = await Form.create(form);

    // ✅ Send acknowledgment email to the user
    await sendAcknowledgmentEmail(formData);

    // Prepare the response data
    const result = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
    };

    res.send(result);
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the form."
    });
  }
};

// Retrieve all form entries
const getForm = async (req, res) => {
  try {
    const forms = await Form.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(forms);
  } catch (err) {
    console.error("Error retrieving forms:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving forms."
    });
  }
};

module.exports = {
  createForm,
  getForm
};
