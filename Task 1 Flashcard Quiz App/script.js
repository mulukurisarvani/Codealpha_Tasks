// LocalStorage Persistence with default standard deck array fallback values
let deck = JSON.parse(localStorage.getItem('flashcards')) || [
    { question: "What is the capital of India?", answer: "New Delhi" },
    { question: "What does DOM stand for?", answer: "Document Object Model" },
    { question: "Which language runs directly in the browser?", answer: "JavaScript" }
];

let currentIndex = 0;
let isEditing = false;

// Core Functional Selectors
const flashcard = document.getElementById('flashcard');
const cardWrapper = document.getElementById('card-wrapper');
const qText = document.getElementById('card-question');
const aText = document.getElementById('card-answer');

const prevBtn = document.getElementById('prev-btn');
const flipBtn = document.getElementById('flip-btn');
const nextBtn = document.getElementById('next-btn');

const currentIndexSpan = document.getElementById('current-index');
const totalCountSpan = document.getElementById('total-count');

const formTitle = document.getElementById('form-title');
const newQuestionInput = document.getElementById('new-question');
const newAnswerInput = document.getElementById('new-answer');
const addBtn = document.getElementById('add-btn');
const cancelBtn = document.getElementById('cancel-btn');
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');

// Start up layout state engines
updateUI();

function updateUI() {
    // Reset layout configuration state orientations
    flashcard.classList.remove('flipped');
    flipBtn.textContent = "Show Answer";

    if (deck.length === 0) {
        qText.textContent = "Add your first flashcard to begin!";
        aText.textContent = "Answer text displays here.";
        currentIndexSpan.textContent = "0";
        totalCountSpan.textContent = "0";
        editBtn.classList.add('hidden');
        deleteBtn.classList.add('hidden');
        return;
    }

    editBtn.classList.remove('hidden');
    deleteBtn.classList.remove('hidden');

    // Index safety protection
    if (currentIndex >= deck.length) currentIndex = deck.length - 1;
    if (currentIndex < 0) currentIndex = 0;

    qText.textContent = deck[currentIndex].question;
    aText.textContent = deck[currentIndex].answer;
    
    currentIndexSpan.textContent = currentIndex + 1;
    totalCountSpan.textContent = deck.length;
}

// Flip Mechanics Action Routing
function toggleFlip() {
    if (deck.length === 0) return;
    flashcard.classList.toggle('flipped');
    flipBtn.textContent = flashcard.classList.contains('flipped') ? "Show Question" : "Show Answer";
}

cardWrapper.addEventListener('click', toggleFlip);
flipBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop click events bubbling into layout parent wrappers
    toggleFlip();
});

// Navigation Pagination Setup Logic
nextBtn.addEventListener('click', () => {
    if (deck.length <= 1) return;
    currentIndex = (currentIndex + 1) % deck.length;
    resetFormState();
    updateUI();
});

prevBtn.addEventListener('click', () => {
    if (deck.length <= 1) return;
    currentIndex = (currentIndex - 1 + deck.length) % deck.length;
    resetFormState();
    updateUI();
});

// Create and Edit Save Router Processing
addBtn.addEventListener('click', () => {
    const qVal = newQuestionInput.value.trim();
    const aVal = newAnswerInput.value.trim();

    if (!qVal || !aVal) {
        alert("Please completely fill out both fields.");
        return;
    }

    if (isEditing) {
        deck[currentIndex] = { question: qVal, answer: aVal };
    } else {
        deck.push({ question: qVal, answer: aVal });
        currentIndex = deck.length - 1;
    }

    localStorage.setItem('flashcards', JSON.stringify(deck));
    resetFormState();
    updateUI();
});

// Configure Component Edit Inputs States
editBtn.addEventListener('click', () => {
    if (deck.length === 0) return;
    isEditing = true;
    formTitle.textContent = `Editing Card #${currentIndex + 1}`;
    newQuestionInput.value = deck[currentIndex].question;
    newAnswerInput.value = deck[currentIndex].answer;
    addBtn.textContent = "Update Flashcard";
    cancelBtn.classList.remove('hidden');
});

// Deletion Operations Workflow
deleteBtn.addEventListener('click', () => {
    if (deck.length === 0) return;
    
    if (confirm("Are you sure you want to remove this card?")) {
        deck.splice(currentIndex, 1);
        localStorage.setItem('flashcards', JSON.stringify(deck));
        resetFormState();
        updateUI();
    }
});

cancelBtn.addEventListener('click', resetFormState);

function resetFormState() {
    isEditing = false;
    formTitle.textContent = "Add New Flashcard";
    newQuestionInput.value = "";
    newAnswerInput.value = "";
    addBtn.textContent = "Save Flashcard";
    cancelBtn.classList.add('hidden');
}
