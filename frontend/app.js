const API_URL = "http://localhost:3000/api/usuarios";

// Elementos do DOM
const formUsuario = document.getElementById("formUsuario");
const formEdicao = document.getElementById("formEdicao");
const usuariosContainer = document.getElementById("usuariosContainer");
const mensagemDiv = document.getElementById("mensagem");

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  carregarUsuarios();
  formUsuario.addEventListener("submit", adicionarUsuario);
  formEdicao.addEventListener("submit", atualizarUsuario);
});

// Mostrar mensagem
function mostrarMensagem(texto, tipo = "sucesso") {
  mensagemDiv.innerHTML = `<div class="mensagem ${tipo}">${texto}</div>`;
  setTimeout(() => {
    mensagemDiv.innerHTML = "";
  }, 4000);
}

// Carrega usuários da API
async function carregarUsuarios() {
  try {
    usuariosContainer.innerHTML =
      '<div class="carregando"><div class="spinner"></div>Carregando usuários...</div>';

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao conectar com o servidor");
    }

    const usuarios = await response.json();
    renderizarUsuarios(usuarios);
  } catch (erro) {
    mostrarMensagem(
      `Erro: ${erro.message}. Certifique-se que o servidor está rodando em http://localhost:3000`,
      "erro"
    );
    usuariosContainer.innerHTML =
      '<div class="vazio"><div class="vazio-icon">⚠️</div>Não foi possível conectar ao servidor</div>';
    console.error("Erro ao carregar usuários:", erro);
  }
}

// Renderiza usuários na tela
function renderizarUsuarios(usuarios) {
  if (usuarios.length === 0) {
    usuariosContainer.innerHTML =
      '<div class="vazio"><div class="vazio-icon">📭</div>Nenhum usuário cadastrado</div>';
    return;
  }

  usuariosContainer.innerHTML = usuarios
    .map(
      (usuario) => `
        <div class="usuario-card">
            <div class="usuario-header">
                <h3>${usuario.nome}</h3>
                <span class="usuario-id">ID: ${usuario.id}</span>
            </div>
            <div class="usuario-info">
                <div class="info-label">📧 Email</div>
                <div class="info-value">${usuario.email}</div>
            </div>
            ${
              usuario.telefone
                ? `
            <div class="usuario-info">
                <div class="info-label">📱 Telefone</div>
                <div class="info-value">${usuario.telefone}</div>
            </div>
            `
                : ""
            }
            ${
              usuario.cidade
                ? `
            <div class="usuario-info">
                <div class="info-label">📍 Cidade</div>
                <div class="info-value">${usuario.cidade}</div>
            </div>
            `
                : ""
            }
            <div class="usuario-info">
                <div class="info-label">📅 Criado em</div>
                <div class="info-value">${new Date(
                  usuario.data_criacao
                ).toLocaleDateString("pt-BR")}</div>
            </div>
            <div class="usuario-actions">
                <button class="btn-edit" onclick="preencherEdicao(${
                  usuario.id
                })">Editar</button>
                <button class="btn-danger" onclick="deletarUsuario(${
                  usuario.id
                })">Deletar</button>
            </div>
        </div>
    `
    )
    .join("");
}

// Adiciona novo usuário
async function adicionarUsuario(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cidade = document.getElementById("cidade").value.trim();

  if (!nome || !email) {
    mostrarMensagem("Nome e email são obrigatórios", "aviso");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, telefone, cidade }),
    });

    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.erro || "Erro ao criar usuário");
    }

    const novoUsuario = await response.json();
    mostrarMensagem(
      `Usuário "${novoUsuario.nome}" criado com sucesso! 🎉`,
      "sucesso"
    );
    formUsuario.reset();
    carregarUsuarios();
  } catch (erro) {
    mostrarMensagem(`Erro: ${erro.message}`, "erro");
    console.error("Erro ao adicionar usuário:", erro);
  }
}

// Preenche formulário de edição com dados do usuário
async function preencherEdicao(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Usuário não encontrado");
    }

    const usuario = await response.json();

    document.getElementById("edicao-id").value = usuario.id;
    document.getElementById("edicao-nome").value = usuario.nome;
    document.getElementById("edicao-email").value = usuario.email;
    document.getElementById("edicao-telefone").value = usuario.telefone || "";
    document.getElementById("edicao-cidade").value = usuario.cidade || "";

    // Scroll para o formulário
    document.querySelector(".card").scrollIntoView({ behavior: "smooth" });
    document.getElementById("edicao-nome").focus();
  } catch (erro) {
    mostrarMensagem(`Erro: ${erro.message}`, "erro");
    console.error("Erro ao buscar usuário:", erro);
  }
}

// Atualiza usuário
async function atualizarUsuario(e) {
  e.preventDefault();

  const id = document.getElementById("edicao-id").value;
  const nome = document.getElementById("edicao-nome").value.trim();
  const email = document.getElementById("edicao-email").value.trim();
  const telefone = document.getElementById("edicao-telefone").value.trim();
  const cidade = document.getElementById("edicao-cidade").value.trim();

  if (!id) {
    mostrarMensagem("ID é obrigatório", "aviso");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, telefone, cidade }),
    });

    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.erro || "Erro ao atualizar usuário");
    }

    const usuarioAtualizado = await response.json();
    mostrarMensagem(
      `Usuário "${usuarioAtualizado.nome}" atualizado com sucesso! ✅`,
      "sucesso"
    );
    formEdicao.reset();
    carregarUsuarios();
  } catch (erro) {
    mostrarMensagem(`Erro: ${erro.message}`, "erro");
    console.error("Erro ao atualizar usuário:", erro);
  }
}

// Deleta usuário
async function deletarUsuario(id) {
  if (
    !confirm(
      "Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita."
    )
  ) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.erro || "Erro ao deletar usuário");
    }

    const resultado = await response.json();
    mostrarMensagem(
      `Usuário "${resultado.usuario.nome}" deletado com sucesso! 🗑️`,
      "sucesso"
    );
    carregarUsuarios();
  } catch (erro) {
    mostrarMensagem(`Erro: ${erro.message}`, "erro");
    console.error("Erro ao deletar usuário:", erro);
  }
}
