# 🛒 Silpo Family AI

**AI-powered family meal planning and grocery shopping assistant built with Next.js, React, TypeScript, and MCP.**

[🚀 Live Demo](https://silpo-family-ai-agent.vercel.app/)

---

## 💡 About the Project

**Silpo Family AI** is a family-oriented AI assistant designed to simplify meal planning and grocery shopping.

The application helps users create a meal plan based on the number of family members, preferences, dietary restrictions, and budget, then turns the plan into a practical shopping list.

The project demonstrates how **AI, real-world grocery data, and MCP (Model Context Protocol)** can be combined to solve an everyday task.

### Example User Request

> "Create a 3-day meal plan for a family of 4 with a budget of up to 1500 UAH."

The assistant can:

1. 🍽️ Generate a meal plan.
2. 🛒 Determine the required ingredients.
3. 🔎 Search for relevant grocery products.
4. 💰 Consider the user's budget.
5. 🔄 Suggest alternative products when appropriate.
6. 📋 Generate a structured shopping list.

---

## ✨ Key Features

* 🤖 **AI Family Assistant**
* 🍽️ **AI-powered meal planning**
* 👨‍👩‍👧‍👦 **Family preferences and household size**
* 💰 **Budget-aware planning**
* 🛒 **Grocery product search**
* 📋 **Automatic shopping list generation**
* 🔄 **Alternative product recommendations**
* 🔎 **MCP-based integration with grocery data**
* 📱 **Responsive user interface**

---

## 🧠 AI & MCP Integration

One of the main goals of the project was to explore how an AI assistant can work with external tools and real-world data.

During the **Silpo AI Factory hackathon**, the application was integrated with the **Silpo MCP service** using the Model Context Protocol.

The integration was used to explore grocery-related functionality such as product discovery and working with real product data.

### MCP Concept

```text
User
  ↓
Silpo Family AI
  ↓
AI / LLM
  ↓
MCP
  ↓
Grocery Tools & Data
  ↓
Products / Shopping Information
```

> **Note:** The Silpo MCP service was available during the hackathon period. Some MCP-powered features may no longer be available after the hackathon.

---

## 🎯 Project Goal

The project was created to explore a practical use case for AI agents and tool-based integrations.

The main goal was to demonstrate how an AI assistant can combine:

* AI / LLM
* MCP
* real-world grocery data
* family preferences
* meal planning
* shopping list generation

into one practical user experience.

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**

### AI & Integration

* **AI / LLM**
* **MCP (Model Context Protocol)**
* **Silpo MCP**
* **REST/API integration**

### Development Tools

* **Git**
* **GitHub**
* **Vercel**
* **Cursor**

---

## 🏗️ Project Structure

```text
silpo-family-ai-agent/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── ...
│   ├── components/
│   └── ...
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/alona-maliushchenko/silpo-family-ai-agent.git
```

### 2. Navigate to the project

```bash
cd silpo-family-ai-agent
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

```text
http://localhost:3000
```

---

## 🌐 Live Demo

The project is deployed on Vercel:

**https://silpo-family-ai-agent.vercel.app/**

> The live demo represents the portfolio version of the project. Availability of external MCP-powered functionality may depend on the Silpo MCP service.

---

## 📸 Screenshots

Screenshots demonstrating the main user flows and interface are available in:

```text
docs/screenshots/
```

---

## 🎥 Demo

A short video demonstration of the project is available as part of the project presentation.

The demo shows the main user flow, including family planning, AI meal planning, and shopping list generation.

---

## 📌 Project Status

✅ **Hackathon project — completed**

The project was created for the **Silpo AI Factory hackathon** and deployed on Vercel.

The current repository represents the completed hackathon version and serves as a portfolio project demonstrating frontend development, AI integration, and MCP-based experimentation.

Further improvements may include replacing the external grocery integration with a dedicated API or local product data source and adding automated end-to-end tests.

---

## 🔮 Future Improvements

Possible future improvements include:

* 🧪 Playwright end-to-end tests
* 🛒 Dedicated grocery/product API
* 💾 Persistent user preferences
* 👨‍👩‍👧‍👦 More advanced family profiles
* 💰 Improved budget calculation
* 🧠 More structured AI recommendations
* 📊 Nutrition and meal statistics
* 🔐 User authentication
* 📱 Further mobile UX improvements

---

## 👩‍💻 Author

**Alona Maliushchenko**

**Frontend Developer | React | Next.js | TypeScript | AI & Automation**

GitHub:
https://github.com/alona-maliushchenko

---

## ⭐ About This Project

This project demonstrates my experience with:

* React and Next.js application development
* TypeScript
* responsive UI development
* AI-powered features
* API and external service integration
* Model Context Protocol (MCP)
* Git and GitHub
* Vercel deployment
* AI-assisted development workflows
