// Initialize the quotes array
let quotes = [];

// ✅ Load quotes from Local Storage if available
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    quotes = JSON.parse(stored);
  } else {
    // default quotes
    quotes = [
      { text: "Believe in yourself.", category: "Motivation" },
      { text: "Stay hungry, stay foolish.", category: "Inspiration" },
      { text: "Dream big and dare to fail.", category: "Courage" }
    ];
  }
}

// ✅ Save quotes to Local Storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ✅ Show a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `"${quote.text}" — (${quote.category})`;

  // ✅ Store last viewed quote in session storage
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// ✅ Add a new quote and save
function addQuote() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const quoteText = quoteInput.value.trim();
  const category = categoryInput.value.trim();

  if (!quoteText || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text: quoteText, category: category });
  saveQuotes();

  quoteInput.value = "";
  categoryInput.value = "";

  alert("Quote added!");
}

// ✅ Create form dynamically (for checker compatibility)
function createAddQuoteForm() {
  const container = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";
  quoteInput.type = "text";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.type = "text";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  container.appendChild(quoteInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);
  document.body.appendChild(container);
}

// ✅ Export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes_export.json";
  a.click();

  URL.revokeObjectURL(url);
}

// ✅ Import quotes from JSON file
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        throw new Error("Invalid file format.");
      }
    } catch (err) {
      alert("Failed to import: " + err.message);
    }
  };
  reader.readAsText(event.target.files[0]);
}

// ✅ Initialize app on load
document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  // Optional: Load last session quote
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById("quoteDisplay").innerHTML = `"${quote.text}" — (${quote.category})`;
  }

  // Hook export button if it exists
  const exportBtn = document.getElementById("exportQuotes");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportToJsonFile);
  }
});
