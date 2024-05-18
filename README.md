# ErrorManager
- This module provides you with custom Errors for your Express app and helps you to integrate them easily.

<br><br>

This is how your express server file would look like:
```javascript
import express from 'express'

// ==== ErrorManager() ====
import errorManager from 'error-manager-helper'

const {
     errorMiddleware,
     BaseError, ValidationError, RuntimeError, ResourceNotFoundError
} = errorManager

const app = express()

// Sample route to trigger BaseError
app.get('/base-error', (req, res) => {
    throw new BaseError(errorTitle, new Error(errorMessage))
})

// Sample route to trigger BaseError
app.get('/base-error-only-msg', (req, res) => {
    throw new BaseError(errorTitle)
})

// Sample route to trigger ValidationError
app.get('/validation-error', (req, res) => {
    throw new ValidationError(errorTitle, new Error(errorMessage), errorData)
})

// Sample route to trigger ResourceNotFoundError
app.get('/resource-not-found', (req, res) => {
    throw new ResourceNotFoundError(errorTitle, errorData, new Error(errorMessage))
})

// Sample route to trigger RuntimeError
app.get('/runtime-error', (req, res) => {
    throw new RuntimeError(errorTitle, new Error(errorMessage))
})

// errorMiddleware is error handle middleware which will be triggered when you throw error.
app.use(errorMiddleware)

this.server = app.listen(port)
console.log(`Server is running on port ${port}`)
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

// Throw Error with error as second arg
throw new BaseError('Your Error Title')
```


<br><br>
<br><br>

## ValidationError
- Will be always HTTP Status 400
```javascript
throw new ValidationError('Your Error Title', errorHere, dataThatNotValid)
```

<br><br>
<br><br>

## ResourceNotFoundError
- Will be always HTTP Status 404
```javascript
throw new ValidationError('Your Error Title', errorHere, dataThatMissed)
```



<br><br>
<br><br>

## RunTimeError
```javascript
throw new RuntimeError('Your Error Title', errorHere, customHttpStatus)
```
