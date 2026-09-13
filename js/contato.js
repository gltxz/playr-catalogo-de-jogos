// Abre e fecha as respostas das perguntas frequentes

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(function(question) {

    question.addEventListener('click', function() {

        const faqItem = question.parentElement;
        const icon = question.querySelector('.faq-icon');

        faqItem.classList.toggle('active');

        if (faqItem.classList.contains('active')) {
            icon.textContent = '-';
        } else {
            icon.textContent = '+';
        }

    });

});


// Mensagem de confirmação do formulário

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const status = document.getElementById('form-status');

    status.textContent =
        'Mensagem enviada com sucesso! Obrigado por entrar em contato.';

    status.classList.add('success');

    contactForm.reset();

});
