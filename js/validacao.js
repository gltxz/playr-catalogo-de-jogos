// ==========================================================
// VALIDACAO - Playr
// Modulo ES6 com as funcoes de validacao dos formularios do
// site. Cada funcao recebe os dados digitados e devolve o
// texto do erro. Se estiver tudo certo, devolve uma string
// vazia (""), o que os formularios usam para saber se podem
// ser enviados.
// ==========================================================

// Usada no formulario de "Adicionar jogo" da Biblioteca
export function validarJogo(nome, plataforma, status, nota) {
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
        return "A nota precisa ser um número.";
    }

    else if (nota < 0 || nota > 5) {
        return "A nota precisa estar entre 0 e 5.";
    }

    return "";
}

// Usada no formulario de publicacao da Comunidade
export function validarPost(texto) {
    if (texto == "") {
        return "Escreva alguma coisa antes de publicar.";
    }

    else if (texto.length < 5) {
        return "A publicação precisa ter pelo menos 5 letras.";
    }

    else if (texto.length > 200) {
        return "A publicação pode ter no máximo 200 letras.";
    }

    return "";
}
