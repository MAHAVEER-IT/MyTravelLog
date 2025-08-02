# MyTravelLog

A responsive web application for discovering and sharing information about South Indian tourist places.

🌐 **Live Demo:** [https://my-travel-log-sooty.vercel.app/](https://my-travel-log-sooty.vercel.app/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Admin Access](#admin-access)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

MyTravelLog is a platform that provides detailed information about various tourist destinations in South India. Users can explore places, search for specific locations, view details, and share their experiences through comments. The application is fully responsive, ensuring a seamless experience across all devices.

## ✨ Features

- **Responsive Design**: Works perfectly on mobile, tablet, and desktop devices
- **Dynamic Place Listings**: Browse through a curated list of tourist destinations
- **Place Details**: View comprehensive information about each location including:
  - Best time to visit
  - Nearby attractions
  - Image galleries
  - User comments and reviews
- **Search Functionality**: Find places quickly using the search feature
- **User Authentication**: Secure login via GitHub OAuth
- **Comment System**: Registered users can share their experiences
- **Admin Panel**: Authorized admins can add new places and manage existing content
- **Image Management**: Upload and showcase multiple images for each location

## 🛠️ Tech Stack

- **Frontend**:
  - Next.js 13+ (App Router)
  - React.js
  - Tailwind CSS
  - Next-Auth for authentication

- **Backend**:
  - Next.js API routes
  - MongoDB for database storage
  - Mongoose for database modeling

- **Image Hosting**:
  - Cloudinary

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB instance (local or Atlas)
- Cloudinary account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MAHAVEER-IT/MyTravelLog.git
   cd my-travellog
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (see next section)

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# GitHub OAuth
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📁 Project Structure

```
my-travellog/
|-- app/                  # Next.js app directory
|   |-- api/              # API routes
|   |-- components/       # React components
|   |-- admin/            # Admin pages
|   |-- find/             # Place details pages
|   |-- search/           # Search results pages
|   |-- globals.css       # Global styles
|   |-- layout.js         # Root layout
|   |-- page.js           # Home page
|-- lib/                  # Utility functions
|-- Models/               # Mongoose models
|-- public/               # Static assets
|-- .env.local            # Environment variables (create this)
|-- next.config.mjs       # Next.js configuration
|-- package.json          # Project dependencies
|-- README.md             # Project documentation
```

## 👑 Admin Access

Admin functionality is available to authorized users only. The current implementation checks for a specific email address ('mahaveer.k2023it@sece.ac.in').

Admin features include:
- Adding new tourist places
- Uploading images
- Managing place information
- Deleting places

## 🔌 API Routes

The application provides the following API endpoints:

- `GET /api/place` - Get all places
- `POST /api/place` - Create a new place (admin only)
- `GET /api/place/banner` - Get featured places for the banner
- `GET /api/place/[search]` - Search for places
- `GET /api/place/[id]` - Get details of a specific place
- `DELETE /api/place/[id]` - Delete a place (admin only)
- `PATCH /api/place/[id]/commends/[id]` - Add a comment to a place

## 🌐 Deployment

This project is currently deployed on Vercel:
- **Live Site:** [https://my-travel-log-sooty.vercel.app/](https://my-travel-log-sooty.vercel.app/)

This project can be deployed on platforms that support Next.js, such as:

- [Vercel](https://vercel.com/) (recommended)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

For production deployment, ensure you set up the environment variables on your hosting platform.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Developed by [Mahaveer K](https://www.linkedin.com/in/mahaveer-k) | © 2025
