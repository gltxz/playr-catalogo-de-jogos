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
        event.stopPropagation(); // Impede que o clique abra a página de detalhes
        alert('Jogo adicionado à sua biblioteca!');
    });
});