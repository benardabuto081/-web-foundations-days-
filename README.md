# Web Foundations Days

![status](https://img.shields.io/badge/status-in%20progress-yellow)
![html](https://img.shields.io/badge/HTML5-Foundations-E34F26?logo=html5\&logoColor=white)
![css](https://img.shields.io/badge/CSS3-Foundations-1572B6?logo=css3\&logoColor=white)
![javascript](https://img.shields.io/badge/JavaScript-Foundations-F7DF1E?logo=javascript\&logoColor=black)
![git](https://img.shields.io/badge/Git-Version%20Control-F05032?logo=git\&logoColor=white)
![github](https://img.shields.io/badge/GitHub-Repository-181717?logo=github\&logoColor=white)

**A structured engineering workspace for building and documenting practical web-development foundations through deliberate implementation, debugging, and iteration.**

> **Project Principle:** *Understand what you build. Don't just make it run.*

---

## What This Repository Is

This repository is my personal implementation workspace for the **1 Million Devs for Africa Software Engineering course**, specifically the web-development foundations phase.

It is not intended to be a copy of the course material or a collection of completed answers. The repository is being used to document the actual process of learning the underlying technologies through implementation — from basic HTML and browser tooling to structured web development, Git workflows, debugging, and the projects developed throughout the phase.

The repository will evolve as the course progresses. Its structure therefore reflects both the **current implementation state** and the workspace required for upcoming assignments.

---

## Current Status

**This repository is actively under development.** The initial scaffold has been created, with daily coursework and project-specific workspaces being populated progressively.

| Component                      | Status                      |
| ------------------------------ | --------------------------- |
| Repository scaffold            | Complete                    |
| Practice environment           | Started                     |
| Daily coursework structure     | Scaffolded                  |
| QuickNotes application         | Planned / workspace created |
| QuickNotes system design       | Planned / workspace created |
| Web Foundations implementation | In progress                 |
| Documentation                  | In progress                 |

---

## Repository Structure

```text
-web-foundations-days-/
│
├── practice/
│   └── index.html
│
├── web-foundations-days/
│   ├── day1/
│   ├── day2/
│   ├── day3/
│   ├── day4/
│   ├── day5/
│   ├── day6/
│   ├── day7/
│   └── day8/
│
├── quicknotes-app/
│
└── quicknotes-system-design/
```

The daily directories will contain the implementation work for each corresponding course day. The project directories separate the larger QuickNotes application from its system-design work so that implementation and architectural reasoning remain independently documented.

---

## Learning Architecture

The repository follows a deliberate progression rather than treating each exercise as an isolated task:

```text
Concept
   ↓
Understand
   ↓
Implement
   ↓
Run
   ↓
Break
   ↓
Debug
   ↓
Document
   ↓
Commit
```

The objective is not simply to complete the assigned exercises. Each implementation should provide evidence of understanding through working code, debugging history, and progressively better engineering decisions.

---

## Practice Environment

The `practice/` directory is the initial browser-development workspace.

```text
practice/
└── index.html
```

This environment is used for experimenting with the fundamentals outside the structured daily assignments.

It provides a controlled place to test:

* HTML structure
* Browser rendering
* CSS behaviour
* JavaScript execution
* Browser DevTools
* Console output
* DOM manipulation
* Small implementation experiments

As the curriculum progresses, this workspace may expand with additional experiments where useful.

---

## Daily Work

The `web-foundations-days/` directory contains the implementation record for the daily coursework.

Each day is isolated into its own workspace:

```text
day1/
day2/
day3/
...
day8/
```

The purpose of this structure is to preserve the progression of the learning process rather than flattening the entire course into one directory.

Each daily workspace can contain the relevant:

* exercises
* implementations
* experiments
* notes
* supporting files
* assignment submissions

The structure will be populated progressively as the corresponding work is completed.

---

## QuickNotes

The repository contains two separate workspaces for the QuickNotes project:

### `quicknotes-app/`

The implementation workspace for the application itself.

This directory will contain the actual product code developed during the project phase.

### `quicknotes-system-design/`

The architectural workspace for documenting the system before and alongside implementation.

The separation is intentional: **implementation and system reasoning are treated as related but distinct artifacts.**

---

## Development Environment

The development workflow is intentionally based on a small, reproducible toolchain:

| Tool             | Purpose                               |
| ---------------- | ------------------------------------- |
| VS Code          | Primary development environment       |
| Git              | Version control                       |
| GitHub           | Remote repository and project history |
| Chrome / Firefox | Browser execution and testing         |
| Live Server      | Local development server              |
| Browser DevTools | Inspection and debugging              |
| Prettier         | Code formatting                       |

The goal is to become comfortable with the underlying development workflow rather than relying on a heavily abstracted environment.

---

## Git Workflow

Changes are committed throughout the learning process rather than accumulated into one final commit.

```bash
git status
git add .
git commit -m "describe the change"
git push
```

The Git history therefore becomes part of the learning record.

Daily coursework follows the same principle: implementation → verification → commit → push.

---

## Engineering Principles

### Type, Don't Just Paste

Code should be written and understood rather than copied blindly.

### Predict Before Running

Before executing a piece of code, form a hypothesis about what it should do.

### Read the Error

An error is evidence about the state of the program, not simply something to remove.

### Change One Thing at a Time

When debugging, isolate variables instead of changing several components simultaneously.

### Break Things Intentionally

Controlled failure is part of learning. Understanding why something breaks is often more valuable than seeing it work once.

### Use Primary Documentation

Where appropriate, the learning process will rely on primary technical documentation such as MDN and official language/tool documentation rather than treating tutorials as the final authority.

---

## Documentation Philosophy

This repository is intended to preserve **engineering reasoning**, not merely finished files.

Where something is implemented, the repository should make it possible to understand what was built and why.

Where something is incomplete, it should remain marked as incomplete.

Where an architectural idea is only planned, it should not be presented as an implemented capability.

The same distinction used throughout my other engineering projects applies here:

> **The repository documents what actually exists, not an idealized version of what it might eventually become.**

---

## Roadmap

The repository will develop alongside the course:

* [x] Create repository
* [x] Establish project scaffold
* [x] Create practice environment
* [ ] Complete Day 1
* [ ] Complete Day 2
* [ ] Complete Day 3
* [ ] Complete Day 4
* [ ] Complete Day 5
* [ ] Complete Day 6
* [ ] Complete Day 7
* [ ] Complete Day 8
* [ ] Develop QuickNotes application
* [ ] Complete QuickNotes system design
* [ ] Consolidate web-foundation knowledge
* [ ] Document final implementation state

---

## Engineering Standard

The standard for this repository is simple:

```text
Learn → Build → Test → Break → Debug → Document
```

The objective is not to produce a repository that merely satisfies a course submission requirement.

It is to build a durable foundation in how software is actually developed.

---

## Project Owner

**Bernard Abuto**

Machine Learning Research Engineer · Software Engineering Apprentice

---

## Status of This README

This README describes the repository's current purpose, structure, and engineering approach.

It will evolve as the actual implementation grows. Course-specific details, completed daily work, QuickNotes architecture, and implementation status will be expanded when they become real repository artifacts rather than being documented prematurely.

