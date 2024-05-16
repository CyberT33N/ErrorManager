# ErrorManager
- This module provides you with custom Errors for your Express APP and helps you to integrate them easily.

<br><br>

This is how your APP express server file would look like:
```javascript
// ---- External Dependencies ----
import fs from 'fs-extra'
import express from 'express'
import log from 'fancy-log'
import('express-async-errors')

// ---- Internal Dependencies ----
import { loadEnvironmentVariables, __dirname } from './utils.js'

import ErrorManager from 'ErrorManager'
const ErrorManagerMiddleware = ErrorManager.middleware

// ---- Variables ----
const port = process.env.PORT

const bootstrap = async app => {
    try {
        app.use((req, res, next) => {
            ErrorManagerMiddleware(req, res)
            next()
        })
        
        const masterRouter = express.Router()
        const routers = await _getRouters('src/**/routes.js')

        // load all router
        for (const router of routers) {
            router(masterRouter)
        }

        app.use(masterRouter)

        return app
    } catch (e) {
        throw new Error('Bootstrap failed', e)
    }
}

loadEnvironmentVariables()

// set ui..
const server = express()
server.use(express.static(__dirname() + '/ui'))

// bootstrap..
await bootstrap(server)

// Example routes for simulate error
server.get('/simulateError/BaseError', () => {
    console.log('/simulateError/BaseError')

    try {
        simulate.error
    } catch (e) {
        throw new BaseError('Test', e)
    }
})

server.get('/simulateError/ValidationError', () => {
    console.log('/simulateError/ValidationError')

    try {
        simulate.error
    } catch (e) {
        throw new ValidationError('Test', e, { test: true, apple: false })
    }
})

server.get('/simulateError/RuntimeError', () => {
    console.log('/simulateError/RuntimeError')

    try {
        simulate.error
    } catch (e) {
        throw new RuntimeError('Test', e, 300)
    }
})

// Init server
log('Start server on port: ', port); await server.listen(port); log('Server successfully started...')

/**
 *
 */
process.on('uncaughtException', async e => {
    console.log('Caught exception: ' + e)
    await fs.outputFile(`logs/${new Date().toISOString()}.txt`, e)
})
```









<br><br>
<br><br>
_________________________________________
<br><br>
<br><br>


## npm_lifecycle_event
- When you use npm_lifecycle_event:start then your error message and stacktrace will not be sended to the client. Sample response:
```javascript
{
    "environment":"start",
    "title":"collectionName can not contain special characters",
    "errorMessage":null,
    "stack":null
}
```
  - With all other npm_lifecycle_event errorMessage and stack will be included. This is usefully if you to not want to send sensitive details to the client on production but on the other side want them local in dev.
    - However, even with npm_lifecycle_event:start the full error will be always logged to the terminal of your APP.


















<br><br>
<br><br>
_________________________________________
<br><br>
<br><br>


## BaseError
- Will be always HTTP Status 500
```javascript
throw new BaseError('Your Error Title', errorHere)
```


<br><br>
<br><br>

## ValidationError
- Will be always HTTP Status 400
```javascript
throw new ValidationError('Your Error Title', errorHere, dataThatFailed)
```


<br><br>
<br><br>

## RunTimeError
```javascript
throw new RuntimeError('Your Error Title', errorHere, customHttpStatus)
```
