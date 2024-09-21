# 𝑬𝒓𝒓𝒐𝒓𝑴𝒂𝒏𝒂𝒈𝒆𝒓 🌟💻
- Express error middleware with custom error types for easy error handling for different use cases. 


<br><br>
<br><br>

## Init
- If you are not using express then you can still use the custom error types. But then they will only throw the error and it will not be sended to the client!
```javascript
import axios from 'axios'
import express from 'express'
import 'express-async-errors'

import { errorMiddleware, HttpClientError } from 'error-manager-helper'

const app = express()

// Sample route to trigger custom error HttpClientError
app.get('/httpclient-error', async() => {
    try {
        await axios.get(`${BASE_URL}/notFound`)
    } catch (err) {
        throw new HttpClientError('Any error message..', err)
    }
})

// Include error middleware
app.use(errorMiddleware)

const server = app.listen(port)
console.log(`Server is running on port ${port}`)
```









<br><br>
<br><br>
_________________________________________
<br><br>
<br><br>


# 𝐸𝓇𝓇𝑜𝓇𝓈 🌟💻

<br><br>

## 𝑩𝒂𝒔𝒆𝑬𝒓𝒓𝒐𝒓 🚨
- Will be always HTTP Status 500
- Passing error is optional
```javascript
throw new BaseError('Your error message', new Error('Any Error'))
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
    throw new HttpClientError('Your error message', e)
}
```

<br><br>
<br><br>

## 𝑽𝒂𝒍𝒊𝒅𝒂𝒕𝒊𝒐𝒏𝑬𝒓𝒓𝒐𝒓 ❌
- Will be always HTTP Status 400
- Passing error is optional
```javascript
throw new ValidationError('Your error message', { dataThatNotValid }, new Error('Any Error'))
```

<br><br>
<br><br>

## 𝑹𝒆𝒔𝒐𝒖𝒓𝒄𝒆𝑵𝒐𝒕𝑭𝒐𝒖𝒏𝒅𝑬𝒓𝒓𝒐𝒓 🔍
- Will be always HTTP Status 404
- Passing error is optional
```javascript
throw new ResourceNotFoundError('Your error message', dataThatMissed, new Error('Any Error'))
```

<br><br>
<br><br>

## 𝑹𝒖𝒏𝑻𝒊𝒎𝒆𝑬𝒓𝒓𝒐𝒓 ⏳
- You can define custom HTTP status
- Passing error is not optional
```javascript
throw new RuntimeError('Your error message', errorHere, customHttpStatus)
```












<br><br>
<br><br>
_________________________________________
<br><br>
<br><br>


## npm_lifecycle_event 🔧🛠️
- Some errors may leak sensitive informations in the error itself or by the additional provided data object which you include to your custom error e.g. `throw new ValidationError('Your error message', { objectWithPw }, new Error('Any Error'))`.
  - For this reason when you use `npm_lifecycle_event=start` then your provided `error, data and stack trace will be sanitized` and not sended to the client. Sample response:
```javascript
{
    "environment": "start",
    "message": "collection name 'test!' can not contain special characters",
    "error": '[SANITIZED]',
    "data": '[SANITIZED]',
    "stack": '[SANITIZED]'
}
```
  - With all other npm_lifecycle_event it will be not sanitized. However, even with npm_lifecycle_event=start the full error will logged with console.error.