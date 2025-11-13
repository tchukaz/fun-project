# Task Tracker – QA Demo Project

This is a small **mobile-friendly task management web app** built to practice
**manual testing, bug reporting, and basic QA thinking**.

It is part of my application for a **Working Student – Quality Assurance**
position. The focus of this project is not complexity, but **clean behaviour,
clear testability, and documented quality checks**.

---

## 🔧 Tech Stack

- **Front-end:** HTML, CSS, Vanilla JavaScript
- **Storage:** `localStorage` for persisting tasks
- **No framework, no build step** – simple to run and easy to inspect

---

## 🌟 Features

- Add new tasks with a text input
- Mark tasks as completed / active
- Filter tasks by:
  - All
  - Active
  - Completed
- Delete individual tasks
- Clear all completed tasks
- Automatic persistence using `localStorage`
- Responsive design, optimised for **mobile screens**

---

## 🚀 How to Run

1. Clone or download the repository.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. Start adding tasks and playing with the filters.

_No server required._

---

## ✅ QA Focus

This app was designed to create a **practical playground for QA**:

### 1. Test Checklist (Example)

Some example test areas I manually covered:

- **Input & Validation**
  - Adding normal tasks
  - Trying to add an empty task (should be ignored)
  - Very long tasks (limit: 120 characters)
- **Task Actions**
  - Marking tasks as completed/active
  - Deleting tasks in all filter modes
  - Clearing only completed tasks
- **Filters**
  - Switching between *All*, *Active*, *Completed*
  - Behaviour when there are no tasks in a filter (e.g. no completed tasks yet)
- **Persistence**
  - Refreshing the page – tasks should remain
  - Closing and reopening the browser – tasks should remain
- **Responsive Behaviour**
  - Testing on desktop browser
  - Testing in mobile view (DevTools) and on a real phone
- **Edge Cases**
  - Quickly adding multiple tasks
  - Toggling the same task repeatedly
  - Clearing completed when there are none

### 2. Example Bug Reports

In my QA practice, I used **GitHub Issues** to document bugs with:

- Steps to reproduce
- Expected behaviour
- Actual behaviour
- Environment (browser, OS)
- Severity

Some example issues I found and fixed while iterating:

1. **Bug:** Completed state not saved after refresh  
   **Cause:** `completed` property was not updated before saving tasks  
   **Fix:** Ensure state is updated and `localStorage` is written on each toggle

2. **Bug:** Empty tasks could be added with spaces  
   **Cause:** Input value not trimmed  
   **Fix:** Call `trim()` before validation and task creation

3. **Bug:** Counter not updated after deleting a task  
   **Cause:** `updateCounter()` not called in the delete flow in an early version  
   **Fix:** Call `renderTasks()` (which updates the counter) after deletion

These types of issues mirror **real QA work**: small but important details that
affect the user experience.

---

## 🧠 What I Learned

- How to think like a QA: **“What could go wrong?”** instead of just “Does it work?”
- How to write **clear, reproducible bug reports**
- How seemingly “simple” UI flows can have many hidden edge cases
- The value of testing on a real mobile device, not just a desktop browser

---

## 💼 Context

This project was created by **Chukwuka Okoro** as a **QA-focused personal
project** to demonstrate:

- Curiosity and attention to detail
- Basic understanding of web application behaviour
- Motivation to learn more about **manual testing** and later **test automation**

