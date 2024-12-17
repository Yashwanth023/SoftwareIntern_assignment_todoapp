# **ToDo TaskMaster Pro**

This project is a ReactJS-based tool that integrates with the OpenAI GPT API to generate responses based on user input. It can optionally use a secure backend to handle API calls, ensuring the API key remains safe.

---

## **Table of Contents**
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions - ReactJS Only](#setup-instructions---reactjs-only)
4. [Optional: Secure Backend Integration](#optional-secure-backend-integration)
   - [Backend Setup](#backend-setup)
   - [Changes in GptHelper.js](#changes-in-gpthelperjs)
5. [Future Enhancements](#future-enhancements)

---

## **Features**
- Add tasks with titles and optional descriptions
- Mark tasks as completed
- Delete tasks
- Filter tasks (All, Active, Completed)
- Dark/Light mode toggle
- Responsive design for various screen sizes
- Local storage persistence for tasks
- AI-powered task instruction generation (using OpenAI API)
  
---

## **Technologies Used**
- **Frontend**: React.js
- **Backend** (Optional): Node.js with Express.js
- **API**: OpenAI GPT-3.5-turbo
- **Packages**:
  - `axios` (for API calls)
  - `dotenv` (backend configuration)

---

## **Setup Instructions - ReactJS Only**

This section explains how to set up and run the ReactJS project that directly calls the OpenAI API.

### **1. Prerequisites**
- Node.js and npm installed on your machine.
- OpenAI API key. You can generate one from [OpenAI Platform](https://platform.openai.com).

---

### **2. Project Structure**
Ensure you have the following file structure:

```
todo/
│
├── public/
├── src/
│   ├── App.js
|   |-- TodoItem.js
|   |-- TodoList.js
│   ├── GptHelper.js   // Core component for API integration
│   ├── genrate.js       
│   ├── App.css     // Optional: Styles for the app
├── package.json
└── README.md
```

---

### **4. Run the Project**
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the React development server:
   ```bash
   npm start
   ```

3. Open your browser at `http://localhost:3000`.

---

## **Optional: Secure Backend Integration**

To avoid exposing your API key in the frontend, you can set up a secure backend that handles API calls to OpenAI.

### **1. Backend Setup**

#### **File: backend/index.js**

```javascript
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

### **2. Changes in GptHelper.js**
Update the `handleSubmit` function to call the backend instead of OpenAI directly.

```javascript
const handleSubmit = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    setResponse(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
};
```

---

### **3. Running Backend and Frontend**
1. Start the backend server:
   ```bash
   cd backend
   npm install
   node index.js
   ```

2. Start the React project in a separate terminal:
   ```bash
   npm start
   ```

3. Access the app at `http://localhost:3000`.

---

## **Future Enhancements**
- Add advanced error handling for different API failures.
- Implement a loading spinner during API calls.
- Cache responses locally to avoid redundant API calls.
- Add user authentication for better security.

---

## **Screenshots**

![screencapture-localhost-3000-2024-12-17-13_45_28](https://github.com/user-attachments/assets/dc8fffd4-be4e-4999-9869-76267d320f6d)

![screencapture-localhost-3000-2024-12-17-13_45_55](https://github.com/user-attachments/assets/b443739e-e79f-45f2-bf09-8289f4c76d50)

![screencapture-localhost-3000-2024-12-17-13_47_31](https://github.com/user-attachments/assets/f8a6a7a3-6118-459a-902e-75f4d7e5f4fd)



