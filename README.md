## EmployWise React App  

This is a **React-based user management application** that integrates with the **Reqres API** for authentication, user listing, and basic CRUD operations.  

### 🚀 Live Demo  
[Click here to view the deployed project] [Link](https://chiraguser.vercel.app/)

---

## 📌 Features  
✔ **User Authentication** (Login using `POST /api/login`)  
✔ **User List with Pagination** (`GET /api/users?page=1`)  
✔ **Edit User Details** (`PUT /api/users/{id}`)  
✔ **Delete User** (`DELETE /api/users/{id}`)  
✔ **Client-side Search & Filtering** *(Bonus Feature)*  
✔ **Responsive UI** *(Works on desktop & mobile)*  
✔ **React Router for Navigation**  
✔ **Persistent Token Handling (Local Storage)**  

---

## 🛠️ Tech Stack  
- **Frontend:** React.js, React Router, Axios, Tailwind CSS  
- **API:** Reqres (Mock API for testing)  
- **State Management:** React Hooks (useState, useEffect, useContext)  

---

## 📂 Project Setup  
Follow these steps to run the project locally:  

1️⃣ **Clone the repository:**  
```bash
git clone https://github.com/your-username/employwise-react.git
cd employwise-react
```  

2️⃣ **Install dependencies:**  
```bash
npm install
```  

3️⃣ **Start the development server:**  
```bash
npm start
```  
The app should now be running at **http://localhost:3000** 🚀  

---

## 🔐 Authentication  
- Use the following credentials to log in:  
  - **Email:** `eve.holt@reqres.in`  
  - **Password:** `cityslicka`  
- Upon successful login, the **token** is stored in **localStorage** and used for authorization.  

---

## 📜 API Endpoints  
| Action  | Method | Endpoint |  
|---------|--------|--------------------|  
| **Login** | POST | `/api/login` |  
| **Get Users** | GET | `/api/users?page=1` |  
| **Edit User** | PUT | `/api/users/{id}` |  
| **Delete User** | DELETE | `/api/users/{id}` |  

---


To deploy manually:  
```bash
npm run build
# Then deploy the 'build' folder to your preferred hosting service.
```  

---

## 🤝 Contributing  
Feel free to fork this repo, make improvements, and submit a pull request! 🚀  

---

## 📧 Contact  
For any issues or improvements, reach out via GitHub Issues.  

Happy Coding! 💻🔥
