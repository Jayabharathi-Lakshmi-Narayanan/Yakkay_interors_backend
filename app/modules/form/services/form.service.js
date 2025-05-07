const db = require("../../../models");
const Form = db.form;  // Assuming 'form' is the name of the model
const TokenGenerator = require('uuid-token-generator');
const tokgen2 = new TokenGenerator(256, TokenGenerator.BASE62);

const createForm = async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !phone || !service || !message) {
    return res.status(400).send({
      message: "All required fields are not provided."
    });
  }

  try {
    // Check if the email is already in use


    // Create a new form
    const form = {
      // Generating a unique form token
      name: name,
      email: email,
      phone: phone,
      service: service,
      message: message,

    };

    // Save the form in the database
    const formData = await Form.create(form);

    // Prepare the response data
    const result = {
      // Unique form token
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,

    };

    res.send(result);
  } catch (err) {
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
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving forms."
    });
  }
};


module.exports = {
  createForm,
  getForm
}