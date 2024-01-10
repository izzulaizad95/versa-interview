# versa-interview
## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (included with Node.js)

    <br />

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/izzulaizad95/versa-interview.git
   ```

    <br />

2. Change into the project directory:

   ```bash
   cd versa-interview
   ```

    <br />

3. Install dependencies (depending on your package manager)
    ### npm
   ```bash
   npm install
   ```
    ### yarn
   ```bash
   yarn install
   ```

    <br />

### Available Scripts
In the project directory, you can run the following scripts:


1. Start Development Server

    ```bash
    npm run dev
    ```

    This will start the TypeScript compiler in watch mode for the src/index.ts file. Once the process is finished, you can find a new file in the directory called **output.json**.
    
    <br />

2. Build the Project

    ```bash
    npm run build
    ```

    This will build the project using the TypeScript compiler with the configuration in **tsconfig.build.json**.

    <br />

3. Run Tests

    ```bash
    npm run test
    ```

    This will execute the tests using Jest under the **test** directory.

    <br />


4. Lint and Fix

    ```bash
    npm run lint:fix
    ```

    This will run ESLint and automatically fix linting issues in TypeScript files within the src and test directory.

    <br />