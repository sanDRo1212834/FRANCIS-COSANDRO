# Cadastro de Funcionário - Backend & Frontend

Um sistema simples para cadastro de funcionários com Node.js/Express no backend e HTML/CSS/JavaScript no frontend.

## 📁 Estrutura do Projeto

```
Do zero/
├── backend/
│   ├── app.js                          # Arquivo principal do servidor
│   ├── package.json                    # Dependências do projeto
│   ├── routes/
│   │   └── usuarios.js                 # Rotas da API
│   ├── controllers/
│   │   └── usuarioController.js        # Lógica da API
│   └── data/
│       └── usuarios.json               # Banco de dados (JSON)
├── frontend/
│   ├── index.html                      # Página principal
│   └── app.js                          # JavaScript do frontend
└── README.md                           # Este arquivo
```

## 🚀 Como Usar

### 1. Instalar Dependências do Backend

Abra o PowerShell e navegue até a pasta `backend`:

```powershell
cd "C:\Users\sousa\OneDrive\Desktop\Do zero\backend"
npm install
```

### 2. Iniciar o Servidor Backend

```powershell
npm start
```

Você verá a mensagem: `Servidor rodando em http://localhost:3000`

### 3. Abrir o Frontend

Abra o arquivo `frontend/index.html` no navegador ou use:

```powershell
start "C:\Users\sousa\OneDrive\Desktop\Do zero\frontend\index.html"
```

## 📡 API Endpoints

### GET - Listar todos os usuários
```
GET http://localhost:3000/api/usuarios
```

### GET - Obter usuário específico
```
GET http://localhost:3000/api/usuarios/:id
```

### POST - Criar novo usuário
```
POST http://localhost:3000/api/usuarios
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "(11) 98765-4321",
  "cidade": "São Paulo"
}
```

### PUT - Atualizar usuário
```
PUT http://localhost:3000/api/usuarios/:id
Content-Type: application/json

{
  "nome": "João Santos",
  "email": "joao.santos@example.com",
  "telefone": "(11) 98765-4322",
  "cidade": "São Paulo"
}
```

### DELETE - Deletar usuário
```
DELETE http://localhost:3000/api/usuarios/:id
```

## 🎨 Funcionalidades do Frontend

- ✅ **Listar Usuários**: Visualize todos os usuários cadastrados em cards
- ✅ **Criar Usuário**: Formulário para adicionar novos usuários
- ✅ **Editar Usuário**: Clique em "Editar" no card do usuário
- ✅ **Deletar Usuário**: Remova usuários com confirmação
- ✅ **Validação**: Validação de campos obrigatórios
- ✅ **Design Responsivo**: Funciona em desktop, tablet e mobile
- ✅ **Mensagens de Feedback**: Notificações de sucesso/erro

## 🔧 Tecnologias Utilizadas

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **CORS**: Habilitação de requisições cross-origin
- **File System**: Armazenamento em JSON

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos com Grid e Flexbox
- **JavaScript**: Integração com API (Fetch API)

## 📝 Dados de Exemplo

O sistema já vem com 3 usuários de exemplo em `backend/data/usuarios.json`:

1. João Silva - joao@example.com
2. Maria Santos - maria@example.com
3. Pedro Oliveira - pedro@example.com

## ⚠️ Importante

- O servidor deve estar rodando em `http://localhost:3000` para o frontend funcionar
- Os dados são salvos em `usuarios.json` (não é um banco de dados real)
- Certifique-se de ter Node.js instalado (versão 14+)

## 🎓 Próximas Melhorias

- [ ] Adicionar banco de dados real (MongoDB, SQLite)
- [ ] Autenticação e autorização
- [ ] Paginação na lista de usuários
- [ ] Busca e filtros avançados
- [ ] Upload de foto de perfil
- [ ] Testes automatizados

## 📧 Suporte

Para problemas na conexão com o servidor, verifique:

1. ✅ Node.js está instalado
2. ✅ Dependências foram instaladas (`npm install`)
3. ✅ Servidor está rodando (`npm start`)
4. ✅ Porta 3000 não está sendo usada
5. ✅ O arquivo `usuarios.json` não foi movido/deletado

---

**Desenvolvido com ❤️ para aprendizado Full Stack**
