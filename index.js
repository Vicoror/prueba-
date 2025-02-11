const express = require("express");
const emailHelper = require("./helpers/emailHelper");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para enviar correo
app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        let info = await emailHelper(to, subject, text);
        res.status(200).send(`Email sent: ${info.response}`);
    } catch (error) {
        res.status(500).send("Error sending email");
    }
});

// Inicia el servidor
app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});



