# Express 101

My project for learning javascript

## Features
* Stores data in MongoDB Atlas
* Server side API using express
  * /api/members
  * /api/messages
* Typescript transpiled to Javascript
* nodemon

## Project setup
* Prerequisites:
  - Install [Node Version Manager (nvm) for Windows](https://github.com/coreybutler/nvm-windows)
  - Install node via nvm
    ```
    nvm install 12.16
    nvm use 12.16.0
    node --version
    ```

1. Clone the repo
   ```
   git clone https://github.com/vincintz/express101.git
   cd express101
   ```
2. Download package dependencies
   ```
   npm install
   ```
3. Transpile ts to js
   ```
   npm run build
   ```
4. Start server
   ```
   npm run start
   ```
5. Or start dev-server, watch files for changes
   ```
   npm run dev
   ```

## Next Step
* Transpile using Babel (?)
* Bundle app using Webpack
* Sampe single-page UI
  * Messages (vue)
  * Members (angular?)
  * Flight search (react + material-ui)

## Tutorial (?)
1. Project setup
   - basic node project
   - express js
   - mongodb
2. Transpile + Package bundler
   - babel basics using online [repl](https://babeljs.io/en/repl)
   - [webpack](https://webpack.js.org/)
3. [Typescript](https://www.typescriptlang.org/)
