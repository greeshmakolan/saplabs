const quizData = {
    HTML: [
        { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HyperText Markdown Language", "HyperTool Multi Language", "None"], answer: "HyperText Markup Language" },
        { question: "Which tag is used for inserting an image?", options: ["&lt;img&gt;", "&lt;image&gt;", "&lt;src&gt;", "&lt;pic&gt;"], answer: "&lt;img&gt;" },
        { question: "Which tag creates a hyperlink?", options: ["&lt;a&gt;", "&lt;link&gt;", "&lt;href&gt;", "&lt;url&gt;"], answer: "&lt;a&gt;" }
    ],
    CSS: [
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Syntax"], answer: "Cascading Style Sheets" },
        { question: "Which property changes text color?", options: ["font-color", "color", "text-color", "background-color"], answer: "color" },
        { question: "Which CSS unit is relative to parent font size?", options: ["px", "em", "%", "vh"], answer: "em" }
    ],
    JavaScript: [
        { question: "Which symbol is used for strict equality?", options: ["==", "===", "!=", "!=="], answer: "===" },
        { question: "Which keyword declares a constant?", options: ["var", "let", "const", "constant"], answer: "const" },
        { question: "Which method converts JSON string to object?", options: ["JSON.parse()", "JSON.stringify()", "toObject()", "parseJSON()"], answer: "JSON.parse()" }
    ],
    Bootstrap: [
        { question: "Bootstrap is primarily used for?", options: ["Database", "Styling & Layout", "Server-side scripting", "File storage"], answer: "Styling & Layout" },
        { question: "Which Bootstrap class makes text bold?", options: ["fw-bold", "text-bold", "font-weight", "bold"], answer: "fw-bold" },
        { question: "Which Bootstrap grid class creates 12 columns?", options: ["row", "col-12", "grid-12", "container"], answer: "row" }
    ]
};

let currentTopic = "";
let currentQuestion = 0;
let score = 0;

const quizDiv = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");

function startQuiz(topic) {
    currentTopic = topic;
    currentQuestion = 0;
    score = 0;
    document.getElementById("topicSelect").style.display = "none";
    quizDiv.style.display = "block";
    nextBtn.style.display = "inline-block";
    resultDiv.textContent = "";
    showQuestion(currentQuestion);
}

function showQuestion(index) {
    const q = quizData[currentTopic][index];
    quizDiv.innerHTML = `
    <div class="question">${q.question}</div>
    <ul class="options">
      ${q.options.map(opt =>
        `<li><label><input type="radio" name="option${currentTopic}${index}" value="${opt}"> ${opt}</label></li>`
    ).join("")}
    </ul>
  `;
}

nextBtn.addEventListener("click", () => {
    const selected = document.querySelector(`input[name="option${currentTopic}${currentQuestion}"]:checked`);
    if (selected) {
        if (selected.value === quizData[currentTopic][currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData[currentTopic].length) {
            showQuestion(currentQuestion);
        } else {
            quizDiv.innerHTML = "";
            nextBtn.style.display = "none";
            resultDiv.innerHTML = `🎉 Quiz finished! Your score is ${score} out of ${quizData[currentTopic].length}.<br><br>
        <button onclick="restartQuiz()">Restart Quiz</button>`;
        }
    } else {
        alert("Please select an option before continuing.");
    }
});
function restartQuiz() {
    document.getElementById("topicSelect").style.display = "block";
    quizDiv.style.display = "none";
    resultDiv.textContent = "";
}