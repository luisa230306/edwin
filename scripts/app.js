import { dictionary } from './dictionary.js';

const categorySelect = document.getElementById("cate-select");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-but");
const addWordForm = document.getElementById("add-word-form");
const englishRadio = document.getElementById("english");
const spanishRadio = document.getElementById("spanish");

function renderResults(results) {
  const resultsTable = document.getElementById("resul-table");
  const tbody = resultsTable.querySelector("tbody");
  tbody.innerHTML = "";

  if (results.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "No se encontraron palabras.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  results.forEach((item) => {
    const row = document.createElement("tr");
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const exampleCell = document.createElement("td");

    exampleCell.textContent = item.example;

    if (englishRadio.checked) {
      col1.textContent = item.english;
      col2.textContent = item.spanish;
    } else {
      col1.textContent = item.spanish;
      col2.textContent = item.english;
    }

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(exampleCell);
    tbody.appendChild(row);
  });
}

function search() {
  const selectedCategory = categorySelect.value;
  const query = searchInput.value.trim().toLowerCase();
  const results = [];

  for (const category in dictionary.categories) {
    if (selectedCategory && category !== selectedCategory) {
      continue;
    }

    dictionary.categories[category].forEach((item) => {
      if (
        item.english.toLowerCase().includes(query) ||
        item.spanish.toLowerCase().includes(query) ||
        query === ""
      ) {
        results.push(item);
      }
    });
  }

  renderResults(results);
}


function addWord(event) {
  event.preventDefault();

  const english = document.getElementById("new-english").value.trim();
  const spanish = document.getElementById("new-spanish").value.trim();
  const example = document.getElementById("new-example").value.trim();
  const category = document.getElementById("new-category").value;

  if (!dictionary.categories[category]) {
    dictionary.categories[category] = [];
  }

  const newWord = { id: dictionary.categories[category].length + 1, english, spanish, example };
  dictionary.categories[category].push(newWord);

  renderResults([newWord]); 

  addWordForm.reset();
}


searchButton.addEventListener("click", search);
addWordForm.addEventListener("submit", addWord);
