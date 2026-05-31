# Todo App API (React)

# Overview

Aplikasi menggunakan arsitektur berbasis fitur (feature-based architecture) dengan pemisahan antara halaman, komponen, hook, dan service layer. Service layer bertanggung jawab untuk berkomunikasi dengan REST API menggunakan package axios.

---

## Tech Stack

- React 19
- React Router DOM 7
- Vite 8
- Tailwind CSS 4
- UUID

---

## Requirements

- Node.js: 24.14.0
- npm: 11.9.0

---

## Backend Setup

Aplikasi ini memerlukan backend Todo API yang berjalan terlebih dahulu.

Repository backend:

```bash
https://github.com/Pangestufp/todo-backend
```

Clone backend:

```bash
git clone https://github.com/Pangestufp/todo-backend
```

Masuk ke folder backend:

```bash
cd todo-backend
```

Install dependency:

```bash
npm install
```

Jalankan backend:

```bash
node index.js
```

Backend akan berjalan pada:

http://localhost:3000

Pastikan backend telah berjalan sebelum menjalankan aplikasi React.

## Project Structure

```txt
src/
│   ├── app/
│       └── axios.js
├── features/
│   └── todo/
│       ├── components/
│       │   └── TodoCard.jsx
│       │
│       ├── hook/
│       │   └── useTodo.js
│       │
│       ├── page/
│       │   ├── TodoPage.jsx
│       │   └── TodoFormPage.jsx
│       │
│       └── services/
│           └── apiTodo.js
│
├── shared/
│   ├── contextapi/
│   │   └── Confirmcontext.jsx
│   │
│   ├── endpoint/
│   │   └── endpoint.js
│   │
│   ├── routes/
│   │   └── AppRouter.jsx
│   │
│   └── ui/
│       ├── Button.jsx
│       ├── Dropdown.jsx
│       └── TextField.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```


---

## Folder Description

| Folder        | Description                                            |
| ------------- | ------------------------------------------------------ |
| app           | Menyimpan konfigurasi terutama untuk axios             |
| assets        | Menyimpan aset gambar aplikasi                         |
| features/todo | Modul utama fitur Todo                                 |
| components    | Komponen UI khusus Todo                                |
| hook          | Custom React Hook untuk manajemen state dan logic Todo |
| page          | Halaman aplikasi                                       |
| services      | Service untuk pengolahan data Todo                     |
| shared        | Komponen dan utilitas yang dapat digunakan ulang       |
| contextapi    | Global state menggunakan React Context                 |
| routes        | Konfigurasi routing aplikasi                           |
| ui            | Reusable UI Components                                 |

---

## Installation

Clone repository:

```bash
git clone https://github.com/Pangestufp/todo-app-api-react
```

---

Masuk ke folder project:

```bash
cd todo-app-api-react
```

---

Install dependency:

```bash
npm install
Running Application
```

---

Environment Configuration:

```bash
cp .env.example .env
```
sesuaikan dengan base endpoint backend

Jalankan development server:

```bash
npm run dev
```

---

Aplikasi akan berjalan pada:

http://localhost:5173


