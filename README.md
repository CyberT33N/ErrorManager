# 𝑬𝒓𝒓𝒐𝒓𝑴𝒂𝒏𝒂𝒈𝒆𝒓 🌟💻
- Express error middleware with custom error types for easy error handling for different use cases. 


<br><br>
<br><br>

## Init
- If you are not using express then you can still use the custom error types. But then they will only throw the error and it will not be sended to the client!
```typescript
import axios, { AxiosError } from 'axios'
import express from 'express'
import 'express-async-errors'

import { errorMiddleware, HttpClientError } from 'error-manager-helper'

const app = express()

// Sample route to trigger custom error HttpClientError with axios
app.get('/httpclient-error', async() => {
    try {
        await axios.get('https://anySample.website/notFound')
    } catch (err) {
        throw new HttpClientError('Test error', err as AxiosError)
    }
})

// Include error middleware
app.use(errorMiddleware)

const port = 3000
const server = app.listen(port)
console.log(`Server is running on port ${port}`)
```

<br><br>

Response:
```javascript
const res = await axios.get('http://localhost:3000/httpclient-error')
console.log(res.response.data)

{
  name: "HttpClientError",
  environment: "npx",
  timestamp: "2024-09-22T17:07:27.603Z",
  message: "Test error",
  httpStatus: 404,
  data: {
    url: "https://anySample.website/notFound",
    method: "get",
    responseData: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /notFound</pre>\n</body>\n</html>\n",
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "axios/1.7.7",
      "Accept-Encoding": "gzip, compress, deflate, br",
    },
    errorMessage: "Request failed with status code 404",
  },
  stack: "HttpClientError: Test error\n    at /home/username/Projects/ErrorManager/test/integration/pretestAll.ts:56:13\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
  error: {
    // Original axios error will be here..
  }
}
```









<br><br>
<br><br>
_________________________________________
_________________________________________
<br><br>
<br><br>

# 𝐸𝓇𝓇𝑜𝓇𝓈 🌟💻

<br><br>

## 𝑩𝒂𝒔𝒆𝑬𝒓𝒓𝒐𝒓 🚨
- Response HTTP Status 500

- Arguments:
  - 1: {string} - Error Message
  - 2: {Error} [optional] - Error
```typescript
import { BaseError } from 'error-manager-helper'

try {
     const chatCompletion = await this.client.chat.completions.create(params)
     return chatCompletion
} catch (err: unknown) {
     throw new BaseError('Can not create chat completion', err as Error)
}
```

<br><br>
<br><br>

## 𝐇𝐭𝐭𝐩𝐂𝐥𝐢𝐞𝐧𝐭𝐄𝐫𝐫𝐨𝐫 🌐
- Will be the status of the error of your HTTP request

- Supported HTTP clients:
  - axios

- Arguments:
  - 1: {string} - Error Message
  - 2: {AxiosError} - Axios Error
```typescript
import axios, { type AxiosError } from 'axios'
import { HttpClientError } from 'error-manager-helper'

try {
     const response = await axios.request(config)
     return response
} catch (err: unknown) {
     throw new HttpClientError('Can not send request', err as AxiosError)
}
```

<br><br>
<br><br>

## 𝑽𝒂𝒍𝒊𝒅𝒂𝒕𝒊𝒐𝒏𝑬𝒓𝒓𝒐𝒓 ❌
- Response HTTP Status 400

- Arguments:
  - 1: {string} - Error Message
  - 2: {object} - Data that is not valid.
  - 3: {Error} [optional] - Error
```typescript
import { ValidationError } from 'error-manager-helper'

if (test !== 'expectedValue') {
    throw new ValidationError('test ist not valid', { test })
}

```

<br><br>
<br><br>

## 𝑹𝒆𝒔𝒐𝒖𝒓𝒄𝒆𝑵𝒐𝒕𝑭𝒐𝒖𝒏𝒅𝑬𝒓𝒓𝒐𝒓 🔍
- Response HTTP Status 404

- Arguments:
  - 1: {string} - Error Message
  - 2: {object} - Data that is not valid.
  - 3: {Error} [optional] - Error
```javascript
import { ResourceNotFoundError } from 'error-manager-helper'

const doc = await Model.findOne({ storeId })

if (!doc) {
    throw new ResourceNotFoundError('doc not found', { storeId })
}
```

<br><br>
<br><br>

## 𝑹𝒖𝒏𝑻𝒊𝒎𝒆𝑬𝒓𝒓𝒐𝒓 ⏳
- Response custom defined HTTP status

- Arguments:
  - 1: {string} - Error Message
  - 2: {StatusCodes} - HTTP status code [Default 500]
  - 3: {Error} [optional] - Error

```javascript
import { RuntimeError, StatusCodes } from 'error-manager-helper'

const res = getKey()

if (res.status === 403) {
    throw new RuntimeError('Request is forbidden', StatusCodes.FORBIDDEN, new Error('Any error..'))
}

```












<br><br>
<br><br>
_________________________________________
_________________________________________
<br><br>
<br><br>


# npm_lifecycle_event 🔧🛠️
- Some errors may leak sensitive informations in the stack, the message itself or by the additional provided data object which you include to your custom error e.g. `throw new ValidationError('Your error message', { objectWithPw }, new Error('Any Error'))`.
  - For this reason when you use `npm_lifecycle_event=start` your provided `error, ata and stack trace will be sanitized` and not sended to the client. Sample response:
```javascript
{
    "name": "ValidationError"
    "environment": "start",
    "timestamp": "2024-09-22T17:02:07.987Z"
    "message": "Collection name 'test!' can not contain special characters",
    "httpStatus": 400,
    "error": '[SANITIZED]',
    "data": '[SANITIZED]',
    "stack": '[SANITIZED]'
}
```
  - With all other npm_lifecycle_event it will be not sanitized. However, even with npm_lifecycle_event=start the full error will logged with console.error.












<br><br>
<br><br>
_________________________________________
_________________________________________
<br><br>
<br><br>


# Tests ✅

<br><br>
<br><br>

## Interfaces
- BaseErrorInterface
- HttpClientErrorInterface
- ResourceNotFoundErrorInterface
- RuntimeErrorInterface
- ValidationErrorInterface

<br><br>
<br><br>

## Integration Test
- The example below demonstrates an integration test for an internal service that throws a `BaseError`. 
```typescript
import { it, expect, expectTypeOf } from 'vitest'
import { type BaseErrorInterface, StatusCodes } from 'error-manager-helper'

it('should return 500 with BaseError details - error passed', async() => {
    try {
        await axios.get('https://localhost:3000/base-error?param=wrong')
        throw new Error('Base Error Test - This line should not be called')
    } catch (e: unknown) {
        const { response } = e as AxiosError
        expect(response?.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)

        const data = response?.data as BaseErrorInterface
        expectTypeOf(data).toEqualTypeOf<BaseErrorInterface>()

        expect(data.error).toEqual(`Error: ${errorMessageFromService}`)
        expect(data.message).toBe(errorMessage)
    }
})
```

<br><br>
<br><br>

## Unit Test
```typescript
import { it, expect, expectTypeOf } from 'vitest'
import { BaseError, type BaseErrorInterface } from 'error-manager-helper'

describe('Any test block', () => {
    const errMsg = 'Test error'
    const errMsgOriginal 'Test error original'
    const error = new Error(errMsgOriginal)

    const fn = () => {
        throw new BaseError(errMsg)
    }

    it('should throw BaseError', () => {
        try {
            fn()
            throw new Error('Base Error Test - This line should not be called')
        } catch (err: unknown) {
            const typedErr = err as BaseErrorInterface

            expectTypeOf(typedErr).toEqualTypeOf<BaseErrorInterface>()
            expect(typedErr).toBeInstanceOf(BaseError)

            expect(typedErr.error).toEqual(error)
            expect(typedErr.message).toBe(errMsg)
        }
    })
})
```
