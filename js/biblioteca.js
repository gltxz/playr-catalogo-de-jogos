// ==========================================================
// BIBLIOTECA - Playr
// Guarda os jogos do usuário nas categorias Jogando,
// Concluído e Lista de Desejos.
// ==========================================================

// Importa a validação do módulo ES6 (js/validacao.js)
import { validarJogo } from "./validacao.js";

// Array que guarda todos os jogos (cada jogo e um objeto)
let biblioteca = [];

// Constante com o nome da "gaveta" onde o navegador salva os dados
const CHAVE = "playr-biblioteca";

// Elementos do formulário
const form = document.getElementById("form-jogo");
const inputNome = document.getElementById("nome");
const selectPlataforma = document.getElementById("plataforma");
const selectStatus = document.getElementById("status");
const inputNota = document.getElementById("nota");
const mensagem = document.getElementById("mensagem");

// Elementos da lista e do resumo
const lista = document.getElementById("lista-jogos");
const filtro = document.getElementById("filtro");
const btnLimpar = document.getElementById("btn-limpar");
const totalJogos = document.getElementById("total-jogos");
const totalJogando = document.getElementById("total-jogando");
const totalConcluidos = document.getElementById("total-concluidos");
const mediaNotas = document.getElementById("media-notas");


// ----------------------------------------------------------
// Mostra uma mensagem de erro ou de sucesso abaixo do formulário
// ----------------------------------------------------------
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}


// ----------------------------------------------------------
// Salva a biblioteca no navegador e lê de volta
// ----------------------------------------------------------
function salvar() {
    localStorage.setItem(CHAVE, JSON.stringify(biblioteca));
}

function carregar() {
    let dados = localStorage.getItem(CHAVE);

    if (dados != null) {
        biblioteca = JSON.parse(dados);
    }
}


// ----------------------------------------------------------
// Monta o card de um jogo e devolve pronto para a tela
// ----------------------------------------------------------
function criarCard(jogo) {
    let card = document.createElement("article");
    card.className = "card-jogo";

    let titulo = document.createElement("h3");
    titulo.textContent = jogo.nome;

    let info = document.createElement("p");
    info.textContent = jogo.plataforma + " | Nota: " + jogo.nota;

    let etiqueta = document.createElement("span");
    etiqueta.textContent = jogo.status;
    etiqueta.className = "etiqueta";

    let botoes = document.createElement("div");
    botoes.className = "botoes-card";

    // Botão que muda o status do jogo para Concluído
    let btnConcluir = document.createElement("button");
    btnConcluir.type = "button";
    btnConcluir.textContent = "Concluir";

    btnConcluir.addEventListener("click", () => {
        jogo.status = "Concluído";
        salvar();
        mostrarJogos();
        atualizarResumo();
        mostrarMensagem(jogo.nome + " foi marcado como concluído!", "sucesso");
    });

    // Botão que remove o jogo da biblioteca
    let btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.textContent = "Remover";
    btnRemover.className = "btn-remover";

    btnRemover.addEventListener("click", () => {
        // indexOf descobre a posição do jogo dentro do array
        let posicao = biblioteca.indexOf(jogo);
        biblioteca.splice(posicao, 1);

        salvar();
        mostrarJogos();
        atualizarResumo();
        mostrarMensagem(jogo.nome + " foi removido da biblioteca.", "sucesso");
    });

    // Se o jogo já está concluído, não precisa do botao Concluir
    if (jogo.status != "Concluído") {
        botoes.appendChild(btnConcluir);
    }

    botoes.appendChild(btnRemover);

    card.appendChild(etiqueta);
    card.appendChild(titulo);
    card.appendChild(info);
    card.appendChild(botoes);

    return card;
}


// ----------------------------------------------------------
// Desenha na tela os jogos que passam pelo filtro escolhido
// ----------------------------------------------------------
function mostrarJogos() {
    // Limpa a lista antes de desenhar tudo de novo
    lista.innerHTML = "";

    let escolhido = filtro.value;
    let quantidade = 0;

    for (let jogo of biblioteca) {
        // O jogo aparece se o filtro for "Todos" ou se o status for igual
        if (escolhido == "Todos" || jogo.status == escolhido) {
            lista.appendChild(criarCard(jogo));
            quantidade = quantidade + 1;
        }
    }

    // Aviso para quando não houver nenhum jogo para mostrar
    if (quantidade == 0) {
        let aviso = document.createElement("p");
        aviso.className = "aviso-vazio";
        aviso.textContent = "Nenhum jogo por aqui ainda. Adicione o primeiro no formulário acima!";
        lista.appendChild(aviso);
    }

    console.log("Jogos exibidos na tela: " + quantidade);
}


// ----------------------------------------------------------
// Atualiza os números do resumo (indicadores calculados)
// ----------------------------------------------------------
function atualizarResumo() {
    let jogando = 0;
    let concluidos = 0;
    let somaNotas = 0;

    for (let jogo of biblioteca) {
        if (jogo.status == "Jogando") {
            jogando = jogando + 1;
        }

        else if (jogo.status == "Concluído") {
            concluidos = concluidos + 1;
        }

        somaNotas = somaNotas + jogo.nota;
    }

    // Arrow function que calcula a media
    const calcularMedia = (soma, total) => soma / total;

    let media = 0;

    if (biblioteca.length > 0) {
        media = calcularMedia(somaNotas, biblioteca.length);
    }

    totalJogos.textContent = biblioteca.length;
    totalJogando.textContent = jogando;
    totalConcluidos.textContent = concluidos;
    mediaNotas.textContent = media.toFixed(1);
}


// ----------------------------------------------------------
// EVENTO: enviar o formulário para adicionar um jogo
// ----------------------------------------------------------
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let nome = inputNome.value.trim();
    let plataforma = selectPlataforma.value;
    let status = selectStatus.value;
    let nota = parseFloat(inputNota.value);

    let erro = validarJogo(nome, plataforma, status, nota);

    if (erro != "") {
        mostrarMensagem(erro, "erro");
        return;
    }

    // Objeto com os dados do jogo
    let jogo = {
        nome: nome,
        plataforma: plataforma,
        status: status,
        nota: nota
    };

    biblioteca.push(jogo);

    salvar();
    mostrarJogos();
    atualizarResumo();

    mostrarMensagem(nome + " foi adicionado à sua biblioteca!", "sucesso");
    form.reset();
});


// ----------------------------------------------------------
// EVENTO: trocar o filtro da lista
// ----------------------------------------------------------
filtro.addEventListener("change", () => {
    mostrarJogos();
});


// ----------------------------------------------------------
// EVENTO: limpar a biblioteca inteira
// ----------------------------------------------------------
btnLimpar.addEventListener("click", () => {
    if (biblioteca.length == 0) {
        mostrarMensagem("A biblioteca já está vazia.", "erro");
        return;
    }

    biblioteca = [];

    salvar();
    mostrarJogos();
    atualizarResumo();

    mostrarMensagem("Biblioteca limpa com sucesso.", "sucesso");
});


// ----------------------------------------------------------
// Quando a página abre, le o que estava salvo e desenha tudo
// ----------------------------------------------------------
carregar();
mostrarJogos();
atualizarResumo();
