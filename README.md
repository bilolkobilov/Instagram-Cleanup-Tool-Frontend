# Instagram-Cleanup-Tool-Frontend

## Overview
The **Instagram Cleanup Tool** allows users to efficiently delete Instagram posts, reels, and direct messages while maintaining control over deletion rates to prevent API blocks. Users can specify the maximum number of items to delete, monitor progress, and authenticate using their Instagram credentials.

## Features
- Delete Instagram posts, reels, and direct messages
- Control deletion with rate limiting to avoid API blocks
- Specify the maximum number of items to delete
- Monitor deletion progress with real-time statistics
- User authentication with Instagram credentials

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Python (FastAPI, Flask) 

## Installation & Setup

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/bilolkobilov/Instagram-Cleanup-Tool-Frontend.git
   cd Instagram-Cleanup-Tool-Frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install  # or yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the project root and configure:
   ```env
   REACT_APP_BACKEND_URL=https://instagram-cleanup-tool-backend.vercel.app/
   ```

4. **Start the development server:**
   ```sh
   npm start  # or yarn start
   ```

   The app will be accessible at `http://localhost:3000/`.

## Contributing
Feel free to submit issues and pull requests. Make sure to follow best coding practices and document your changes.

## License
MIT License

