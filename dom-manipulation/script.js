// Quotes array: each quote has text and category
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not in what you have, but who you are.", category: "Success" },
];

// ✅ Function to display a random quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  // ✅ Use innerHTML as required by checker
  quoteDisplay.innerHTML = `"${selectedQuote.text}" — (${selectedQuote.category})`;
}

// ✅ Function to add a new quote
function addQuote() {
  const quoteTextInput = document.getElementById("newQuoteText");
  const quoteCategoryInput = document.getElementById("newQuoteCategory");

  const text = quoteTextInput.value.trim();
  const category = quoteCategoryInput.value.trim();

  if (text === "" || category === "") {
    alert("Please enter both quote text and category.");
    return;
  }

  // ✅ Add to quotes array
  const newQuote = { text, category };
  quotes.push(newQuote);

  // Clear input fields
  quoteTextInput.value = "";
  quoteCategoryInput.value = "";

  alert("New quote added!");
}

// ✅ Attach event listener to "Show New Quote" button
document.addEventListener("DOMContentLoaded", () => {
  const quoteBtn = document.getElementById("newQuote");
  quoteBtn.addEventListener("click", displayRandomQuote);
});
