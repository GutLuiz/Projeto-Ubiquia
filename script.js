document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        const answer = question.nextElementSibling; // Seleciona a resposta correspondente à pergunta

        question.addEventListener('click', function() {
            if (answer.style.display === 'block') {
                answer.style.display = 'none'; // Oculta a resposta se estiver visível
                this.querySelector('.arrow').innerHTML = '&#10148;'; // Alterna para a seta para a direita
            } else {
                answer.style.display = 'block'; // Mostra a resposta se estiver oculta
                this.querySelector('.arrow').innerHTML = '&#9660;'; // Alterna para a seta para baixo
            }
        });
    });
});
