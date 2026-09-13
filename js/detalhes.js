// Base de dados dos jogos em um objeto JSON
const jogos = {
    "god-of-war": {
        titulo: "God of War Ragnarök",
        estudio: "Santa Monica Studio",
        ano: "2024",
        capa: "img/God_of_War_Ragnarok_capa.jpg",
        video: "videos/god.mp4",
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
        video: "videos/homemaranha.mp4",
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
        video: "videos/Astro-Bot-Announcement-Trailer-PS5.mp4",
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
        video: "videos/rat.mp4",
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
        video: "videos/Returnal-Gameplay-Trailer-PS5_Media_.mp4",
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
        video: "videos/Demon-s-Souls-Gameplay-Trailer-PS5_.mp4",
        plataformas: ["PS5", "PC"],
        generos: ["RPG", "Ação", "Soulslike"],
        nota: "★ 4.9 / 5.0",
        sinopse: "Totalmente reconstruído do zero, este remake convida você a experimentar a história perturbadora e a ação implacável de Demon's Souls. Desbrave o reino sombrio de Boletaria, enfrente demônios colossais e teste seus limites em um dos RPGs de ação mais desafiadores da história."
    }
};

// Função para pegar os parâmetros da URL (ex: ?jogo=astro-bot)
function carregarDetalhesDoJogo() {
    const urlParams = new URLSearchParams(window.location.search);
    const idJogo = urlParams.get('jogo') || 'god-of-war'; // Se não tiver nada na URL, abre o God of War por padrão

    const jogoAtual = jogos[idJogo];

    if (jogoAtual) {
        // Atualiza a página com os dados do jogo selecionado
        document.title = `${jogoAtual.titulo} - Playr`;
        document.getElementById('game-title').innerText = jogoAtual.titulo;
        document.getElementById('game-studio-year').innerText = `Desenvolvedora: ${jogoAtual.estudio} | Ano: ${jogoAtual.ano}`;
        document.getElementById('game-cover-img').src = jogoAtual.capa;
        document.getElementById('game-cover-img').alt = `Capa de ${jogoAtual.titulo}`;
        document.getElementById('game-video').src = jogoAtual.video;
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
    alert('Jogo adicionado à sua Biblioteca!');
});

document.getElementById('btn-wishlist')?.addEventListener('click', () => {
    alert('Jogo adicionado à sua Wishlist!');
});

// Executa a função assim que a página carregar
window.addEventListener('DOMContentLoaded', carregarDetalhesDoJogo);
