// 1. Our data: an array of note objects
let notes = [];
 
// 2. Check that a note's text is acceptable
function isValidNote(text) {
  const cleaned = text.trim();
  return cleaned.length > 0 && cleaned.length <= 200;
}
 
// 3. Add a note (returns true if added, false if rejected)
function addNote(text) {
  if (!isValidNote(text)) {
    console.log("❌ Note rejected: must be 1-200 characters.");
    return false;
  }
  const newNote = {
    id: Date.now(),        // milliseconds since 1970: a simple unique id
    text: text.trim(),
    createdAt: new Date().toLocaleString(),
  };
  notes.push(newNote);
  console.log(`✅ Added: "${newNote.text}"`);
  return true;
}
 
// 4. Delete a note by its id
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
}
 
// 5. A friendly summary sentence
function countMessage() {
  if (notes.length === 0) return "You have no notes yet.";
  if (notes.length === 1) return "You have 1 note.";
  return `You have ${notes.length} notes.`;
}
 
// 6. Print all notes
function listNotes() {
  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note.text} (${note.createdAt})`);
  });
  console.log(countMessage());
}
 
// --- Test it ---
addNote("Revise HTML forms");
addNote("   ");              // rejected
addNote("Practise Flexbox");
listNotes();
