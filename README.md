OVERVIEW
The Task Manager App allows users to create, update, and delete tasks, while also tracking their priority, status, and due dates. The app ensures that tasks persist across sessions using local storage, providing a seamless experience for users.

APPROACH
I used Redux Toolkit to manage the application's state, ensuring predictable state updates and efficient performance. The approach involved:

- State Management with Redux Toolkit
  We created a tasksSlice using createSlice() to handle all task-related actions (adding, updating, and deleting tasks).
  The initial state was loaded from local storage, ensuring task persistence.

- Local Storage Integration
  Tasks are stored in local storage so that users don't lose their tasks upon refreshing or closing the app.
  If no tasks exist, default tasks are generated and saved.

- Testing with Jest & Redux Toolkit
  We wrote unit tests to ensure the reliability of the Redux slice.
  Mocking local storage in tests prevented unexpected behavior due to persistence.

CODE DESCRIPTION

Tech Stack:

- Frontend: React + Vite Typescript
- Styling: CSS Modules
- State Management: Redux Toolkit
- Build Tool: Vite
- Package Manager: npm

Installation

- clone the repo
- install dependencies with "npm install"
- start project with "npm run start"

Core functionality that was completed

- Filtering by status
- Sorting
- Drag and drop
- Search functinality
- Wrote test using Jest
