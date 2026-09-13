// Importa a função que salva o jogo na mesma biblioteca (localStorage)
// que a página Biblioteca usa
import { adicionarJogo, extrairNota } from './dados.js';

// Ação dos botões de adicionar jogo aos favoritos/biblioteca
const botoesAdicionar = document.querySelectorAll('article button');

botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        const card = evento.target.closest('article');
        const nomeJogo = card.querySelector('h3').textContent;
        const nota = extrairNota(card.querySelector('p').textContent);

        // Aqui os cards da Home não mostram a plataforma, então
        // salvamos como "Não informado"
        const conseguiuAdicionar = adicionarJogo(nomeJogo, 'Não informado', nota, 'Jogando');

        if (conseguiuAdicionar) {
            alert(`"${nomeJogo}" foi adicionado à sua biblioteca com sucesso!`);
            botao.textContent = 'Adicionado ✓';
            botao.style.backgroundColor = '#7B37FB';
            botao.style.color = '#FFFFFF';
        } else {
            alert(`"${nomeJogo}" já está na sua biblioteca!`);
        }
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