-- School Database Schema and Queries

-- 1. Create Tables
CREATE TABLE students (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE courses (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  description TEXT
);

CREATE TABLE enrolments (
  student_id INTEGER NOT NULL,
  course_id  INTEGER NOT NULL,
  grade      TEXT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id)  REFERENCES courses(id)  ON DELETE CASCADE
);

-- 2. Insert Sample Data
-- Students (at least 3, plus an extra student with no enrolments to test LEFT JOIN)
INSERT INTO students (name, email) VALUES ('Amina', 'amina@example.com');
INSERT INTO students (name, email) VALUES ('Brian', 'brian@example.com');
INSERT INTO students (name, email) VALUES ('Chloe', 'chloe@example.com');
INSERT INTO students (name, email) VALUES ('David', 'david@example.com');

-- Courses (at least 3)
INSERT INTO courses (title, description) VALUES ('Computer Science 101', 'Introduction to programming and algorithms');
INSERT INTO courses (title, description) VALUES ('Database Systems', 'Relational design, SQL, and indexing');
INSERT INTO courses (title, description) VALUES ('Web Development', 'HTML, CSS, and JavaScript fundamentals');

-- Enrolments (at least 5 entries, preventing duplicate student-course pairs)
INSERT INTO enrolments (student_id, course_id, grade) VALUES (1, 1, 'A');
INSERT INTO enrolments (student_id, course_id, grade) VALUES (1, 2, 'B+');
INSERT INTO enrolments (student_id, course_id, grade) VALUES (2, 1, 'B');
INSERT INTO enrolments (student_id, course_id, grade) VALUES (2, 3, 'A-');
INSERT INTO enrolments (student_id, course_id, grade) VALUES (3, 2, 'C+');

-- 3. Required Queries

-- Query 1: All courses for one student (by name, e.g., 'Amina')
SELECT courses.title, courses.description, enrolments.grade
FROM courses
JOIN enrolments ON enrolments.course_id = courses.id
JOIN students   ON students.id = enrolments.student_id
WHERE students.name = 'Amina';

-- Query 2: All students on one course (e.g., 'Computer Science 101')
SELECT students.name, students.email, enrolments.grade
FROM students
JOIN enrolments ON enrolments.student_id = students.id
JOIN courses    ON courses.id = enrolments.course_id
WHERE courses.title = 'Computer Science 101';

-- Query 3: The number of students per course
SELECT courses.title, COUNT(enrolments.student_id) AS student_count
FROM courses
LEFT JOIN enrolments ON enrolments.course_id = courses.id
GROUP BY courses.id;

-- Query 4: Students who have no enrolments
SELECT students.name, students.email
FROM students
LEFT JOIN enrolments ON enrolments.student_id = students.id
WHERE enrolments.course_id IS NULL;

-- Query 5: Update of one enrolment's grade
UPDATE enrolments
SET grade = 'A+'
WHERE student_id = 1 AND course_id = 1;
