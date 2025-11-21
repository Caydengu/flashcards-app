# Robotics Professors Flashcards 🤖

An interactive flashcard web application for learning about famous robotics professors from top universities. Perfect for students, researchers, and robotics enthusiasts who want to familiarize themselves with leading figures in the field.

## 📚 Overview

This application features 30 robotics professors from 6 top universities:
- **Stanford University** (5 professors)
- **UC Berkeley** (5 professors)
- **MIT** (5 professors)
- **Carnegie Mellon University** (5 professors)
- **Georgia Tech** (5 professors)
- **University of Michigan** (5 professors)

Each professor has **5 flashcards** covering:
- 👤 **Bio** - Who they are and their expertise
- 🔬 **Research** - Their research focus areas
- 🏫 **Lab** - Associated research lab
- 🎓 **Advisor** - Their PhD advisor
- 👥 **Student** - Notable students or work from their group

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flashcards-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 🏗️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **PostCSS** - CSS processing

## 📁 Project Structure

```
flashcards-app/
├── src/
│   ├── RoboticsFlashcards.jsx  # Main flashcard component
│   ├── App.jsx                  # App entry point
│   ├── index.css                # Global styles
│   └── main.jsx                 # React DOM entry
├── public/
│   └── professors/              # Professor images (optional)
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```