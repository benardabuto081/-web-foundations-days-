-- QuickNotes Database Schema and Queries

-- 1. Create Tables
CREATE TABLE users (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE notes (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL,
  title      TEXT NOT NULL,
  content    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tags (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL UNIQUE
);

CREATE TABLE note_tags (
  note_id INTEGER NOT NULL,
  tag_id  INTEGER NOT NULL,
  PRIMARY KEY (note_id, tag_id),
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id)  REFERENCES tags(id)  ON DELETE CASCADE
);

-- 2. Insert Sample Data
INSERT INTO users (name, email) VALUES ('Amina', 'amina@example.com');
INSERT INTO users (name, email) VALUES ('Brian', 'brian@example.com');

INSERT INTO notes (user_id, title, content, created_at) VALUES 
  (1, 'Study Plan', 'Review SQL joins and foreign keys', '2026-10-01 10:00:00'),
  (1, 'Groceries', 'Buy milk, eggs, and rice', '2026-10-05 14:30:00'),
  (2, 'Project Idea', 'Build a new CLI tool in Go', '2026-10-04 09:15:00');

INSERT INTO tags (name) VALUES ('urgent'), ('study'), ('personal');

INSERT INTO note_tags (note_id, tag_id) VALUES 
  (1, 1), (1, 2), (2, 3);

-- 3. Required Lab Queries
-- All of Amina's notes, newest first
SELECT id, title, content, created_at 
FROM notes 
WHERE user_id = 1 
ORDER BY created_at DESC;

-- All notes tagged "urgent"
SELECT notes.title, notes.content
FROM notes
JOIN note_tags ON note_tags.note_id = notes.id
JOIN tags      ON tags.id = note_tags.tag_id
WHERE tags.name = 'urgent';

-- Number of notes per user
SELECT users.name, COUNT(notes.id) AS note_count
FROM users
LEFT JOIN notes ON notes.user_id = users.id
GROUP BY users.id;
