const express = require("express");
const emailHelper = require("./helpers/emailHelper");
const cors = require("cors");

const app = express();

// Middleware
const corsOptions = {
  origin: "*", // Permite llamadas desde cualquier dominio
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Ruta para enviar correo
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    let info = await emailHelper(to, subject, text);
    res.status(200).json({ message: `Email sent: ${info.response}` });
  } catch (error) {
    res.status(500).json({ error: "Error sending email", details: error.message });
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




