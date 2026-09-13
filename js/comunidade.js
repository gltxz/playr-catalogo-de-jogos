// ==========================================================
// COMUNIDADE - Playr
// Publicar no feed, curtir, apagar, trocar a ordem dos posts
// e entrar nos grupos.
// ==========================================================

// Importa a validação do módulo ES6 (js/validacao.js)
import { validarPost } from "./validacao.js";

// Elementos do formulário
const form = document.getElementById("form-post");
const campoTexto = document.getElementById("texto");
const mensagem = document.getElementById("mensagem");

// Elementos do feed e dos grupos
const feed = document.getElementById("feed");
const btnOrdem = document.getElementById("btn-ordem");
const botoesGrupo = document.querySelectorAll(".btn-grupo");

// Guarda se o feed está na ordem normal ou invertida
let invertido = false;


// ----------------------------------------------------------
// Mostra uma mensagem de erro ou de sucesso
// ----------------------------------------------------------
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}


// ----------------------------------------------------------
// Faz o botao de curtir somar e diminuir uma curtida
// ----------------------------------------------------------
function ligarCurtida(botao, curtidas) {
    let total = curtidas;
    let curtido = false;

    botao.addEventListener("click", () => {
        if (curtido == true) {
            total = total - 1;
            curtido = false;
        }

        else {
            total = total + 1;
            curtido = true;
        }

        botao.textContent = "Curtir (" + total + ")";
        console.log("Curtidas: " + total);
    });
}


// ----------------------------------------------------------
// Monta um post novo e devolve pronto para entrar no feed
// ----------------------------------------------------------
function criarPost(texto) {
    let post = document.createElement("article");
    post.className = "post";

    let nome = document.createElement("h3");
    nome.textContent = "Você";

    let info = document.createElement("p");
    info.className = "post-info";
    info.textContent = "publicou agora";

    let corpo = document.createElement("p");
    corpo.className = "post-texto";
    corpo.textContent = texto;

    let botoes = document.createElement("div");
    botoes.className = "botoes-post";

    let btnCurtir = document.createElement("button");
    btnCurtir.type = "button";
    btnCurtir.className = "btn-curtir";
    btnCurtir.textContent = "Curtir (0)";
    ligarCurtida(btnCurtir, 0);

    let btnApagar = document.createElement("button");
    btnApagar.type = "button";
    btnApagar.className = "btn-apagar";
    btnApagar.textContent = "Apagar";

    btnApagar.addEventListener("click", () => {
        post.remove();
        mostrarMensagem("Publicação apagada.", "sucesso");
    });

    botoes.appendChild(btnCurtir);
    botoes.appendChild(btnApagar);

    post.appendChild(nome);
    post.appendChild(info);
    post.appendChild(corpo);
    post.appendChild(botoes);

    return post;
}


// ----------------------------------------------------------
// EVENTO: enviar o formulário para publicar
// ----------------------------------------------------------
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let texto = campoTexto.value.trim();

    let erro = validarPost(texto);

    if (erro != "") {
        mostrarMensagem(erro, "erro");
        return;
    }

    let post = criarPost(texto);

    // insertBefore coloca o post novo antes do primeiro que já existe
    feed.insertBefore(post, feed.firstElementChild);

    form.reset();
    mostrarMensagem("Publicação enviada!", "sucesso");
});


// ----------------------------------------------------------
// EVENTO: inverter a ordem do feed
// ----------------------------------------------------------
btnOrdem.addEventListener("click", () => {
    let posts = document.querySelectorAll(".post");

    // Jogar cada post para o topo, um por um, inverte a lista toda
    for (let post of posts) {
        feed.insertBefore(post, feed.firstElementChild);
    }

    if (invertido == true) {
        invertido = false;
        btnOrdem.textContent = "Mais recentes";
    }

    else {
        invertido = true;
        btnOrdem.textContent = "Mais antigos";
    }
});


// ----------------------------------------------------------
// EVENTO: entrar e sair de um grupo
// ----------------------------------------------------------
for (let botao of botoesGrupo) {
    botao.addEventListener("click", () => {
        if (botao.textContent == "Entrar") {
            botao.textContent = "Participando";
        }

        else {
            botao.textContent = "Entrar";
        }
    });
}


// ----------------------------------------------------------
// Liga as curtidas dos dois posts que ja vem no HTML
// ----------------------------------------------------------
const curtidasIniciais = document.querySelectorAll(".btn-curtir");

ligarCurtida(curtidasIniciais[0], 32);
ligarCurtida(curtidasIniciais[1], 18);
