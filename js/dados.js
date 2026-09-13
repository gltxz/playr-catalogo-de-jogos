// ==========================================================
// DADOS - Playr
// Modulo ES6 com a função para adicionar um jogo na Biblioteca
// a partir de qualquer página do site (Home, Explorar ou
// Detalhes). Usa a mesma "gaveta" do localStorage que a
// página Biblioteca usa (js/biblioteca.js), então o jogo
// aparece lá também.
// ==========================================================

const CHAVE = "playr-biblioteca";

// Pega o primeiro número de dentro de um texto.
// Ex: "★ 4.8" vira 4.8 e "★ 4.8 / 5.0" também vira 4.8
export function extrairNota(texto) {
    const encontrado = texto.match(/[\d.]+/);
    return encontrado ? parseFloat(encontrado[0]) : 0;
}

// Adiciona um jogo na biblioteca (localStorage).
// Devolve true se conseguiu adicionar, e false se esse jogo
// (mesmo nome) já estava salvo antes.
export function adicionarJogo(nome, plataforma, nota, status) {
    const dadosSalvos = localStorage.getItem(CHAVE);
    let biblioteca = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    const jaExiste = biblioteca.some(function (jogo) {
        return jogo.nome.toLowerCase() === nome.toLowerCase();
    });

    if (jaExiste) {
        return false;
    }

    biblioteca.push({
        nome: nome,
        plataforma: plataforma,
        status: status,
        nota: nota
    });

    localStorage.setItem(CHAVE, JSON.stringify(biblioteca));
    return true;
}
