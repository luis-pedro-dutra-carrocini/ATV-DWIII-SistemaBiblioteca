# Atividade de Desenvolvimento Web III - Sistema simples de Biblioteca

Esse projeto se trata de um sistema simples de biblioteca, onde é possível realizar cadastros de usuários, autores, livros e a realização de empréstimos de livros. Além de relizar consultas com esses dados, realizando um controle de distribuição da biblioteca.

## 📄 Descrição

O site apresenta as seguintes páginas, com as seguintes funções:

* Index (A partir dessa página o usuário poderá navegar para as outras);
* Consulta de Usuários (Nessa página é possivel realizar uma consulta devolvendo todos os usuários / leitores cadastrados);
* Consulta de Autores (Nessa página é possivel realizar uma consulta devolvendo todos os autores cadastrados);
* Consulta de Livros (Nessa página é possivel realizar uma consulta devolvendo todos os livros cadastrados, emprestados ou disponíveis);
* Consulta de Empréstomos (Nessa página é possivel realizar uma consulta devolvendo todos os esmpréstimos cadastrados, sejam eles já devolvidos ou ainda emprestados);
* Para todas as entidades, também é possível fazer alterações (no caso dos empréstimos, é possivel fecha-los com o status de devolvido);
<br>

## 📃 Obter cópia

Para obter uma cópia basta baixar todos os arquivos presentes nesse repositório, além de executar o código SQL do Banco de Dados em um SGBD (Foi utilizado o MySQL), depois executar o comando "node index.js" no terminal do back-end, abrindo em um navagador (Chrome, Edge, FireFox, etc.) o arquivo index.html que fará a consulta a URL (http://localhost:3000/) retornando os dados desejados.


## 📋 Pré-requisitos

Para que o site possa apresentar pleno funcionamento é necessário um navegador com acessoa a Internet, e que suporte JavaScript. Além de um SQGB local ou hospedado na nuvem para Banco de Dados.


## 🔧 Instalação

* Baixe os arquivos e pastas contidas nesse repositório e os coloque em uma pasta;
* Execute o código do Banco de Dados (CreateBiblioteca.sql) em um SGBD (Sistema Gerenciador de Banco de Dados), Online ou Local - Recomendável o MySQL Local;
* Deixe ativado o JavaScript no seu navegador;
* Instale o node em sua máquina;
* Execute no terminal do repositório o comando "node index.html";
* Abra em um navegador o arquivo index.html;

## 🛠️ Construído com

Ferramentas:
* Visual Studio Code- Editor de Código-Fonte;
* MySQL - Sistema Gerenciador de Banco de Dados;
* Postman - Usado para os Testes do Back-End;

Linguagens:
* HTML5 - Linguagem de Marcação;
* JavaScript - Linguagem de Programação
* CSS - Linguagem Web de Formatação;
* Node JS - Utilizado no Back-End, fazendo a conexão com o Banco de Dados;
* SQL - Utilizado para a criação e interação com o banco de dados;

## ✒️ Autores

* **[Luís Pedro Dutra Carrocini](https://github.com/luis-pedro-dutra-carrocini)** - *Criação do Back-End; Criação do Banco de Dados;*
* **[Maria Luiza Barbosa](https://github.com/mluizabss)** - *Criação do Design; Criação do Front-End;*
