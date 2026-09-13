// ==========================================================
// BIBLIOTECA - Playr
// Guarda os jogos do usuario nas categorias Jogando,
// Concluido e Lista de Desejos.
// ==========================================================

// Array que guarda todos os jogos (cada jogo e um objeto)
let biblioteca = [];

// Constante com o nome da "gaveta" onde o navegador salva os dados
const CHAVE = "playr-biblioteca";

// Elementos do formulario
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
// VALIDACAO
// Recebe os dados digitados e devolve o texto do erro.
// Se estiver tudo certo, devolve uma string vazia.
// ----------------------------------------------------------
function validar(nome, plataforma, status, nota) {
    if (nome == "") {
        return "Digite o nome do jogo.";
    }

    else if (nome.length < 2) {
        return "O nome do jogo precisa ter pelo menos 2 letras.";
    }

    else if (plataforma == "") {
        return "Escolha uma plataforma.";
    }

    else if (status == "") {
        return "Escolha um status.";
    }

    else if (isNaN(nota)) {
        return "A nota precisa ser um numero.";
    }

    else if (nota < 0 || nota > 5) {
        return "A nota precisa estar entre 0 e 5.";
    }

    return "";
}


// ----------------------------------------------------------
// Mostra uma mensagem de erro ou de sucesso abaixo do formulario
// ----------------------------------------------------------
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}


// ----------------------------------------------------------
// Salva a biblioteca no navegador e le de volta
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

    // Botao que muda o status do jogo para Concluido
    let btnConcluir = document.createElement("button");
    btnConcluir.type = "button";
    btnConcluir.textContent = "Concluir";

    btnConcluir.addEventListener("click", () => {
        jogo.status = "Concluido";
        salvar();
        mostrarJogos();
        atualizarResumo();
        mostrarMensagem(jogo.nome + " foi marcado como concluido!", "sucesso");
    });

    // Botao que remove o jogo da biblioteca
    let btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.textContent = "Remover";
    btnRemover.className = "btn-remover";

    btnRemover.addEventListener("click", () => {
        // indexOf descobre a posicao do jogo dentro do array
        let posicao = biblioteca.indexOf(jogo);
        biblioteca.splice(posicao, 1);

        salvar();
        mostrarJogos();
        atualizarResumo();
        mostrarMensagem(jogo.nome + " foi removido da biblioteca.", "sucesso");
    });

    // Se o jogo ja esta concluido, nao precisa do botao Concluir
    if (jogo.status != "Concluido") {
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

    // Aviso para quando nao houver nenhum jogo para mostrar
    if (quantidade == 0) {
        let aviso = document.createElement("p");
        aviso.className = "aviso-vazio";
        aviso.textContent = "Nenhum jogo por aqui ainda. Adicione o primeiro no formulario acima!";
        lista.appendChild(aviso);
    }

    console.log("Jogos exibidos na tela: " + quantidade);
}


// ----------------------------------------------------------
// Atualiza os numeros do resumo (indicadores calculados)
// ----------------------------------------------------------
function atualizarResumo() {
    let jogando = 0;
    let concluidos = 0;
    let somaNotas = 0;

    for (let jogo of biblioteca) {
        if (jogo.status == "Jogando") {
            jogando = jogando + 1;
        }

        else if (jogo.status == "Concluido") {
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
// EVENTO: enviar o formulario para adicionar um jogo
// ----------------------------------------------------------
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let nome = inputNome.value.trim();
    let plataforma = selectPlataforma.value;
    let status = selectStatus.value;
    let nota = parseFloat(inputNota.value);

    let erro = validar(nome, plataforma, status, nota);

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

    mostrarMensagem(nome + " foi adicionado a sua biblioteca!", "sucesso");
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
        mostrarMensagem("A biblioteca ja esta vazia.", "erro");
        return;
    }

    biblioteca = [];

    salvar();
    mostrarJogos();
    atualizarResumo();

    mostrarMensagem("Biblioteca limpa com sucesso.", "sucesso");
});


// ----------------------------------------------------------
// Quando a pagina abre, le o que estava salvo e desenha tudo
// ----------------------------------------------------------
carregar();
mostrarJogos();
atualizarResumo();
