

 Azure Entra ID OAuth2 Authentication (Self-Service Registration)

This project demonstrates how to implement self-service registration and login using **Azure Entra ID (formerly Azure AD)** with **OAuth2 & OpenID Connect** in a Node.js application.

## 🚀 Features
- **Register & Login with Azure Entra ID** (Self-Service Flow)
- **OAuth 2.0 + OpenID Connect**
- **User Token Handling**
- **Redirect-Based Authentication**

## 🛠 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Uceedammy/Damcey-App.git
cd azure-entra-auth
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root folder with:
```env
CLIENT_ID=your_client_id
TENANT_ID=your_tenant_id
CLIENT_SECRET=your_client_secret
PORT=3000
```
**Note:** Never commit real credentials. Use `.env.example` as a reference.

### 4️⃣ Start the Server
```sh
node server.js
```
The app will run at **http://localhost:3000**