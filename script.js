const quizData = [
    {
        question: "Pergunta 1: O clássico dilema do peru/chester seco. Qual a melhor estratégia para garantir uma ave suculenta?",
        options: [
            "A) Assar na temperatura máxima para selar os sucos.",
            "B) Deixar marinando por apenas 30 min antes de assar.",
            "C) Usar um termômetro de carne e retirar ao atingir 74°C.",
            "D) Regar a ave com o próprio caldo a cada 5 minutos."
        ],
        correct: 2, // Index of option C
        explanation: "O segredo é a temperatura interna! 74°C é o ponto perfeito de segurança e suculência. Assar demais resseca a carne."
    },
    {
        question: "Pergunta 2: A uva passa no arroz. Como evitar a Terceira Guerra Mundial na Ceia?",
        options: [
            "A) Esconder as passas no meio do arroz para ser uma surpresa.",
            "B) Servir as passas em um pote separado (o acordo de paz).",
            "C) Proibir uva passa por decreto lei familiar.",
            "D) Colocar uva passa em TUDO, até na farofa."
        ],
        correct: 1,
        explanation: "A democracia natalina exige opções! Servir separado agrada gregos e troianos (e evita discussões)."
    },
    {
        question: "Pergunta 3: O tio do 'pavê ou pacumê' atacou novamente. Qual a melhor reação?",
        options: [
            "A) Rir forçado e mudar de assunto.",
            "B) Explicar a etimologia da palavra pavê.",
            "C) Ignorar solenemente e continuar comendo.",
            "D) Responder 'É paçoca' e sair andando."
        ],
        correct: 0,
        explanation: "Sorria e acene! É uma tradição inevitável. Manter o clima leve é essencial para a sobrevivência."
    },
    {
        question: "Pergunta 4: Como calcular a quantidade de comida para não sobrar para 2026?",
        options: [
            "A) Fazer 1kg de carne por pessoa 'só pra garantir'.",
            "B) Calcular 200g de carne por pessoa + acompanhamentos.",
            "C) Pedir para cada convidado trazer um prato surpresa.",
            "D) Não calcular e cozinhar até acabar o gás."
        ],
        correct: 1,
        explanation: "200g a 300g de carne por pessoa é suficiente quando há fartura de acompanhamentos. Evite o desperdício!"
    },
    {
        question: "Pergunta 5: Presente de Amigo Secreto ruim. O que fazer?",
        options: [
            "A) Chorar na frente de todos.",
            "B) Tentar trocar na loja discretamente depois.",
            "C) Fazer um discurso passivo-agressivo.",
            "D) Agradecer e dizer que 'era exatamente o que queria'."
        ],
        correct: 3,
        explanation: "A etiqueta natalina manda agradecer! O que vale é a intenção (mesmo que seja um par de meias neon)."
    },
    {
        question: "Pergunta 6: A sobremesa acabou antes de todo mundo comer. E agora?",
        options: [
            "A) Improvisar um creme de frutas com o que tiver na geladeira.",
            "B) Mandar alguém comprar sorvete no posto de gasolina.",
            "C) Servir panetone amanhecido como 'rabanada gourmet'.",
            "D) Declarar o fim da festa."
        ],
        correct: 0,
        explanation: "Criatividade salva! Frutas, creme de leite e leite condensado viram uma mousse rápida em minutos."
    },
    {
        question: "Pergunta 7: Hora de ir embora, mas a visita não vai. Como proceder?",
        options: [
            "A) Começar a apagar as luzes e bocejar.",
            "B) Perguntar 'vocês vão querer café?' (o código universal).",
            "C) Colocar pijama na sala.",
            "D) Chamar um Uber para eles sem avisar."
        ],
        correct: 1,
        explanation: "Oferecer o 'cafézinho de despedida' é o sinal universal e educado de que a festa acabou."
    }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackBox = document.getElementById('feedbackBox');
const feedbackText = document.getElementById('feedbackText');
const nextBtn = document.getElementById('nextBtn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');

function loadQuestion() {
    const data = quizData[currentQuestion];
    questionText.innerText = data.question;
    optionsContainer.innerHTML = '';
    feedbackBox.style.display = 'none';
    nextBtn.style.display = 'none';

    data.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = option;
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex, btnElement) {
    const data = quizData[currentQuestion];
    const allOptions = document.querySelectorAll('.option-btn');

    // Disable all buttons
    allOptions.forEach(btn => btn.disabled = true);

    if (selectedIndex === data.correct) {
        btnElement.classList.add('correct');
        score++;
    } else {
        btnElement.classList.add('wrong');
        allOptions[data.correct].classList.add('correct');
    }

    feedbackText.innerText = data.explanation;
    feedbackBox.style.display = 'flex';
    nextBtn.style.display = 'block';
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
};

function showResults() {
    quizContainer.style.display = 'none';
    resultContainer.classList.remove('hidden');
    resultContainer.style.display = 'block';

    // Reset tiers
    document.querySelectorAll('.tier').forEach(t => t.classList.remove('active'));

    let tierId = '';
    if (score <= 3) {
        tierId = 'tier1';
    } else if (score <= 5) {
        tierId = 'tier2';
    } else {
        tierId = 'tier3';
    }

    const activeTier = document.getElementById(tierId);
    if (activeTier) {
        activeTier.classList.add('active');
        // Scroll to results
        activeTier.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Start the quiz
loadQuestion();
