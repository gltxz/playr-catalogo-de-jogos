// Ação dos botões de adicionar jogo aos favoritos/biblioteca
const botoesAdicionar = document.querySelectorAll('article button');

botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        const card = evento.target.closest('article');
        const nomeJogo = card.querySelector('h3').textContent;
        
        alert(`"${nomeJogo}" foi adicionado à sua biblioteca com sucesso!`);
        
        botao.textContent = 'Adicionado ✓';
        botao.style.backgroundColor = '#7B37FB';
        botao.style.color = '#FFFFFF';
    });
});

// Simulação de envio da barra de pesquisa
const formBusca = document.querySelector('nav form');

if (formBusca) {
    formBusca.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const inputBusca = formBusca.querySelector('input');
        
        if (inputBusca.value.trim() !== '') {
            alert(`Resultados da busca para: "${inputBusca.value}"`);
            inputBusca.value = '';
        }
    });
}