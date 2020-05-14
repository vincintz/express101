# Prereq

* NodeJS
  - https://nodejs.org/en/
  - https://github.com/coreybutler/nvm-windows
* Code editor
  - https://code.visualstudio.com/download
  - https://atom.io/

# Project setup

1. Create project
    ```
    mkdir app101
    cd app101
    npm init -y
    code .
    ```
2. Add initial dependencies (express and nodemon)
    * Two types of dependencies: project vs development vs global
    * Project dependency ([ExpressJS](https://expressjs.com/))
      ```
      npm i express
      ```
      or
      ```
      npm install express --save
      ```
    * Dev dependency ([NodeMon](https://nodemon.io/))
      ```
      npm i nodemon -D
      ```
      or
      ```
      npm install nodemon --save-dev
      ```
    * There's also global dependecy (later)
      ```
      npm i nodemon -g
      npm i typescript -g
      ```

3. Create express web-app
    * Create `server/app.js`
      ```
      var express = require('express');
      var app = express();
      var port = process.env.PORT || 8081;
      app.listen(port, function() {
        console.log("|Server started on port " + port);
      });
      ```
    * Serve sample `server/public/index.html`
      ```
      var path = require('path');
      app.use(express.static(path.join(__dirname, 'public')));
      ```
    * Add scripts to `package.json`
      ```
      "scripts": {
        "start": "node server/app",
        "dev"  : "nodemon server/app"
      },
      ```

4. Add Sample REST API
   * Update `server/app.js`
      ```
      var userApi = require('./api/users');
      app.use(express.json());
      app.use('/rest/v2/users', userApi);
      ```
    * Create `server/api/users.js`
      ```
      var express = require('express');
      var router = express.Router();
      var users = [ ];

      router.get('/', function (req, res) {
        res.json(users);
      });
      router.post('/', function (req, res) {
        var user = { id: users.length + 1, name: req.body.name, created: new Date() };
        users.push(user);
        return res.status(201).json( user );
      });

      module.exports = router;
      ```

5. Transpile TypeScript to JavaScript
    * Using global TypeScript Compiler (tsc)
      ```
      npm i typescript -g
      ```
    * Install as dev-dependency
      ```
      npm i -D typescript ts-node
      ```
    * Create `tsconfig.json`
      ```
      {
        "compilerOptions": {
          "target": "es6",
          "module": "commonjs",
          "allowJs": true,
          "outDir": "./dist",
          "rootDir": "./server",
          "strict": true,
          "moduleResolution": "node",
          "esModuleInterop": true,
          "forceConsistentCasingInFileNames": true
        }
      }
      ```
    * Install types for node and express
      ```
      npm i @types/node @types/express
      ```
    * Run tsc server
      ```
      cp server/app.js server/run.ts
      tsc server/run.ts
      ```
    * Update code
