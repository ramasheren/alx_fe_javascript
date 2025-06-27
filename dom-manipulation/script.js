// Array of quotes with text and category
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not in what you have, but who you are.", category: "Success" }
];

// ✅ Function name exactly as expected: showRandomQuote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // ✅ Use innerHTML as required
  quoteDisplay.innerHTML = `"${randomQuote.text}" — (${randomQuote.category})`;
}

// ✅ Function to add a new quote
function addQuote() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const quoteText = quoteInput.value.trim();
  const category = categoryInput.value.trim();

  if (quoteText === "" || category === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add new quote to array
  quotes.push({ text: quoteText, category: category });

  // Clear inputs
  quoteInput.value = "";
  categoryInput.value = "";

  alert("Quote added!");
}

// ✅ Attach event listener when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const quoteButton = document.getElementById("newQuote");
  quoteButton.addEventListener("click", showRandomQuote); // <- uses correct name
});
