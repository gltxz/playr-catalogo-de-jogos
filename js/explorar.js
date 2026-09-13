// Importa a função que salva o jogo na mesma biblioteca (localStorage)
// que a página Biblioteca usa
import { adicionarJogo, extrairNota } from './dados.js';

// Seleciona os elementos de busca e os cards de jogos
const searchInput = document.querySelector('.search-filter-bar input');
const filterBtn = document.querySelector('.search-filter-bar button');
const cards = document.querySelectorAll('.games-grid .card-link');

// Função simples para filtrar os jogos pelo nome digitado
function filtrarJogos() {
    const termo = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const titulo = card.querySelector('h3').textContent.toLowerCase();
        if (titulo.includes(termo)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Aciona a busca ao digitar ou clicar no botão "Filtrar"
filterBtn.addEventListener('click', filtrarJogos);
searchInput.addEventListener('keyup', filtrarJogos);

// Ação do botão de adicionar (+) nos cards
const botoesAdicionar = document.querySelectorAll('article button');
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', (event) => {
        event.preventDefault();  // Impede que o clique no botão siga o link do card
        event.stopPropagation(); // Impede que o clique "vaze" pro card e abra a página de detalhes

        const card = event.target.closest('article');
        const nomeJogo = card.querySelector('h3').textContent;
        const nota = extrairNota(card.querySelector('p').textContent);

        // Os cards do Explorar não mostram a plataforma, então
        // salvamos como "Não informado"
        const conseguiuAdicionar = adicionarJogo(nomeJogo, 'Não informado', nota, 'Jogando');

        if (conseguiuAdicionar) {
            alert(`"${nomeJogo}" foi adicionado à sua biblioteca!`);
        } else {
            alert(`"${nomeJogo}" já está na sua biblioteca!`);
        }
    });
});