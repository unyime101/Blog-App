# 📝 Personal Blogging Platform (Node.js + MongoDB + Express)

A minimalist blogging platform built with **Node.js**, **Express**, **MongoDB**, and **vanilla HTML/CSS** — designed for solo blogging and public engagement through comments.
Will prepare me for my final year project in advanced web development.

---

## 📌 Project Overview

This project is a personal blog web app where:

✅ Only **I** (the owner) can create, edit, and delete blog posts  
✅ Visitors can **view** blog posts and leave **comments** and offer advice  
✅ All posts and comments are stored securely in a **MongoDB database**  
✅ The frontend is styled with simple, custom **HTML/CSS** (no frameworks)

This app is designed to deepen my understanding of:

- Node.js + Express backend development  
- MongoDB data modeling  
- Cloud hosting with **Azure App Service**  
- Future deployment via **k3s on Raspberry Pi** for DevOps practice
---

## 🚧 Current Progress

| Area                         | Status        | Notes                                             |
|------------------------------|---------------|---------------------------------------------------|
| Node.js project setup        | ✅Completed	  | Initialized with `npm init`                       |
| Express server               | ✅Completed	  | Routes, middleware, error handling setup          |
| MongoDB connection           | ✅Completed   | Using Mongoose + MongoDB Atlas/ Maybe Azure       |
| Blog post schema             | ✅Completed   | Includes title, body, timestamps                  |
| Comment system               | 🚧 In Progress| Each post has nested comments                     |
| Routes for blog CRUD         | 🚧 In Progress| Owner-only protected routes                       |
| Comment route (public)       | 🚧 In Progress| Users can comment without logging in              |
| Static HTML/CSS UI           | ✅Completed   | Clean responsive design, no frameworks            |
| Azure deployment             | 🔜 Planned    | Hosting with GitHub Actions + App Service         |
| k3s Raspberry Pi deployment  | 🔜 Planned    | Will self-host on Pi 5 cluster                    |
| Authentication (admin-only)  | 🔜 Planned    | Simple admin login to protect CRUD routes         |
| UI improvements              | 🔜 Planned    | Dark mode, better layout, form validation         |

---

## 📦 Features

✅ Only I can create/edit/delete blogs  
✅ View all blog posts on homepage  
🚧 Comment on individual blog posts (public)  
🚧 MongoDB-powered post + comment storage  
✅ Basic HTML/CSS interface  
✅ Error handling for invalid pages/routes  
✅ Modular folder structure for scalability  
🚧 Planned: Admin login to protect post management routes  
🚧 Deployable on cloud or Raspberry Pi

---

## 🧠 Learning Goals

- Strengthen full-stack development with **Node.js + MongoDB**
- Understand cloud deployment pipelines using **Azure**
- Explore **self-hosting and container orchestration** using Raspberry Pi + k3s
- Improve front-end layout without relying on libraries

---
