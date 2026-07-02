// A collection of high-quality, inspiring quotes
const quotes = [
    {
        text: "Simplicity is the ultimate sophistication.",
        author: "Leonardo da Vinci"
    },
    {
        text: "Make each day your masterpiece.",
        author: "John Wooden"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Yesterday you said tomorrow. Just do it.",
        author: "Nike"
    },
    {
        text: "Brevity is the soul of wit.",
        author: "William Shakespeare"
    },
    {
        text: "Strive not to be a success, but rather to be of value.",
        author: "Albert Einstein"
    },
    {
        text: "Action is the foundational key to all success.",
        author: "Pablo Picasso"
    }
];

// Track the previous quote index to prevent immediate repetitions
let lastIndex = -1;

// DOM Selectors
const quoteWrapper = document.getElementById('quote-wrapper');
const quoteTextField = document.getElementById('quote-text');
const quoteAuthorField = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');

// Display a random quote right away when the app opens
window.addEventListener('DOMContentLoaded', displayRandomQuote);

// Link button click to function execution
newQuoteBtn.addEventListener('click', displayRandomQuote);

function displayRandomQuote() {
    let randomIndex;

    // Loop logic ensures that the same quote isn't shown twice in a row
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === lastIndex && quotes.length > 1);

    lastIndex = randomIndex;
    const selectedQuote = quotes[randomIndex];

    // Trigger smooth fade-out animation
    quoteWrapper.classList.add('fade-out');

    // Wait for fade-out transition to finish before swapping the text contents
    setTimeout(() => {
        quoteTextField.textContent = `"${selectedQuote.text}"`;
        quoteAuthorField.textContent = `— ${selectedQuote.author}`;
        
        // Fade the content back in gracefully
        quoteWrapper.classList.remove('fade-out');
    }, 300); 
}
