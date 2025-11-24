const fs = require("fs");
const path = require("path");

const usuariosPath = path.join(__dirname, "../data/usuarios.json");

// Ler usuários do arquivo
const lerUsuarios = () => {
  const dados = fs.readFileSync(usuariosPath, "utf-8");
  return JSON.parse(dados);
};

// Salvar usuários no arquivo
const salvarUsuarios = (usuarios) => {
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
};

// GET - Listar todos os usuários
exports.listarUsuarios = (req, res) => {
  try {
    const usuarios = lerUsuarios();
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar usuários" });
  }
};

// GET - Obter usuário por ID
exports.obterUsuario = (req, res) => {
  try {
    const { id } = req.params;
    const usuarios = lerUsuarios();
    const usuario = usuarios.find((u) => u.id === parseInt(id));

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao obter usuário" });
  }
};

// POST - Criar novo usuário
exports.criarUsuario = (req, res) => {
  try {
    const { nome, email, telefone, cidade } = req.body;

    // Validar campos obrigatórios
    if (!nome || !email) {
      return res.status(400).json({ erro: "Nome e email são obrigatórios" });
    }

    const usuarios = lerUsuarios();

    // Gerar novo ID
    const novoId =
      usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1;

    // Verificar se email já existe
    const emailExistente = usuarios.some((u) => u.email === email);
    if (emailExistente) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    const novoUsuario = {
      id: novoId,
      nome,
      email,
      telefone: telefone || "",
      cidade: cidade || "",
      data_criacao: new Date().toISOString().split("T")[0],
    };

    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);

    res.status(201).json(novoUsuario);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar usuário" });
  }
};

// PUT - Atualizar usuário
exports.atualizarUsuario = (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, cidade } = req.body;

    const usuarios = lerUsuarios();
    const indice = usuarios.findIndex((u) => u.id === parseInt(id));

    if (indice === -1) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    // Verificar se novo email já existe em outro usuário
    if (email && email !== usuarios[indice].email) {
      const emailExistente = usuarios.some(
        (u, idx) => u.email === email && idx !== indice
      );
      if (emailExistente) {
        return res.status(400).json({ erro: "Email já cadastrado" });
      }
    }

    usuarios[indice] = {
      ...usuarios[indice],
      nome: nome || usuarios[indice].nome,
      email: email || usuarios[indice].email,
      telefone: telefone !== undefined ? telefone : usuarios[indice].telefone,
      cidade: cidade !== undefined ? cidade : usuarios[indice].cidade,
    };

    salvarUsuarios(usuarios);
    res.json(usuarios[indice]);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar usuário" });
  }
};

// DELETE - Deletar usuário
exports.deletarUsuario = (req, res) => {
  try {
    const { id } = req.params;

    let usuarios = lerUsuarios();
    const indice = usuarios.findIndex((u) => u.id === parseInt(id));

    if (indice === -1) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const usuarioDeletado = usuarios.splice(indice, 1);
    salvarUsuarios(usuarios);

    res.json({
      mensagem: "Usuário deletado com sucesso",
      usuario: usuarioDeletado[0],
    });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar usuário" });
  }
};
