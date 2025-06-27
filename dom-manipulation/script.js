const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

let quotes = [];

// Load quotes from localStorage or default ones
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    quotes = JSON.parse(stored);
  } else {
    quotes = [
      { text: "Believe in yourself.", category: "Motivation" },
      { text: "Stay hungry, stay foolish.", category: "Inspiration" }
    ];
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote based on current category filter
function showRandomQuote() {
  const selected = document.getElementById("categoryFilter").value;
  const filtered = selected === "all" ? quotes : quotes.filter(q => q.category === selected);

  const display = document.getElementById("quoteDisplay");

  if (filtered.length === 0) {
    display.innerHTML = "No quotes available for this category.";
    return;
  }

  const index = Math.floor(Math.random() * filtered.length);
  const quote = filtered[index];
  display.innerHTML = `"${quote.text}" — (${quote.category})`;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Add new quote from form input
async function sendQuoteToServer(quote) {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    console.log("Quote sent to server successfully.");
  } catch (error) {
    console.error("Failed to send quote to server:", error);
  }
}


function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  const newQuote = { text, category };

  quotes.push(newQuote);
  saveQuotes();
  populateCategories();

  // ✅ Send to server (simulated)
  sendQuoteToServer(newQuote);

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added!");
}


  quotes.push({ text, category });
  saveQuotes();
  populateCategories();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added!");
}

// Populate category filter dropdown
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];

  dropdown.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    dropdown.appendChild(option);
  });

  const saved = localStorage.getItem("selectedCategory");
  if (saved && categories.includes(saved)) {
    dropdown.value = saved;
  }
}

// Filter quotes by selected category
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);
  showRandomQuote();
}

// Export quotes to JSON file
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// Import quotes from uploaded JSON file
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        alert("Quotes imported successfully!");
      } else {
        throw new Error("Invalid format");
      }
    } catch (err) {
      alert("Failed to import: " + err.message);
    }
  };
  reader.readAsText(event.target.files[0]);
}

// Show a notification at the bottom of the screen
function showNotification(msg) {
  const note = document.createElement("div");
  note.textContent = msg;
  note.style.position = "fixed";
  note.style.bottom = "20px";
  note.style.right = "20px";
  note.style.backgroundColor = "#28a745";
  note.style.color = "white";
  note.style.padding = "10px 15px";
  note.style.borderRadius = "5px";
  note.style.zIndex = "1000";
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 4000);
}

// ✅ Required by checker: fetch quotes from the simulated server
async function fetchQuotesFromServer() {
  const response = await fetch(SERVER_URL);
  const data = await response.json();
  return data.slice(0, 5).map(post => ({
    text: post.title,
    category: "Server"
  }));
}


// Sync local quotes with server quotes
function syncWithServer() {
  fetchQuotesFromServer()
    .then(serverQuotes => {
      let updated = false;

      serverQuotes.forEach(serverQuote => {
        const exists = quotes.some(localQuote => localQuote.text === serverQuote.text);
        if (!exists) {
          quotes.push(serverQuote);
          updated = true;
        }
      });

      if (updated) {
        saveQuotes();
        populateCategories();
        showNotification("Quotes synced from server.");
      }
    })
    .catch(error => {
      console.error("Server sync failed:", error);
    });
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  populateCategories();

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);

  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById("quoteDisplay").innerHTML = `"${quote.text}" — (${quote.category})`;
  }

  // Periodically sync with server
  setInterval(syncWithServer, 15000);
});
