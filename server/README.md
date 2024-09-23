# UF SASE Website

This is the respository for the University of Florida SASE (Society of Asian Scientests and Engineers) website!
It is managed by the current Webmaster (Ricky Zhang) and built with the help of our amazing Web Team. 

## Setting up the Repo

1. **Install Node.js**:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/en).

2. **Clone the Repository**:
   - Clone the repository using Git:
     ```bash
     git clone https://github.com/ufsasewebmaster/UF_SASE_Website
     ```

3. **Check Out the Latest Sprint**:
   - Don’t pull from `main`. Instead, pull from the most up-to-date sprint branch:
     ```bash
     git fetch origin
     git checkout sprint-N   # Replace N with the largest number sprint
     git pull origin sprint-N
     ```

4. **Install Server Dependencies**:
   - Navigate to the server directory and install dependencies:
     ```bash
     cd server
     npm install
     ```

5. **Create .env Files**:
   - Create a `.env` file at the root of the `server` directory and populate it with the required environment variables.
   - Repeat the process for the `client` directory.

6. **Install ESLint**:
   - Run the following command to install the required version of ESLint:
     ```bash
     npm i eslint@9.5.0
     ```

7. **Run the Website**:
   - Make sure to start both the server and client:
     ```bash
     npm run dev
     ```
   - The website should open in your browser at `http://localhost:8000`.

## .env Information

For `.env` details, request permissions to access the necessary environment variable information.

---

That’s it! You should now have the UF SASE Website running locally.
