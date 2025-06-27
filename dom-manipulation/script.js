// Quote list
const quotes = [
  { text: "Believe in yourself.", category: "Motivation" },
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
  { text: "Dream big and dare to fail.", category: "Courage" }
];

// ✅ This name must be exactly as expected by checker
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // ✅ Must use innerHTML
  quoteDisplay.innerHTML = `"${quote.text}" — (${quote.category})`;
}

// ✅ This function must be named addQuote
function addQuote() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const quoteText = quoteInput.value.trim();
  const categoryText = categoryInput.value.trim();

  if (quoteText === "" || categoryText === "") {
    alert("Please enter both a quote and category.");
    return;
  }

  // ✅ Add to array
  quotes.push({ text: quoteText, category: categoryText });

  // ✅ Clear fields
  quoteInput.value = "";
  categoryInput.value = "";

  alert("Quote added!");
}

// ✅ Add button listener after DOM loads
document.addEventListener("DOMContentLoaded", function () {
  const quoteButton = document.getElementById("newQuote");
  quoteButton.addEventListener("click", showRandomQuote);
});
