# 𝑬𝒓𝒓𝒐𝒓𝑴𝒂𝒏𝒂𝒈𝒆𝒓 🌟💻
- This module provides you with custom Errors for your Express app and helps you to integrate them easily.

<br><br>

This is how your express server file would look like:
```javascript
import express from 'express'

// ==== ErrorManager() ====
import errorManager from 'error-manager-helper'

const {
     errorMiddleware,
     BaseError, ValidationError, RunTimeError, ResourceNotFoundError
} = errorManager

const app = express()

// Define your routes here..

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


## npm_lifecycle_event 🔧🛠️
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


# 𝐸𝓇𝓇𝑜𝓇𝓈 🌟💻

<br><br>

## 𝑩𝒂𝒔𝒆𝑬𝒓𝒓𝒐𝒓 🚨
- Will be always HTTP Status 500
```javascript
// Work with error as second argument and without
throw new BaseError('Your Error Title', errorHere)
```

<br><br>
<br><br>

## 𝐇𝐭𝐭𝐩𝐂𝐥𝐢𝐞𝐧𝐭𝐄𝐫𝐫𝐨𝐫 🌐
- At the moment working with those HTTP clients:
  - axios

- Will be the status of the error of your HTTP request
```javascript
try {
    await axios.get(`${BASE_URL}/notFound`)
} catch (e) {
    throw new HttpClientError('Your Error Title', e)
}
```

<br><br>
<br><br>

## 𝑽𝒂𝒍𝒊𝒅𝒂𝒕𝒊𝒐𝒏𝑬𝒓𝒓𝒐𝒓 ❌
- Will be always HTTP Status 400
```javascript
throw new ValidationError('Your Error Title', errorHere, dataThatNotValid)
```

<br><br>
<br><br>

## 𝑹𝒆𝒔𝒐𝒖𝒓𝒄𝒆𝑵𝒐𝒕𝑭𝒐𝒖𝒏𝒅𝑬𝒓𝒓𝒐𝒓 🔍
- Will be always HTTP Status 404
```javascript
throw new ResourceNotError('Your Error Title', errorHere, dataThatMissed)
```

<br><br>
<br><br>

## 𝑹𝒖𝒏𝑻𝒊𝒎𝒆𝑬𝒓𝒓𝒐𝒓 ⏳
- You can define custom HTTP status
```javascript
throw new RunTimeError('Your Error Title', errorHere, customHttpStatus)
```
