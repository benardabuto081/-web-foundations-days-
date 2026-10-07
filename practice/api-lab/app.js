const API_URL = "https://jsonplaceholder.typicode.com/posts";
 
const loadBtn = document.querySelector("#load-btn");
const statusText = document.querySelector("#status");
const list = document.querySelector("#notes-list");
const form = document.querySelector("#note-form");
const titleInput = document.querySelector("#title-input");
 
function showNote(note) {
  const li = document.createElement("li");
  li.textContent = `#${note.id}: ${note.title}`;
  list.appendChild(li);
}
 
loadBtn.addEventListener("click", async () => {
  statusText.textContent = "Loading notes...";
  loadBtn.disabled = true;
  list.innerHTML = "";
 
  try {
    const response = await fetch(`${API_URL}?_limit=5`);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const notes = await response.json();
    notes.forEach(showNote);
    statusText.textContent = `Loaded ${notes.length} notes.`;
  } catch (error) {
    statusText.textContent = "Could not load notes. Please try again.";
    console.error(error);
  } finally {
    loadBtn.disabled = false; // runs whether it worked or failed
  }
});
 
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;
 
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, body: "", userId: 1 }),
    });
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const created = await response.json();
    showNote(created);
    statusText.textContent =
      `Created note #${created.id} (status ${response.status}).`;
    titleInput.value = "";
  } catch (error) {
    statusText.textContent = "Could not create the note.";
    console.error(error);
  }
});
