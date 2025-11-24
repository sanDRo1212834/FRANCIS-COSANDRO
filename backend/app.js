const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/usuarios", usuarioRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.json({ mensagem: "Servidor rodando!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
