const db = require("../../../models");
<<<<<<< HEAD
const Form = db.form;  // Assuming 'form' is the name of the model
const TokenGenerator = require('uuid-token-generator');
const tokgen2 = new TokenGenerator(256, TokenGenerator.BASE62);
=======
const Form = db.form; // Assuming 'form' is the name of the model
const { sendAcknowledgmentEmail } = require('./emailService'); // ✅ Import email service
>>>>>>> b13b39d (Initial commit for backend project)

const createForm = async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !phone || !service || !message) {
    return res.status(400).send({
      message: "All required fields are not provided."
    });
  }

  try {
<<<<<<< HEAD
    // Check if the email is already in use


    // Create a new form
    const form = {
      // Generating a unique form token
      name: name,
      email: email,
      phone: phone,
      service: service,
      message: message,

=======
    // Create a new form object
    const form = {
      name,
      email,
      phone,
      service,
      message,
>>>>>>> b13b39d (Initial commit for backend project)
    };

    // Save the form in the database
    const formData = await Form.create(form);

<<<<<<< HEAD
    // Prepare the response data
    const result = {
      // Unique form token
=======
    // ✅ Send acknowledgment email to the user
    await sendAcknowledgmentEmail(formData);

    // Prepare the response data
    const result = {
>>>>>>> b13b39d (Initial commit for backend project)
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
<<<<<<< HEAD

=======
>>>>>>> b13b39d (Initial commit for backend project)
    };

    res.send(result);
  } catch (err) {
<<<<<<< HEAD
=======
    console.error("Error creating form:", err);
>>>>>>> b13b39d (Initial commit for backend project)
    res.status(500).send({
      message: err.message || "Some error occurred while creating the form."
    });
  }
};

const getForm = async (req, res) => {
  try {
    const forms = await Form.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(forms);
  } catch (err) {
<<<<<<< HEAD
=======
    console.error("Error retrieving forms:", err);
>>>>>>> b13b39d (Initial commit for backend project)
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving forms."
    });
  }
};

<<<<<<< HEAD

module.exports = {
  createForm,
  getForm
}
=======
module.exports = {
  createForm,
  getForm
};
>>>>>>> b13b39d (Initial commit for backend project)
