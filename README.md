# 🧠 MindForge

**MindForge** is a modern, local-first note-taking application designed to be your second brain. Built with performance and privacy in mind, it stores all your data directly in your browser, ensuring your thoughts remain yours.

## ✨ Features

### ✍️ Powerful Editing
- **Rich Markdown Support**: Write naturally with comprehensive Markdown rendering.
- **Distraction-Free Interface**: Clean, minimalist design focused on your content.
- **Live Statistics**: Real-time tracking of word and character counts.

### 🎨 Personalization
- **Dynamic Themes**: Choose from 5 beautiful accent colors (Blue, Purple, Green, Orange, Pink).
- **Typography Control**: Switch between Sans-serif, Serif, and Monospace fonts to match your thinking style.
- **Dark Mode**: Fully supported dark mode for late-night ideas.

### 🗂️ Organization
- **Smart Tagging**: Organize notes with an easy-to-use tagging system.
- **Advanced Search**: Instantly find notes by title, content, or tags.
- **Sorting & Filtering**:
  - Sort by **Latest**, **Created Date**, or **A-Z**.
  - Filter by specific **Tags** with a single click.
- **Favorites**: Pin your most important notes for quick access.

### 🚀 Productivity
- **Local-First**: Instant loading and saving. No internet required.
- **Export**: Download your notes as `.md` files to own your data.
- **Responsive**: Works seamlessly on desktop and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context + LocalStorage
- **Markdown**: React Markdown

## 🚀 Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/mind-forge.git
cd mind-forge
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start valid.

## 📦 Deployment

MindForge is optimized for deployment on [Vercel](https://vercel.com).

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Click **Deploy**.

**Note**: Since MindForge is a local-first app using `localStorage`, notes are stored on the specific device/browser where they are created and are not synced across devices via a backend.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
