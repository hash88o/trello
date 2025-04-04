# Trello Clone - Kanban Board

A responsive Kanban board application built with React JS that mimics the core functionality of Trello. This application helps users visualize and manage their workflow through a board-based system with draggable task cards.

## 📝 Project Overview

This project is a simplified Trello clone that implements a Kanban board system. It features:

- Responsive design that works on both mobile and desktop
- Data fetching from an external API
- Clean and intuitive user interface based on the provided Figma design

## 🚀 Live Demo

Check out the live demo of the application here: [Trello Clone Demo](https://trelloo.onrender.com/)

## 🛠️ Technologies Used

- React.js
- CSS for styling
- JavaScript
- API integration

## ⚙️ Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/hash88o/trello.git
   ```

2. Navigate to the project directory:
   ```bash
   cd trello
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit:
   ```
   http://localhost:port
   ```

## 📋 Project Structure

```
trello/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── HomePage.js
│   │   └── ...
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🔄 API Integration

The application fetches data from the following endpoint:
```
https://rbtest.free.beeceptor.com/todo
```

The fetch operation is implemented to retrieve task data that populates the Kanban board.

## 📱 Responsive Design

The application follows a mobile-first approach but is fully responsive for desktop users as well. The UI adapts to different screen sizes to provide an optimal viewing experience.

## 🔍 Features

- Responsive layout that works across devices
- Clean user interface based on the provided Figma design
- API integration for data fetching

## 🚧 Future Improvements

- Add drag-and-drop functionality for moving tasks between columns
- Implement task creation and editing features
- Add user authentication
- Implement real-time updates using WebSockets



## 👨‍💻 Author

- [hash88o](https://github.com/hash88o)

---
