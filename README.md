# 📲 Reel Based Food Order Webapp - using MERN Stack

Foodsta is a food-focused social media platform that mimics Instagram's short-form video experience, specifically tailored for the food industry. It creates a two-sided marketplace connecting food enthusiasts with food businesses.


## 🙏 Acknowledgements

 - [MERN Stack Documentation](https://www.mongodb.com/mern-stack)
 - [ImageKit Documentation](https://github.com/matiassingers/awesome-readme)
 - [JWT Authentication Guide](https://jwt.io/introduction)
 - [React Documentation](https://react.dev/)
 - [Multer Documentation](https://github.com/expressjs/multer)
 - [Express.js Documentation](https://expressjs.com/)
 - [Mongoose Documentation](https://mongoosejs.com/)
 - [React Router Documentation](https://reactrouter.com/)
 - [Vite Documentation](https://vitejs.dev/)
 - [Axios Documentation](https://axios-http.com/)
 - [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)


## 🔌 API Reference

#### 👤 User Registration

```http
  POST /api/auth/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullName` | `string` | **Required**. User's full name |
| `email` | `string` | **Required**. User's email address |
| `password` | `string` | **Required**. User's password |

#### 🔐 User Login

```http
  POST /api/auth/user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User's email address |
| `password` | `string` | **Required**. User's password |

#### 🚪 User Logout

```http
  GET /api/auth/user/logout
```

No parameters required. Clears the authentication cookie.

---

#### 🏪 Food Partner Registration

```http
  POST /api/auth/foodpartner/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Business name |
| `contactName` | `string` | **Required**. Contact person name |
| `contactNumber` | `string` | **Required**. Contact phone number |
| `email` | `string` | **Required**. Business email |
| `password` | `string` | **Required**. Account password |
| `address` | `string` | **Required**. Business address |

#### 🔑 Food Partner Login

```http
  POST /api/auth/foodpartner/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Business email |
| `password` | `string` | **Required**. Account password |

#### 🚪 Food Partner Logout

```http
  GET /api/auth/foodpartner/logout
```

No parameters required. Clears the authentication cookie.

---

#### 📸 Create Food Post

```http
  POST /api/food
```

**Content-Type:** `multipart/form-data`

**Authentication:** Food Partner only

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `video` | `file` | **Required**. Image or video file |
| `name` | `string` | **Required**. Food item name |
| `description` | `string` | **Required**. Food item description |

#### 🍔 Get All Food Posts

```http
  GET /api/food
```

**Authentication:** User only

Returns an array of all food posts with media URLs and metadata.

#### 👨‍🍳 Get Food Partner Profile

```http
  GET /api/foodpartner/${id}
```

**Authentication:** User only

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Food partner ID to fetch |

Returns food partner profile information and all their uploaded food posts.

## 📦 Installation

#### ⚙️ Install Backend Dependencies

```bash
  cd backend
  npm install
```

#### 🎨 Install Frontend Dependencies

```bash
  cd frontend
  npm install
```

#### 🔐 Setup Environment Variables

Create a `.env` file in the `backend` directory:

```bash
  cd backend
  touch .env
```

Add the following variables to `backend/.env`:

```env
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
PORT=3000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Create a `.env` file in the `frontend` directory:

```bash
  cd frontend
  touch .env
```

Add the following variable to `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## 🚀 Run Locally

#### 🖥️ Start Backend Server

```bash
  cd backend
  node server.js
```

The backend will run on `http://localhost:3000`

#### 💻 Start Frontend Development Server

```bash
  cd frontend
  npm run dev
```

The frontend will run on `http://localhost:5173`
