// Importa a função que salva o jogo na mesma biblioteca (localStorage)
// que a página Biblioteca usa
import { adicionarJogo, extrairNota } from './dados.js';

// Guarda o jogo que está sendo mostrado na tela agora, pra
// poder usar nos botões "Adicionar" e "Wishlist" lá embaixo
let jogoAtual = null;

// Base de dados dos jogos em um objeto JSON
const jogos = {
    "god-of-war": {
        titulo: "God of War Ragnarök",
        estudio: "Santa Monica Studio",
        ano: "2024",
        capa: "img/God_of_War_Ragnarok_capa.jpg",
        plataformas: ["PC", "PS5", "Xbox"],
        generos: ["RPG", "Ação", "Mundo Aberto"],
        nota: "★ 4.8 / 5.0",
        sinopse: "Em um mundo devastado por forças desconhecidas, você assume o papel de um herói em uma jornada épica para descobrir a verdade por trás de um antigo poder. Com um mundo aberto vasto e cheio de segredos, o jogo combina ação intensa, exploração livre e uma história envolvente."
    },
    "spiderman": {
        titulo: "Marvel's Spider-Man 2",
        estudio: "Insomniac Games",
        ano: "2023",
        capa: "img/marvel.avif",
        plataformas: ["PS5", "PC"],
        generos: ["Ação", "Aventura", "Mundo Aberto"],
        nota: "★ 4.2 / 5.0",
        sinopse: "Os Spider-Men Peter Parker e Miles Morales retornam para uma nova e épica aventura na franquia aclamada pela crítica. Balance, salte e utilize as novas Asas de Teia para percorrer a cidade de Nova York da Marvel."
    },
    "astro-bot": {
        titulo: "Astro Bot",
        estudio: "Team Asobi",
        ano: "2024",
        capa: "img/Astro_Bot_capa.png",
        plataformas: ["PS5"],
        generos: ["Plataforma", "Aventura"],
        nota: "★ 4.6 / 5.0",
        sinopse: "Embarque em uma grandiosa aventura espacial com o Astro Bot! Explore galáxias vibrantes, resgate sua tripulação perdida e aproveite ao máximo os recursos inovadores do controle DualSense em uma obra-prima de plataforma."
    },
    "ratchet": {
        titulo: "Ratchet & Clank: Em Uma Outra Dimensão",
        estudio: "Insomniac Games",
        ano: "2021",
        capa: "img/rat.avif",
        plataformas: ["PS5", "PC"],
        generos: ["Ação", "Aventura", "Plataforma"],
        nota: "★ 3.8 / 5.0",
        sinopse: "Ajude Ratchet e Clank a combater um imperador robótico de outra realidade que pretende conquistar os mundos interdimensionais. Viaje através de fendas dimensionais com gráficos impressionantes e um arsenal explosivo totalmente novo."
    },
    "returnal": {
        titulo: "Returnal",
        estudio: "Housemarque",
        ano: "2021",
        capa: "img/returnal.avif",
        plataformas: ["PS5", "PC"],
        generos: ["Ação", "Tiro", "Roguelike"],
        nota: "★ 4.0 / 5.0",
        sinopse: "Após cair em um planeta alienígena disforme e cheio de perigos, Selene precisa lutar pela sobrevivência em um mundo hostil que muda a cada ciclo de morte. Um intenso jogo de tiro em terceira pessoa com elementos roguelike."
    },
    "demons-souls": {
        titulo: "Demon's Souls Remake",
        estudio: "Bluepoint Games",
        ano: "2020",
        capa: "img/Demons_Souls_remake_capa.png",
        plataformas: ["PS5", "PC"],
        generos: ["RPG", "Ação", "Soulslike"],
        nota: "★ 4.9 / 5.0",
        sinopse: "Totalmente reconstruído do zero, este remake convida você a experimentar a história perturbadora e a ação implacável de Demon's Souls. Desbrave o reino sombrio de Boletaria, enfrente demônios colossais e teste seus limites em um dos RPGs de ação mais desafiadores da história."
    },

    // Jogos que também aparecem em destaque na Home
    "sonic": {
        titulo: "Sonic",
        estudio: "Sega",
        ano: "2022",
        capa: "img/capasonic.jpg",
        plataformas: ["PC", "PlayStation", "Xbox", "Nintendo"],
        generos: ["Aventura", "Plataforma", "Ação"],
        nota: "★ 4.8 / 5.0",
        sinopse: "Sonic corre em alta velocidade para impedir os planos do Dr. Robotnik, enfrentando fases cheias de loopings, atalhos e power-ups em cenários vibrantes."
    },
    "fifa2025": {
        titulo: "FIFA2025",
        estudio: "EA Sports",
        ano: "2025",
        capa: "img/FIFA2025.avif",
        plataformas: ["PC", "PlayStation", "Xbox"],
        generos: ["Esporte", "Simulação"],
        nota: "★ 4.5 / 5.0",
        sinopse: "O simulador de futebol com times, campeonatos e jogadores licenciados, além de modo carreira e partidas online contra jogadores do mundo todo."
    },
    "mario": {
        titulo: "Mario",
        estudio: "Nintendo",
        ano: "2023",
        capa: "img/mario.png",
        plataformas: ["Nintendo"],
        generos: ["Plataforma", "Aventura"],
        nota: "★ 4.9 / 5.0",
        sinopse: "Mario e seus amigos enfrentam fases cheias de blocos, moedas e inimigos clássicos em uma aventura de plataforma que pode ser jogada sozinho ou com até 4 jogadores."
    },
    "gta": {
        titulo: "GTA",
        estudio: "Rockstar Games",
        ano: "2013",
        capa: "img/gta.webp",
        plataformas: ["PC", "PlayStation", "Xbox"],
        generos: ["Ação", "Mundo Aberto", "Aventura"],
        nota: "★ 4.9 / 5.0",
        sinopse: "Em um mundo aberto imenso, viva histórias de crime organizado, explore a cidade de Los Santos e participe do modo online com missões e atividades para todos os gostos."
    }
};

// Função para pegar os parâmetros da URL (ex: ?jogo=astro-bot)
function carregarDetalhesDoJogo() {
    const urlParams = new URLSearchParams(window.location.search);
    const idJogo = urlParams.get('jogo') || 'god-of-war'; // Se não tiver nada na URL, abre o God of War por padrão

    jogoAtual = jogos[idJogo];

    if (jogoAtual) {
        // Atualiza a página com os dados do jogo selecionado
        document.title = `${jogoAtual.titulo} - Playr`;
        document.getElementById('game-title').innerText = jogoAtual.titulo;
        document.getElementById('game-studio-year').innerText = `Desenvolvedora: ${jogoAtual.estudio} | Ano: ${jogoAtual.ano}`;
        document.getElementById('game-cover-img').src = jogoAtual.capa;
        document.getElementById('game-cover-img').alt = `Capa de ${jogoAtual.titulo}`;
        document.getElementById('game-banner-img').src = jogoAtual.capa;
        document.getElementById('game-banner-img').alt = `Capa de ${jogoAtual.titulo}`;
        document.getElementById('game-rating').innerText = jogoAtual.nota;
        document.getElementById('game-synopsis-text').innerText = jogoAtual.sinopse;

        // Renderiza Plataformas
        const platformsContainer = document.getElementById('platforms-list');
        platformsContainer.innerHTML = jogoAtual.plataformas
            .map(p => `<span class="tag">${p}</span> `)
            .join('');

        // Renderiza Gêneros
        const genresContainer = document.getElementById('genres-list');
        genresContainer.innerHTML = jogoAtual.generos
            .map(g => `<span class="tag">${g}</span> `)
            .join('');
    } else {
        console.warn(`Jogo "${idJogo}" não encontrado na base de dados.`);
    }
}

// Interatividade dos botões com JavaScript
document.getElementById('btn-add-library')?.addEventListener('click', () => {
    if (!jogoAtual) return;

    const nota = extrairNota(jogoAtual.nota);
    const plataforma = jogoAtual.plataformas.join(', ');
    const conseguiuAdicionar = adicionarJogo(jogoAtual.titulo, plataforma, nota, 'Jogando');

    if (conseguiuAdicionar) {
        alert(`"${jogoAtual.titulo}" foi adicionado à sua Biblioteca!`);
    } else {
        alert(`"${jogoAtual.titulo}" já está na sua Biblioteca!`);
    }
});

document.getElementById('btn-wishlist')?.addEventListener('click', () => {
    if (!jogoAtual) return;

    const nota = extrairNota(jogoAtual.nota);
    const plataforma = jogoAtual.plataformas.join(', ');
    const conseguiuAdicionar = adicionarJogo(jogoAtual.titulo, plataforma, nota, 'Lista de Desejos');

    if (conseguiuAdicionar) {
        alert(`"${jogoAtual.titulo}" foi adicionado à sua Wishlist!`);
    } else {
        alert(`"${jogoAtual.titulo}" já está na sua biblioteca!`);
    }
});

// Executa a função assim que a página carregar
window.addEventListener('DOMContentLoaded', carregarDetalhesDoJogo);
