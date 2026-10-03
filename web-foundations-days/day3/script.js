// Starting notes array
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes(word)
function searchNotes(word) {
  const searchTerm = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(searchTerm));
}

// 2. longestNote()
function longestNote() {
  if (notes.length === 0) return null;
  
  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}

// 3. countByCategory()
function countByCategory() {
  const counts = {};
  for (let note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }
  return counts;
}

// 4. getSummary()
function getSummary() {
  const counts = countByCategory();
  const totalNotes = notes.length;
  const noteWord = totalNotes === 1 ? "note" : "notes";
  
  const categoryParts = [];
  for (let category in counts) {
    categoryParts.push(`${counts[category]} ${category}`);
  }
  
  return `${totalNotes} ${noteWord}: ${categoryParts.join(", ")}.`;
}

// 5. isDuplicate(text)
function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === normalizedText);
}

// 6. addNote(text, category)
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  
  if (typeof text !== "string" || text.length < 1 || text.length > 200) {
    console.log(`Failed to add note: Text length must be between 1 and 200 characters.`);
    return false;
  }
  
  if (!validCategories.includes(category)) {
    console.log(`Failed to add note: Invalid category "${category}". Must be personal, work, or study.`);
    return false;
  }
  
  if (isDuplicate(text)) {
    console.log(`Failed to add note: Duplicate note detected.`);
    return false;
  }
  
  const newId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
  notes.push({ id: newId, text: text.trim(), category: category });
  console.log(`Successfully added note: "${text.trim()}"`);
  return true;
}

// ==========================================
// TESTS & CONSOLE OUTPUTS
// ==========================================

console.log("--- Testing searchNotes ---");
console.log(searchNotes("javascript")); 
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log(searchNotes("nonexistent")); 
// Expected: []


console.log("--- Testing longestNote ---");
console.log(longestNote()); 
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

// Edge case with empty array
let tempNotes = notes;
notes = [];
console.log(longestNote()); 
// Expected: null
notes = tempNotes; // restore notes


console.log("--- Testing countByCategory ---");
console.log(countByCategory()); 
// Expected: { personal: 2, study: 2, work: 1 }


console.log("--- Testing getSummary ---");
console.log(getSummary()); 
// Expected: "5 notes: personal 2, study 2, work 1." (or similar order depending on keys)


console.log("--- Testing isDuplicate ---");
console.log(isDuplicate("buy milk and bread")); 
// Expected: true

console.log(isDuplicate("Buy fresh groceries")); 
// Expected: false


console.log("--- Testing addNote ---");
console.log(addNote("Prepare presentation slides", "work")); 
// Expected: Successfully added note: "Prepare presentation slides", returns true

console.log(addNote("Call mum", "personal")); 
// Expected: Failed to add note: Duplicate note detected., returns false
