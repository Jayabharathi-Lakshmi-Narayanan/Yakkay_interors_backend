const db = require("../../../models");
const QuoteForm = db.get_quote_form;

const createForm = async (req, res) => {
    const {
        name,
        mobile,
        email,
        location,
        area,
        style,
        service,
        projectId, // optional
    } = req.body;

    if (!name || !mobile || !email || !location || !area || !style || !service) {
        return res.status(400).send({
            message: "All fields are required.",
        });
    }

    try {
        const form = {
            name,
            mobile,
            email,
            location,
            area,
            style,
            service,
            projectId: projectId || null,
        };

        const savedQuoteData = await QuoteForm.create(form);

        const result = {
            id: savedQuoteData.id,
            name: savedQuoteData.name,
            mobile: savedQuoteData.mobile,
            email: savedQuoteData.email,
            location: savedQuoteData.location,
            area: savedQuoteData.area,
            style: savedQuoteData.style,
            service: savedQuoteData.service,
            projectId: savedQuoteData.projectId,
        };

        res.status(201).send(result);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while creating quote form.",
        });
    }
};

const getForms = async (req, res) => {
    try {
        const forms = await QuoteForm.findAll({
            order: [["createdAt", "DESC"]],
        });

        res.status(200).send(forms);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving quote forms.",
        });
    }
};

module.exports = {
    createForm,
    getForms,
};
