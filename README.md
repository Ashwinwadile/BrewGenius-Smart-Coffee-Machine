# IoT Coffee Machine - MERN Stack Web Application

A web application that simulates an IoT Coffee Machine, allowing users to select their coffee preferences and monitor brewing status.

## Features

- User authentication (signup/login)
- Coffee type selection (Mild/Strong)
- Real-time coffee preparation status
- Coffee brewing history
- Dark mode support
- Responsive design

## Tech Stack

- **Frontend**: React.js with Bootstrap
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT-based

## Project Structure

```
iot-coffee-machine/
├── backend/                # Backend Node.js/Express application
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── index.js            # Entry point for the backend
├── frontend/               # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── context/        # React context for state management
│       ├── pages/          # Page components
│       └── main.tsx        # Entry point for the frontend
├── .env                    # Environment variables
└── package.json            # Project configuration
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Authenticate user

### Coffee Selection & Preferences

- `POST /api/coffee/select` - User selects coffee type (Mild/Strong)
- `GET /api/coffee/preferences/:userId` - Get stored coffee preference

### Coffee Status

- `POST /api/coffee/status` - Simulate coffee preparation process
- `GET /api/coffee/status/:userId` - Get current coffee status
- `GET /api/coffee/history/:userId` - Get user's coffee history

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/iot-coffee-machine.git
   cd iot-coffee-machine
   ```

2. Install dependencies:
   ```
   npm run install:all
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Backend

1. Deploy to a service like Vercel, Render, or AWS:
   ```
   # Example for Vercel
   vercel
   ```

2. Set the environment variables in your deployment platform.

### Frontend

1. Build the frontend:
   ```
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to Netlify or Vercel.

3. Configure the frontend to use the deployed backend API URL.

## ESP32 Integration (Future)

The REST APIs are designed to be compatible with ESP32 microcontrollers. To integrate with an ESP32:

1. Connect the ESP32 to your WiFi network
2. Use the ESP32 HTTP client to make requests to the API endpoints
3. Parse the JSON responses to control the coffee machine hardware

## License

MIT