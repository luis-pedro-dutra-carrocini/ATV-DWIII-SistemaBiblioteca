const express = require('express');
const cors = require('cors');  
const app = express();
const port = 3000;


app.use(cors());

app.use(express.json());


// Definindo as "Tabelas"
const emprestimos = [];

// Dexiando cadastrados alguns livros e autores por padrão
const autores = [
    {
        _id: 1,
        _nome: "George Orwell",
        _biografia: "Escritor britânico, autor de '1984' e 'A Revolução dos Bichos'.",
        _dataNascimento: new Date("1903-06-25")
    },
    {
        _id: 2,
        _nome: "J.K. Rowling",
        _biografia: "Autora britânica da série 'Harry Potter'.",
        _dataNascimento: new Date("1965-07-31")
    },
    {
        _id: 3,
        _nome: "J.R.R. Tolkien",
        _biografia: "Criador da Terra Média e autor de 'O Senhor dos Anéis'.",
        _dataNascimento: new Date("1892-01-03")
    },
    {
        _id: 4,
        _nome: "Gabriel García Márquez",
        _biografia: "Autor colombiano de 'Cem Anos de Solidão'.",
        _dataNascimento: new Date("1927-03-06")
    },
    {
        _id: 5,
        _nome: "Machado de Assis",
        _biografia: "Um dos maiores escritores brasileiros, autor de 'Dom Casmurro'.",
        _dataNascimento: new Date("1839-06-21")
    }
];

const livros = [
    {
        _titulo: "1984",
        _isbn: 9788535914849,
        _sinopsia: "Um romance distópico sobre um regime totalitário e vigilância extrema.",
        _idAutor: 1,
        _dataPublicacao: '1949-06-08T00:00:00.000Z',
        _descricao: "Clássico da literatura mundial.",
        _qtDisponivel: 10
    },
    {
        _titulo: "Harry Potter e a Pedra Filosofal",
        _isbn: 9788532530783,
        _sinopsia: "O começo da saga do jovem bruxo Harry Potter em Hogwarts.",
        _idAutor: 2,
        _dataPublicacao: "1997-06-26",
        _descricao: "O primeiro livro da série Harry Potter.",
        _qtDisponivel: 15
    },
    {
        _titulo: "O Senhor dos Anéis: A Sociedade do Anel",
        _isbn: 9788578270698,
        _sinopsia: "A jornada de Frodo para destruir o Um Anel.",
        _idAutor: 3,
        _dataPublicacao: "1954-07-29",
        _descricao: "Fantasia épica de Tolkien.",
        _qtDisponivel: 8
    },
    {
        _titulo: "Cem Anos de Solidão",
        _isbn: 9788535914848,
        _sinopsia: "A saga da família Buendía na fictícia cidade de Macondo.",
        _idAutor: 4,
        _dataPublicacao: "1967-05-30",
        _descricao: "Obra-prima do realismo mágico.",
        _qtDisponivel: 12
    },
    {
        _titulo: "Dom Casmurro",
        _isbn: 9788577993627,
        _sinopsia: "Um romance brasileiro sobre amor, ciúme e dúvida.",
        _idAutor: 5,
        _dataPublicacao: "1899-01-01",
        _descricao: "Um dos maiores clássicos da literatura brasileira.",
        _qtDisponivel: 20
    },
    {
        _titulo: "O Pequeno Príncipe",
        _isbn: 9788522031440,
        _sinopsia: "Uma fábula filosófica sobre amizade e amor.",
        _idAutor: 5,
        _dataPublicacao: "1943-04-06",
        _descricao: "Um dos livros mais traduzidos do mundo.",
        _qtDisponivel: 25
    },
    {
        _titulo: "O Apanhador no Campo de Centeio",
        _isbn: 9780316769488,
        _sinopsia: "A história de Holden Caulfield e sua jornada pela adolescência.",
        _idAutor: 4,
        _dataPublicacao: "1951-07-16",
        _descricao: "Um clássico da literatura americana.",
        _qtDisponivel: 18
    },
    {
        _titulo: "Crime e Castigo",
        _isbn: 9788572324310,
        _sinopsia: "A história de um jovem que comete um assassinato e enfrenta suas consequências psicológicas.",
        _idAutor: 3,
        _dataPublicacao: "1866-01-01",
        _descricao: "Obra-prima da literatura russa.",
        _qtDisponivel: 10
    },
    {
        _titulo: "O Nome do Vento",
        _isbn: 9788578270698,
        _sinopsia: "As memórias de Kvothe, um lendário mago e músico.",
        _idAutor: 2,
        _dataPublicacao: "2007-03-27",
        _descricao: "Primeiro livro da trilogia A Crônica do Matador do Rei.",
        _qtDisponivel: 7
    },
    {
        _titulo: "A Revolução dos Bichos",
        _isbn: 9780451526342,
        _sinopsia: "Uma fábula política sobre o poder e a corrupção.",
        _idAutor: 1,
        _dataPublicacao: "1945-08-17",
        _descricao: "Um clássico da literatura política.",
        _qtDisponivel: 14
    }
];

const usuarios = [
    {
        _nome: "João Silva",
        _cpf: 12345678901,
        _telefone: 11987654321,
        _dataNascimento: new Date("1990-05-15")
    },
    {
        _nome: "Maria Oliveira",
        _cpf: 98765432100,
        _telefone: 11976543210,
        _dataNascimento: new Date("1985-08-22")
    },
    {
        _nome: "Carlos Souza",
        _cpf: 45678912345,
        _telefone: 11965432109,
        _dataNascimento: new Date("1978-11-30")
    },
    {
        _nome: "Ana Pereira",
        _cpf: 78912345678,
        _telefone: 11954321098,
        _dataNascimento: new Date("1995-02-10")
    },
    {
        _nome: "Fernanda Lima",
        _cpf: 32165498700,
        _telefone: 11943210987,
        _dataNascimento: new Date("2000-06-05")
    }
];


// Definindo Classes para o projeto
// Classe Livros
class Livro{

    // Método Construtor
    constructor(titulo, isbn, sinopsia, idAutor, dataPublicacao, descricao, qtDisponivel){
        const today = new Date();

        // Convertendo dataNascimento para Date, se necessário
        if (typeof dataPublicacao === "string") {
            dataPublicacao = new Date(dataPublicacao);
        }

        if (titulo.trim() !== "" && sinopsia.trim() !== "" && descricao.trim() !== "" && Number.isInteger(isbn) && Number.isInteger(idAutor) && Number.isInteger(qtDisponivel) && !isNaN(dataPublicacao.getTime()) && dataPublicacao.getTime() <= today.getTime()){
            this._titulo = titulo;
            this._isbn = isbn;
            this._sinopsia = sinopsia;
            this._idAutor = idAutor;
            this._dataPublicacao = dataPublicacao;
            this._descricao = descricao;
            this._qtDisponivel = qtDisponivel;
        }else{
            console.log("Dados inválidos para criação do Livro.")
        }
    }


    // Métodos GET's
    get titulo(){
        return this._titulo;
    }

    get isbn(){
        return this._isbn;
    }

    get sinopsia(){
        return this._sinopsia;
    }

    get idAutor(){
        return this._idAutor;
    }

    get dataPublicacao(){
        return this._dataPublicacao;
    }

    get descricao(){
        return this._descricao;
    }

    get qtDisponivel(){
        return this._qtDisponivel;
    }


    // Métodos SET's
    set titulo(titulo){
        if (titulo.trim() !== ""){
            this._titulo = titulo;
        }else{
            console.log("Título não pode ser nulo.")
        }
    }

    set isbn(isbn){
        if (Number.isInteger(isbn)){
            this._isbn = isbn;
        }else{
            console.log("ISBN tem que ser um número inteiro.")
        }
    }

    set idAutor(idAutor){
        if (Number.isInteger(idAutor)){
            this._idAutor = idAutor;
        }else{
            console.log("ID do Autor tem que ser um número inteiro.")
        }
    }

    set sinopsia(sinopsia){
        if (sinopsia.trim() !== ""){
            this._sinopsia = sinopsia;
        }else{
            console.log("Sinopsia não pode ser nula.")
        }
    }

    set descricao(descricao){
        if (descricao.trim() !== ""){
            this._descricao = descricao;
        }else{
            console.log("Descricao não pode ser nula.")
        }
    }

    set (dataPublicacao){
        if (!isNaN(dataPublicacao.getTime()) && dataPublicacao.getTime() <= today.getTime()){
            this._dataPublicacao = dataPublicacao;
        }else{
            console.log("Data de publicação inválida.")
        }
    }


    // Métodos não padrões
    // Recolocar um livro na prateleira
    addQtLivros(){
        this.qtDisponivel = this.qtDisponivel + 1;
    }

    // Remover um livro da prateleira (Empréstimo, estrafou, etc.)
    subQtLivros(subLivros){
        if (this.qtDisponivel >= subLivros){
            this.qtDisponivel = this.qtDisponivel - subLivros;
        }
    }
}


// --- Consultas relacionadas aos livros
// GET /livros - Listando todos os livros (Finalizado)
app.get('/livros', (req, res) => {
    if (livros.length>0){
       return res.json(livros);
    }else{
       return res.status(404).json({mensagem: "Nenhum livro cadastrado"});
    }
});


// GET /livros/isbn: - Busca um livro pelo ISBN (Finalizado)
app.get('/livro/:isbn', (req, res) => {
    const isbn = parseInt(req.params.isbn);
    const livro = livros.find(l => l._isbn === isbn);
    if (livro){
       return res.json(livro);
    }else{
       return res.status(404).json({mensagem: "Livro não encontrado."});
    }
});


// GET /livros/busca/tipobusca - Busca todos os livros que estão disponíveis e emprestados
app.get('/livros/tipobusca/:tipobusca', (req, res) => {
    const tipobusca = parseInt(req.params.tipobusca);
    
    // Verificando qual o tipo de busca
    if (tipobusca === 1){
        const resultado = livros.filter(l => l._qtDisponivel > 0);
        if (resultado.length>0){
           return res.json(resultado);
        }else{
           return res.status(404).json({mensagem: "Nenhum livro disponível."});
        }
    }else{
        
        const livrosEmprestados = {};

        // Percorre todos os empréstimos que têm status "Emprestado"
        emprestimos.forEach(emprestimo => {
            if (emprestimo._status === "Emprestado") {

                // Percorre o array que contem os livros desse empréstimo
                emprestimo._ISBNLivro.forEach(isbn => {

                    // Verifica se já existe esse livro no array
                    if (!livrosEmprestados[isbn]) {
                        livrosEmprestados[isbn] = { _ISBNLivro: isbn, quantidade: 1 };
                    } else {
                        livrosEmprestados[isbn].quantidade += 1;
                    }
                });
            }
        });


        if (Object.keys(livrosEmprestados).length>0){
            // Converte o objeto em um array e envia a resposta
           return res.status(200).json(Object.values(livrosEmprestados));
        }else{
           return res.status(404).json({mensagem: "Nenhum livro emprestado."});
        }
        
    }
});


// POST /livros - Cadastra novo livro (Finalizado)
app.post('/livros', (req, res) => {
    let { titulo, dataPublicacao, isbn, sinopsia, idAutor, descricao, qtDisponivel } = req.body;

    // Convertendo a data para um objeto Date
    const dataFormatada = new Date(dataPublicacao);

    // Convertendo de string para number int
    isbn = parseInt(isbn, 10);
    idAutor = parseInt(idAutor, 10);
    qtDisponivel = parseInt(qtDisponivel, 10);

    // Validando a data antes de instanciar a classe
    if (isNaN(dataFormatada.getTime())) {
        return res.status(400).json({mensagem: "Data de publicação inválida." });
    }

    // Verificando se não havera confllito entre ISBN
    if (livros.findIndex(l => l._isbn === isbn) !== -1){
        return res.status(200).json({ mensagem: "ISBN já está em uso. Livro não foi cadastrado." });
    }

    // Verificando se há algum autor com esse ID
    if (livros.findIndex(l => l._idAutor === idAutor) === -1){
        return res.status(200).json({ mensagem: "Autor não encontrado. Livro não foi cadastrado." });
    }

    // Criando um novo livro
    const novoLivro = new Livro(titulo, isbn, sinopsia, idAutor, dataFormatada, descricao, qtDisponivel);

    // Verificando se o livro foi criado corretamente
    if (novoLivro.titulo) {
        livros.push(novoLivro);
        return res.status(201).json({mensagem: `Livro ${novoLivro.titulo} cadastrado com sucesso.`, cadastrou: true });
    } else {
        return res.status(400).json({mensagem: "Dados incorretos, livro não foi cadastrado." });
    }
});


// PUT /livros/:isbn - Atualiza um Livro existente (Finalizado)
app.put('/livros/:isbn', (req, res) => {
    const isbn = parseInt(req.params.isbn);
    const livroIndex = livros.findIndex(l => l._isbn === isbn);

    if (livroIndex !== -1) {
        const livroAntigo = livros[livroIndex];
        let { titulo, isbnNovo, sinopsia, idAutor, dataPublicacao, descricao, qtDisponivel } = req.body;

        // Convertendo de string para number int
        isbnNovo = parseInt(isbnNovo, 10);
        idAutor = parseInt(idAutor, 10);
        qtDisponivel = parseInt(qtDisponivel, 10);

        // Verificando se não havera confllito entre ISBN
        if (isbn !== isbnNovo && livros.findIndex(l => l._isbn === isbnNovo) !== -1){
            return res.status(200).json({ mensagem: "ISBN já está em uso. Livro não foi atualizado." });
        }

        // Verificando se há algum autor com esse ID
        if (livros.findIndex(l => l._idAutor === idAutor) === -1){
            return res.status(200).json({ mensagem: "Autor não encontrado. Livro não foi atualizado." });
        }

        // Se a data for fornecida como string, converter para Date
        const dataFormatada = dataPublicacao ? new Date(dataPublicacao) : livroAntigo._dataPublicacao;

        // Criando uma nova instância da classe livro para validar os dados
        const livroAtualizado = new Livro(
            titulo || livroAntigo._titulo, // Mantém o valor antigo caso não seja informado
            isbnNovo || livroAntigo._isbn,
            sinopsia || livroAntigo._sinopsia,
            idAutor || livroAntigo._idAutor,
            dataFormatada,
            descricao || livroAntigo._descricao,
            qtDisponivel || livroAntigo._qtDisponivel
        );

        // Se a instância for criada corretamente, substituir no array
        if (livroAtualizado.titulo) {
            livros[livroIndex] = livroAtualizado;
            return res.json({ mensagem: "Livro atualizado com sucesso.", livro: livroAtualizado });
        } else {
            return res.status(400).json({ mensagem: "Dados inválidos. Livro não foi atualizado." });
        }
    } else {
        return res.status(404).json({ mensagem: "Livro não encontrado." });
    }
});


// DELETE /livros/:isbn - Exclui um livro (Finalizado)
app.delete('/livros/:isbn', (req, res) => {
    const isbn = parseInt(req.params.isbn);

    // Verificando se o livro não está emmprestado
    const livroEmprestado = emprestimos.some(emprestimo => 
        emprestimo._ISBNLivro.includes(isbn)
    );

    if (livroEmprestado) {
        return res.status(404).json({ mensagem: "Não é possível excluir o livro, ele está veinculado a algum empréstimo" });
    }

    const livroIndex = livros.findIndex(l => l._isbn === isbn); // Encontra o índice do livro
    
    if (livroIndex !== -1) {
        livros.splice(livroIndex, 1); // Remove o livro pelo indice
       return res.status(201).json({mensagem: 'Livro deletado com sucesso.'});
    }else{
       return res.status(404).json({mensagem: 'Livro não encontrado.'});;
    }
});


// Classe Usuario
class Usuario{

    // Método Contrutor
    constructor(nome, dataNascimento, cpf, telefone){
        const today = new Date();

        // Convertendo dataNascimento para Date, se necessário
        if (typeof dataNascimento === "string") {
            dataNascimento = new Date(dataNascimento);
        }

        if (nome.trim() !== "" && Number.isInteger(cpf) && Number.isInteger(telefone) && !isNaN(dataNascimento.getTime()) && dataNascimento.getTime() <= today.getTime()){
            this._nome = nome;
            this._cpf = cpf;
            this._telefone = telefone;
            this._dataNascimento = dataNascimento;
        }else{
            console.log("Dados inválidos para criação do Usuário.");
        }
    }


    // Métodos SET's
    set nome(nome){
        if (nome.trim() !== ""){
            this._nome = nome;
        }else{
            console.log("Nome não pode ser nulo.")
        }
    }

    set dataNascimento(dataNascimento){
        if (!isNaN(dataNascimento.getTime()) && dataNascimento.getTime() <= today.getTime()){
            this._dataNascimento = dataNascimento;
        }else{
            console.log("Data de nascimento inválida.")
        }
    }

    set cpf(cpf){
        if (Number.isInteger(cpf) !== "" && cpf.length === 11){
            this._cpf = cpf;
        }else{
            console.log("Verifique a quantidade de números do CPF.")
        }
    }

    set telefone(telefone){
        if (Number.isInteger(telefone) !== "" && telefone.length === 11){
            this._telefone = telefone;
        }else{
            console.log("Verifique a quantidade de números do Telefone.")
        }
    }


    // Métodos GET's
    get telefone(){
        return this._telefone;
    }

    get cpf(){
        return this._cpf;
    }

    get nome(){
        return this._nome;
    }

    get dataNascimento(){
        return this._dataNascimento;
    }
}


// --- Consultas relacionadas aos usuários

// GET /usuarios - Listando todos os usuarios (Finalizado)
app.get('/usuarios', (req, res) => {
   return res.json(usuarios);
});


// GET /usuarios/id: - Busca um usuário pelo CPF (Finalizado)
app.get('/usuarios/:cpf', (req, res) => {
    const cpf = parseInt(req.params.cpf);
    const usuario = usuarios.find(u => u._cpf === cpf);
    if (usuario){
       return res.json(usuario);
    }else{
       return res.status(404).json({mensagem: "Usuário não encontrado"});
    }
});


// POST /usuarios - Cadastra novo usuário (Finalizado)
app.post('/usuarios', (req, res) => {
    let { nome, telefone, cpf, dataNascimento } = req.body;

    // Convertendo a data para um objeto Date
    const dataFormatada = new Date(dataNascimento);

    // Validando a data antes de instanciar a classe
    if (isNaN(dataFormatada.getTime())) {
        return res.status(400).json({mensagem: "Data de nascimento inválida." });
    }

    // Convertendo de string para number int
    cpf = parseInt(cpf, 10);
    telefone = parseInt(telefone, 10);

    // Verificando se não havera confllito entre ISBN
    if (usuarios.findIndex(u => u._cpf === cpf) !== -1){
        return res.status(200).json({ mensagem: "CPF já está em uso. Usuário não foi cadastrado." });
    }

    // Criando um novo usuário
    const novoUsuario = new Usuario(nome, dataFormatada, cpf, telefone);

    // Verificando se o usuário foi criado corretamente
    if (novoUsuario.nome) {
        usuarios.push(novoUsuario);
       return res.status(201).json({mensagem: `Usuário ${novoUsuario.nome} cadastrado com sucesso.`, cadastrou: true });
    } else {
       return res.status(400).json({mensagem: "Dados incorretos, usuário não foi cadastrado." });
    }
});


// PUT /usuarios/:cpf - Atualiza um Usuário existente (Finalizado)
app.put('/usuarios/:cpf', (req, res) => {
    const cpf = parseInt(req.params.cpf);
    const usuarioIndex = usuarios.findIndex(u => u._cpf === cpf);

    if (usuarioIndex !== -1) {
        const usuarioAntigo = usuarios[usuarioIndex];
        let { nome, novocpf, dataNascimento, telefone } = req.body;

        // Convertendo de string para number int
        novocpf = parseInt(novocpf, 10);
        telefone = parseInt(telefone, 10);

        // Verificando se não havera confllito entre ISBN
        if (cpf !== novocpf && usuarios.findIndex(u => u._cpf === novocpf) !== -1){
            return res.status(200).json({ mensagem: "CPF já está em uso. Usuário não foi atualizado." });
        }

        // Se a data for fornecida como string, converter para Date
        const dataFormatada = dataNascimento ? new Date(dataNascimento) : usuarioAntigo._dataNascimento;

        // Criando uma nova instância da classe Usuario para validar os dados
        const usuarioAtualizado = new Usuario(
            nome || usuarioAntigo._nome, // Mantém o valor antigo caso não seja informado
            dataFormatada,
            novocpf || usuarioAntigo._cpf,
            telefone || usuarioAntigo._telefone
        );

        // Se a instância for criada corretamente, substituir no array
        if (usuarioAtualizado.nome) {
            usuarios[usuarioIndex] = usuarioAtualizado;
            // Atualiza os empréstimos que tinham o CPF antigo
            emprestimos.forEach(emprestimo => {
                if (emprestimo._CPFUsuario === cpf) {
                    emprestimo._CPFUsuario = novocpf;
                }
            });
           return res.json({ mensagem: "Usuário atualizado com sucesso.", usuario: usuarioAtualizado });
        } else {
           return res.status(400).json({ mensagem: "Dados inválidos. Usuário não foi atualizado." });
        }
    } else {
       return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
});


// DELETE /usuarios/:cpf - Exclui um usuário (Finalizado)
app.delete('/usuarios/:cpf', (req, res) => {
    const cpf = parseInt(req.params.cpf);
    const usuarioIndex = usuarios.findIndex(u => u._cpf === cpf); // Encontra o índice do usuário

    // Verificando se o autor não escreveu nenhum livro para estar veinculado a ele
    const usuariosEmprestimos = emprestimos.some(emprestimo => 
        emprestimo._CPFUsuario === cpf
    );

    if (usuariosEmprestimos) {
        return res.status(404).json({ mensagem: "Não é possível excluir o usuário, ele está veinculado a algum empréstimo" });
    }
    
    if (usuarioIndex !== -1) {
        usuarios.splice(usuarioIndex, 1); // Remove o usuário pelo indice
       return res.status(201).json({mensagem: 'Usuário deletado com sucesso.'});
    }else{
       return res.status(404).json({ mensagem: 'Usuário não encontrado.'});;
    }
});

// --- Fim Usuário



// Classe Autor
class Autor {
    constructor(nome, id, dataNascimento, biografia) {
        const today = new Date();

        // Convertendo dataNascimento para Date, se necessário
        if (typeof dataNascimento === "string") {
            dataNascimento = new Date(dataNascimento);
        }

        // Validando os dados
        if (
            nome.trim() !== "" &&
            biografia.trim() !== "" &&
            Number.isInteger(id) &&
            !isNaN(dataNascimento.getTime()) &&
            dataNascimento.getTime() <= today.getTime()
        ) {
            this._nome = nome;
            this._biografia = biografia;
            this._id = id;
            this._dataNascimento = dataNascimento;
        } else {
            console.log("Dados inválidos para criação do Autor.");
        }
    }

    // Métodos SET
    set biografia(biografia) {
        if (biografia.trim() !== "") {
            this._biografia = biografia;
        } else {
            console.log("Biografia não pode ser vazia.");
        }
    }

    set nome(nome) {
        if (nome.trim() !== "") {
            this._nome = nome;
        } else {
            console.log("Nome não pode ser vazio.");
        }
    }

    set dataNascimento(dataNascimento) {
        const today = new Date();

        if (typeof dataNascimento === "string") {
            dataNascimento = new Date(dataNascimento);
        }

        if (!isNaN(dataNascimento.getTime()) && dataNascimento.getTime() <= today.getTime()) {
            this._dataNascimento = dataNascimento;
        } else {
            console.log("Data de nascimento inválida.");
        }
    }

    // Métodos GET
    get biografia() {
        return this._biografia;
    }

    get nome() {
        return this._nome;
    }

    get dataNascimento() {
        return this._dataNascimento;
    }

    get id() {
        return this._id;
    }
}


// --- Consultas relacionadas ao autor

// GET /autores - Listando todos os autores (Finalizado)
app.get('/autores', (req, res) => {
   return res.json(autores);
});


// GET /autores/id: - Buscar um autor pelo ID (Finalizado)
app.get('/autores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const autor = autores.find(u => u._id === id);
    if (autor){
       return res.json(autor);
    }else{
       return res.status(404).json({mensagem: "Autor não encontrado"});
    }
});


// POST /autores - Cadastra novo Autor (Finalizado)
app.post('/autores/', (req, res) => {
    const { nome, dataNascimento, biografia } = req.body;

    // Verificando se é o primeiro registro
    let id = (autores.length > 0) ? autores[autores.length - 1]._id + 1 : 1;
    id = parseInt(id);

    // Convertendo a data para um objeto Date
    const dataFormatada = new Date(dataNascimento);

    // Validando a data antes de instanciar a classe
    if (isNaN(dataFormatada.getTime())) {
        return res.status(400).json({mensagem: "Data de nascimento inválida." });
    }

    // Criando um novo autor
    const novoAutor = new Autor(nome, id, dataFormatada, biografia);

    // Verificando se o autor foi criado corretamente
    if (novoAutor.nome) {
        autores.push(novoAutor);
       return res.status(201).json({mensagem: `Autor ${novoAutor.nome} cadastrado com sucesso.`, cadastrou: true });
    } else {
       return res.status(400).json({mensagem: "Dados incorretos, autor não foi cadastrado." });
    }
});


// PUT /autores/:id - Atualiza um Autor existente (Finalizado)
app.put('/autores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const autorIndex = autores.findIndex(a => a._id === id);

    if (autorIndex !== -1) {
        const autorAntigo = autores[autorIndex];
        const { nome, dataNascimento, biografia } = req.body;

        // Se a data for fornecida como string, converter para Date
        const dataFormatada = dataNascimento ? new Date(dataNascimento) : autorAntigo._dataNascimento;

        // Criando uma nova instância da classe Autor para validar os dados
        const autorAtualizado = new Autor(
            nome || autorAntigo._nome, // Mantém o valor antigo caso não seja informado
            id,
            dataFormatada,
            biografia || autorAntigo._biografia
        );

        // Se a instância for criada corretamente, substituir no array
        if (autorAtualizado.nome) {
            autores[autorIndex] = autorAtualizado;
           return res.json({ mensagem: "Autor atualizado com sucesso.", autor: autorAtualizado });
        } else {
           return res.status(400).json({ mensagem: "Dados inválidos. Autor não foi atualizado." });
        }
    } else {
       return res.status(404).json({ mensagem: "Autor não encontrado." });
    }
});


// DELETE /autores/:id - Exclui um Autor (Finalizado)
app.delete('/autores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const autorIndex = autores.findIndex(u => u._id === id); // Encontra o índice do Autor

    // Verificando se o autor não escreveu nenhum livro para estar veinculado a ele
    const autoresLivros = livros.some(livro => 
        livro._idAutor === id
    );

    if (autoresLivros) {
        return res.status(404).json({ mensagem: "Não é possível excluir o autor, ele está veinculado a algum livro" });
    }
    
    if (autorIndex !== -1) {
        autores.splice(autorIndex, 1); // Remove o Autor pelo indice
       return res.status(201).json({mensagem: "Autor deletado com sucesso."});
    }else{
       return res.status(404).json({mensagem: 'Autor não encontrado'});;
    }
});

// --- Fim Autor



// Classe Empréstimo
class Emprestimo{

    // Método Construtor
    constructor(id, CPFUsuario, ISBNLivro, maxDataDevolucao, valor, status){
        const today = new Date();

        // Convertendo dataNascimento para Date, se necessário
        if (typeof maxDataDevolucao === "string") {
            maxDataDevolucao = new Date(maxDataDevolucao);
        }

        if (Number.isInteger(id) && !isNaN(maxDataDevolucao.getTime()) && maxDataDevolucao.getTime() > today.getTime() && Number(valor) && valor !== 0 && Number.isInteger(CPFUsuario) && (status === "Emprestado" || status === "Devolvido")){
            this._id = id;
            this._CPFUsuario = CPFUsuario;
            this._ISBNLivro = ISBNLivro;
            this._maxDataDevolucao = maxDataDevolucao;
            this._valor = valor;
            this._status = status;
        }else{
            console.log("Dados inválidos para criação do Empréstimo.");
        }
    }


    // Métodos SET's
    set maxDataDevolucao(maxDataDevolucao){
        if (!isNaN(maxDataDevolucao.getTime()) && maxDataDevolucao.getTime() <= today.getTime()){
            this._maxDataDevolucao = maxDataDevolucao;
        }else{
            console.log("Data máxima de devolução inválida.")
        }
    }

    set ISBNLivro(ISBNLivro){
        if (Number.isInteger(ISBNLivro)){
            this._ISBNLivro = ISBNLivro;
        }else{
            console.log("ISBN inválido.");
        }
    }

    set CPFUsuario(CPFUsuario){
        if (Number.isInteger(CPFUsuario)){
            this._CPFUsuario = CPFUsuario;
        }else{
            console.log("ISBN inválido.");
        }
    }

    set valor(valor){
        if (Number(valor) && valor !== 0){
            this._valor = valor;
        }else{
            console.log("Valor do empréstimo inválido.")
        }
    }

    set status(status){
        if (status === "Emprestado" || status === "Devolvido"){
            this._status = status;
        }else{
            console.log("Status do empréstimo inválido.")
        }
    }

    // Métodos GET's
    get maxDataDevolucao(){
        return this._maxDataDevolucao;
    }

    get CPFUsuario(){
        return this._CPFUsuario;
    }

    get ISBNLivro(){
        return this._ISBNLivro;
    }

    get valor(){
        return this._valor;
    }

    get id(){
        return this._id;
    }

    get status(){
        return this._status;
    }
}


// --- Consultas relacionadas ao empréstimo
// GET /emprestimos/buscageral/:tipobusca - Listando todos os empréstimos (Finalizado)
app.get('/emprestimos/buscageral/:tipobusca', (req, res) => {
    const tipoBusca = parseInt(req.params.tipobusca);

    if (tipoBusca === 1){
       return res.json(emprestimos);
    }else if (tipoBusca === 2) {
        resultado = emprestimos.filter(e => e._status === "Emprestado");
        return res.json(resultado);
    }else{
        resultado = emprestimos.filter(e => e._status === "Devolvido");
        return res.json(resultado);
    }
});


// GET /emprestimos/id: - Busca um empréstimo pelo id (Finalizado)
app.get('/emprestimos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const emprestimo = emprestimos.find( e => e._id === id);
    if (emprestimo){
       return res.json(emprestimo);
    }else{
       return res.status(404).json({mensagem: "Empréstimo não encontrado"});
    }
});


// POST /emprestimos - Cadastra novo empréstimo (Finalizado)
app.post('/emprestimos', (req, res) => {
    let { cpfUsuario, isbnLivro, maxDataDevolucao, valor } = req.body;
    const status = "Emprestado";

    cpfUsuario = parseInt(cpfUsuario);
    valor = parseFloat(valor);

    // Verifica se todos os livros existem e têm estoque suficiente
    let livrosIndisponiveis = isbnLivro.filter(isbn => {
        let livro = livros.find(l => l._isbn === Number(isbn));
        return !livro || livro._qtDisponivel <= 0;
    });

    if (livrosIndisponiveis.length > 0) {
        return res.status(400).json({
            mensagem: "Alguns livros não estão disponíveis no estoque.",
            livrosIndisponiveis
        });
    }

    // Verificando se é o primeiro registro
    const id = (emprestimos.length > 0) ? emprestimos[emprestimos.length - 1].id + 1 : 1;

    // Convertendo a data para um objeto Date
    const dataFormatada = new Date(maxDataDevolucao);

    // Validando a data antes de instanciar a classe
    if (isNaN(dataFormatada.getTime())) {
        return res.status(400).json({mensagem: "Data máxima para a devolução inválida." });
    }

    // Criando um novo empréstimo
    const novoEmprestimo = new Emprestimo(id, cpfUsuario, isbnLivro, dataFormatada, valor, status);

    // Verificando se o empréstimo foi criado corretamente
    if (novoEmprestimo.id) {
        emprestimos.push(novoEmprestimo);
        // Reduzindo 1 unidade do estoque de cada livro emprestado
        isbnLivro.forEach(isbn => {
            let livro = livros.find(l => l._isbn === Number(isbn));
            if (livro) livro._qtDisponivel -= 1;
        });
       return res.status(201).json({mensagem: `Empréstimo de ID ${novoEmprestimo.id} cadastrado com sucesso.`, cadastrou: true });
    } else {
       return res.status(400).json({mensagem: "Dados incorretos, empréstimo não foi cadastrado." });
    }
});


// PUT /emprestimos/:id - Atualiza um Empréstimo existente (Finalizado)
app.put('/emprestimos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const emprestimoIndex = emprestimos.findIndex(e => e._id === id);

    if (emprestimoIndex !== -1) {
        const emprestimoAntigo = emprestimos[emprestimoIndex];
        let { cpfUsuario, isbnLivro, maxDataDevolucao, valor, status } = req.body;

        cpfUsuario = parseInt(cpfUsuario);
        valor = parseFloat(valor);

        // Verificando se CPF de usuário existe
        const usuarioValida = usuarios.findIndex(u => u._cpf === cpfUsuario);

        if (usuarioValida === -1){
            return res.status(400).json({ mensagem: "CPF não cadastrado. Empréstimo não foi atualizado." });
        }

        // Se a data for fornecida como string, converter para Date
        const dataFormatada = maxDataDevolucao ? new Date(maxDataDevolucao) : emprestimoAntigo._maxDataDevolucao;

        // Criando uma nova instância da classe emprestimo para validar os dados
        const emprestimoAtualizado = new Emprestimo(
            id,
            cpfUsuario || emprestimoAntigo._cpfUsuario, // Mantém o valor antigo caso não seja informado
            isbnLivro || emprestimoAntigo._isbnLivro,
            dataFormatada,
            valor || emprestimoAntigo._valor,
            status || emprestimoAntigo._status
        );

        // Se a instância for criada corretamente, substituir no array
        if (emprestimoAtualizado.valor) {

            // Obtendo o ISBN dos livros que estavam emprestados e podem ter sido trocados
            const livrosRepor = emprestimos[emprestimoIndex]._ISBNLivro;

            // Devolvendo os livros para o estoque
            livrosRepor.forEach(isbn => {
                let livro = livros.find(e => e._isbn === Number(isbn));
                if (livro) livro._qtDisponivel += 1;
            });

            // Verificando se o status continuou como "Emprestado" ou foi para "Devolvido", se não precisa recolocar os livros novamente (Seria a Devolução)
            if (status === "Emprestado"){
                // Retirando um de cada livro do estoque
                isbnLivro.forEach(isbn => {
                    let livro = livros.find(e => e._isbn === Number(isbn));
                    if (livro) livro._qtDisponivel -= 1;
                });
            }
            
            // Atualizando empréstimo na tabela
            emprestimos[emprestimoIndex] = emprestimoAtualizado;
           return res.json({ mensagem: "Empréstimo atualizado com sucesso.", emprestimo: emprestimoAtualizado });
        } else {
           return res.status(400).json({ mensagem: "Dados inválidos. Empréstimo não foi atualizado." });
        }
    } else {
       return res.status(404).json({ mensagem: "Empréstimo não encontrado." });
    }
});


// DELETE /emprestimos/:id - Exclui um empréstimo (Finalizado)
app.delete('/emprestimos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const emprestimoIndex = emprestimos.findIndex(e => e._id === id); // Encontra o índice do usuário
    
    if (emprestimoIndex !== -1) {

        // Obtendo o ISBN dos livros que estavam eprestados
        const livrosRepor = emprestimos[emprestimoIndex]._ISBNLivro;

        // Devolvendo os livros para o estoque
        livrosRepor.forEach(isbn => {
            let livro = livros.find(e => e._isbn === Number(isbn));
            if (livro) livro._qtDisponivel += 1;
        });

        emprestimos.splice(emprestimoIndex, 1); // Remove o empréstimo pelo indice
       return res.status(201).json({mensagem: 'Empréstimo deletado com sucesso e livros devolvidos ao estoque.'});
    }else{
       return res.status(404).json({ mensagem: 'Empréstimo não encontrado.'});;
    }
});

// --- Fim Empréstimo

// Console que "LIGA"
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});