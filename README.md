# Weather forecast

Weather website that shows the current and 5‑day forecast for selected city, with quick-select shortcuts from localStorage and backend logging of every user selection.

Desktop view:
<img width="758" height="335" alt="Image" src="https://github.com/user-attachments/assets/7e2fc1b1-3730-4cc0-9b81-e1e2b674c1e3" />

Mobile view:
<img width="212" height="464" alt="Image" src="https://github.com/user-attachments/assets/89b65e84-571a-4fed-9f4b-ae35d72466b7" />

Node.js console log:
<img width="317" height="83" alt="Image" src="https://github.com/user-attachments/assets/1dfeac08-d32e-46a9-bccf-f46c8f36d962" />

MongoDB insert:
<img width="307" height="73" alt="Image" src="https://github.com/user-attachments/assets/efdb44e3-d10f-41ba-9f3c-c7c3c7175c78" />

### Versions

- React – `19.2.0`
- Vite – `7.2.5`
- Node – `v22.18.0`
- pnpm – `10.14.0`

### Getting Started

- Download ZIP from GitHub and extract or clone the repository

  ```bash
  git clone https://github.com/<username>/<repo-name>.git
  ```

##### Back-end:

- Install Node.js – [nodejs.org](https://nodejs.org/en)
- Create a MongoDB account – [mongodb.com](https://www.mongodb.com/)
- Install pnpm:

  ```bash
  npm install -g pnpm
  ```

- Install dependencies:

  ```bash
  pnpm i
  ```

- Create a .env file with the following variable:

  ```bash
  MONGO_URI=...
  ```

  The MongoDB URI (MONGO_URI) is used to connect to the database. You can get it from MongoDB Clusters --> Connect --> Drivers

  Example:

  ```bash
  MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority&appName=<app-name>
  ```

- Start the project:

  ```bash
  pnpm start
  ```

#### Front-end:

- Install dependencies:

  ```bash
  pnpm i
  ```

- Start the project:

  ```bash
  pnpm run dev
  ```

### Project Structure

- **README.md** – Project documentation

#### Front-end

- **src/**
  - **components/** – Reusable UI components
  - **styles/** – SCSS variables, App.scss, index.scss
  - **utils/** – Custom hooks and helpers
  - **App.jsx** – Main App component
  - **main.jsx** – Entry point
- **index.html** – Main HTML entry point
- **eslint.config.js** – ESLint rules
- **package.json** – Project metadata and scripts
- **pnpm-lock.yaml** – Dependency lock file
- **vite.config.js** – Vite configuration

#### Back-end

- **controllers/** – Handles business logic for API routes
- **middlewares/** – Custom middleware
- **routes/** – API route definitions
- **validations/** – Joi schemas
- **.env** – Environment variables (excluded from repo)
- **index.js** – Application entry point
- **package.json** – Project metadata and scripts
- **pnpm-lock.yaml** – Dependency lock file
