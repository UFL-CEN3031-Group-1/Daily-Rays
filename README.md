# CEN website

This is our CEN website

## Setting up the Repo

1. **Install Node.js**:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/en).

2. **Clone the Repository**:
   - Clone the repository using Git:
     ```bash
     git clone https://github.com/ufsasewebmaster/UF_SASE_Website
     ```

3. **Install Server Dependencies**:
   - Navigate to the server directory and install dependencies:
     ```bash
     cd server
     npm install
     ```

4. **Create .env Files**:
   - Create a `.env` file at the root of the `server` directory and populate it with the required environment variables.
   - Repeat the process for the `client` directory.

5. **Install ESLint**:
   - Run the following command to install the required version of ESLint:
     ```bash
     npm i eslint@9.5.0
     ```

6. **Run the Website**:
   - Make sure to start both the server and client:
     ```bash
     npm run dev
     ```
   - The website should open in your browser at `http://localhost:8000`.

## .env Information

For `.env` details, contact the current webmaster to access the necessary environment variable information.

---

That’s it! You should now be able to run the website locally.
