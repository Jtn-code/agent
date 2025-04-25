document.addEventListener("DOMContentLoaded", () => {
    const promptTextEl = document.getElementById("prompt-text");
    const journalEntry = document.getElementById("journal-entry");
    const saveBtn = document.getElementById("save-btn");
    const clearBtn = document.getElementById("clear-btn");
    const entriesList = document.getElementById("entries-list");
  
    // Fetch and display today’s prompt
    async function loadPrompt() {
      promptTextEl.textContent = "Loading...";
      try {
        const res = await fetch("/api/getPrompt");
        const { prompt } = await res.json();
        promptTextEl.textContent = prompt || "Reflect on your spiritual growth today.";
      } catch (err) {
        console.error(err);
        promptTextEl.textContent = "Could not load prompt.";
      }
    }
  
    // Load saved entries
    function loadEntries() {
      entriesList.innerHTML = "";
      const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
      entries.forEach(entry => {
        const div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = `
          <p><strong>${new Date(entry.date).toLocaleString()}</strong></p>
          <p>${entry.text}</p>
        `;
        entriesList.appendChild(div);
      });
    }
  
    // Save a new entry
    saveBtn.addEventListener("click", () => {
      const text = journalEntry.value.trim();
      if (!text) return;
      const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
      entries.unshift({ text, date: new Date().toISOString() });
      localStorage.setItem("journalEntries", JSON.stringify(entries));
      journalEntry.value = "";
      loadEntries();
    });
  
    // Clear textarea
    clearBtn.addEventListener("click", () => {
      journalEntry.value = "";
    });
  
    // Initial load
    loadPrompt();
    loadEntries();
  });
  