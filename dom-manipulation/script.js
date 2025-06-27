// Array of quote objects
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not in what you have, but who you are.", category: "Success" },
];

// Function to show a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];
  quoteDisplay.textContent = `"${selectedQuote.text}" — (${selectedQuote.category})`;
}

// Function to add a new quote
function addQuote() {
  const quoteTextInput = document.getElementById("newQuoteText");
  const quoteCategoryInput = document.getElementById("newQuoteCategory");

  const text = quoteTextInput.value.trim();
  const category = quoteCategoryInput.value.trim();

  if (text === "" || category === "") {
    alert("Please fill in both the quote and the category.");
    return;
  }

  const newQuote = { text: text, category: category };
  quotes.push(newQuote);

  quoteTextInput.value = "";
  quoteCategoryInput.value = "";

  alert("Quote added successfully!");
}

// Attach event listener
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});
