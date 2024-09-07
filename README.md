<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
Fitness-Tracker-MVP-Social-Goals
</h1>
<h4 align="center">A web application designed to empower individuals in their fitness journeys with goal setting, progress tracking, and social interaction.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="">
  <img src="https://img.shields.io/badge/Frontend-React-red" alt="">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="">
  <img src="https://img.shields.io/badge/Database-Supabase-black" alt="">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/Fitness-Tracker-MVP-Social-Goals?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/Fitness-Tracker-MVP-Social-Goals?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/Fitness-Tracker-MVP-Social-Goals?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>


## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "Fitness-Tracker-MVP-Social-Goals" that provides a user-friendly platform for setting fitness goals, tracking progress, and connecting with others. The MVP aims to address the challenges of maintaining fitness motivation by offering personalized insights, clear progress visualization, and a sense of community. It leverages the power of Next.js, React, Node.js, and Supabase to deliver a seamless and engaging experience.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 👤 | **User Authentication**   | Securely registers and logs in users, managing their sessions using NextAuth.js with Supabase integration.                                                                              |
| 🎯 | **Goal Setting**          | Allows users to define personalized fitness goals (e.g., weight loss, muscle gain, distance run) with customizable parameters.                                                                          |
| 📊 | **Progress Tracking**      | Collects user activity data automatically through integration with fitness trackers and wearables or allows manual entry.                                                                                   |
| 💬 | **Social Sharing**        | Enables users to share their progress updates, achievements, and motivational messages with their friends and family through a social feed.                                                                           |
| 📈 | **Data Visualization** | Displays a comprehensive overview of progress with interactive charts and graphs, providing insights into user activity and goal achievements.                                                                |
| 🔐 | **Security**       | Implements robust security measures, including data encryption, authentication, and authorization, to protect user data and ensure a secure experience.                                                                         |
| ⚡ | **Performance**    | Optimized for performance with server-side rendering (SSR) using Next.js and caching strategies to ensure fast loading times and a smooth user experience.                                                                     |
| 🌐 | **Scalability**    | Designed to handle increasing user load and data volume with a microservices architecture, database sharding, and a serverless approach provided by Supabase.                                                                 |
| 🏗️ | **Modular Structure** | The codebase is organized into well-defined modules and components for better maintainability, reusability, and collaboration.                                                                                  |

## 📂 Structure
```text
├── components
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── GoalInput.tsx
│   ├── ProgressChart.tsx
│   └── SocialShareButton.tsx
├── pages
│   ├── api
│   │   ├── auth.ts
│   │   ├── goals.ts
│   │   └── progress.ts
│   ├── _app.tsx
│   ├── index.tsx
│   ├── dashboard.tsx
│   └── login.tsx
├── styles
│   └── global.css
├── utils
│   ├── helpers.ts
│   ├── api.ts
│   ├── auth.ts
│   └── validation.ts
├── config
│   └── next-auth.config.ts
├── middleware
│   └── authentication.ts
└── .env
    └── package.json
    └── README.md
    └── tailwind.config.ts
    └── tsconfig.json
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- Docker

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/coslynx/Fitness-Tracker-MVP-Social-Goals.git`
2. Navigate to the project directory:
   - `cd Fitness-Tracker-MVP-Social-Goals`
3. Install dependencies:
   - `npm install`

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   - `npm start`
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration
Adjust configuration settings in `next.config.js` or `.env`.

### 📚 Examples
- **📝 Example 1**:  Register a new user and set a weight loss goal.
- **📝 Example 2**:  Connect a wearable device to automatically track activity and view progress towards a distance run goal.
- **📝 Example 3**:  Share a progress update on the social feed, engage with other users' posts, and join a fitness challenge.

## 🌐 Hosting
### 🚀 Deployment Instructions
1. **Vercel** (Recommended):
   - Configure Vercel project settings to deploy the Next.js application.
   - Connect your GitHub repository and deploy the code with a single command.
2. **Netlify:**
   - Create a new Netlify site and connect it to your GitHub repository.
   - Configure build settings for the Next.js application and deploy.
3. **Heroku:**
   - Install the Heroku CLI and login to your Heroku account.
   - Create a new Heroku app and deploy the code using the Heroku CLI.
4. **AWS:**
   - Create an AWS account and configure services such as EC2, S3, and Elastic Beanstalk for deployment.
   - Deploy the Next.js application to your AWS infrastructure.
5. **Google Cloud:**
   - Create a Google Cloud account and configure services such as App Engine, Compute Engine, or Cloud Functions for deployment.
   - Deploy the Next.js application to your Google Cloud infrastructure.

### 🔑 Environment Variables
- `SUPABASE_URL`: Your Supabase database URL.
- `SUPABASE_ANON_KEY`: Your Supabase anonymous API key.
- `NEXTAUTH_URL`: Your application's URL, usually `http://localhost:3000` in development.
- `NEXTAUTH_SECRET`: A random secret for signing JWT tokens.

## 📜 API Documentation
### 🔍 Endpoints
- **GET /api/goals**: Retrieves a list of user goals.
- **POST /api/goals**: Creates a new fitness goal.
- **GET /api/progress**: Fetches user activity data and progress metrics.
- **POST /api/progress**: Logs a manual workout or activity.
- **GET /api/social/feed**: Retrieves updates from the social feed.
- **POST /api/social/post**: Shares a progress update to the social feed.

### 🔒 Authentication
- Uses NextAuth.js with Supabase integration for user authentication.
- JWT tokens are used for secure session management.

### 📝 Examples
- **`curl -X GET http://localhost:3000/api/goals`** (Retrieves a list of goals).
- **`curl -X POST http://localhost:3000/api/goals -H "Content-Type: application/json" -d '{"title": "Lose 10 pounds", "type": "Weight Loss", "target_date": "2024-12-31"}'`** (Creates a new weight loss goal).

## 📜 License
This MVP is licensed under the MIT License.

## 👥 Authors
- **Author Name** - [CosLynx.com](https://coslynx.com)
- **Creator Name** - [CosLynxAI](https://github.com/coslynx)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</div>