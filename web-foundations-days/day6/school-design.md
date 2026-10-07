# School Database Design

## Table Explanations
* **`students`**: Stores personal details for each student. Uses a `PRIMARY KEY` on `id` and enforces uniqueness on the `email` column so no two students can share the same email address.
* **`courses`**: Stores available school courses with a title and description.
* **`enrolments`**: A join table connecting students to courses. It tracks which student is registered in which course and records their grade.

---

## Relationships & The Join Table
* **Students and Courses Relationship:** This is a **Many-to-Many** relationship because a single student can enrol in multiple courses, and a single course can have multiple students.
* **Why a Join Table is Needed:** Relational databases cannot directly store many-to-many arrays within a single column. The `enrolments` table resolves this by holding foreign keys (`student_id` and `course_id`) pointing to both tables. 
* Furthermore, using a **composite primary key** `PRIMARY KEY (student_id, course_id)` natively enforces a strict business rule: **a student cannot enrol in the exact same course twice**.

---

## Indexing
* **Recommended Index:** `CREATE INDEX idx_enrolments_course ON enrolments(course_id);`
* **Reason:** In a school management system, frequently looking up which students are enrolled in a specific course requires scanning the `enrolments` table. Adding an index on `course_id` allows the database engine to locate course enrolments instantly without performing a full table scan.

---

## SQL vs. NoSQL Justification
For a school management system with strict relational requirements—such as academic records, unique student credentials, immutable enrolment constraints, and precise grade updates—a **Relational (SQL)** database is the optimal choice. SQL guarantees **ACID compliance** (Atomicity, Consistency, Isolation, Durability), which is critical for financial tuition records and academic transcripts where data integrity cannot be compromised. NoSQL would introduce eventual consistency risks and lack native structural constraints like foreign keys and composite unique keys which are vital here.
