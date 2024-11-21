# 𝑬𝒓𝒓𝒐𝒓 𝑴𝒂𝒏𝒂𝒈𝒆𝒓 💻

An Express error middleware that provides custom error types for efficient error handling across various use cases.



<br><br>

# Initialization

You can utilize the custom error types even if you are not using Express. However, note that in such cases, the errors will only be thrown and not sent to the client.

```typescript
import axios, { AxiosError } from 'axios';
import express from 'express';
import 'express-async-errors';

import { errorMiddleware, HttpClientError } from 'error-manager-helper';

const app = express();

app.get('/httpclient-error', async () => {
    try {
        await axios.get('https://anySample.website/notFound');
    } catch (e) {
        throw new HttpClientError('Test error', e as AxiosError);
    }
});

// Include error middleware
app.use(errorMiddleware);

const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

### Sample Response

```javascript
const res = await axios.get('http://127.0.0.1:3000/httpclient-error');
console.log(res.response.data);

/* Output:
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
      Accept: "application/json, text/plain",
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
*/
```













<br><br><br><br>

# 𝑩𝒂𝒔𝒆𝑬𝒓𝒓𝒐𝒓 🚨

**HTTP Status**: 500

## Arguments:
- **1**: `{string}` - Error Message
- **2**: `{Error}` [optional] - Error

```typescript
import { BaseError } from 'error-manager-helper';

try {
    const chatCompletion = await this.client.chat.completions.create(params);
    return chatCompletion;
} catch (err) {
    throw new BaseError('Cannot create chat completion', err as Error);
}
```





<br><br>

# 𝐇𝐭𝐭𝐩𝐂𝐥𝐢𝐞𝐧𝐭𝐄𝐫𝐫𝐨𝐫 🌐

**HTTP Status**: Varies based on the error of your HTTP request.

## Supported HTTP Clients:
- Axios

## Arguments:
- **1**: `{string}` - Error Message
- **2**: `{AxiosError}` - Axios Error

```typescript
import axios, { type AxiosError } from 'axios';
import { HttpClientError } from 'error-manager-helper';

try {
    const response = await axios.request(config);
    return response;
} catch (err) {
    throw new HttpClientError('Cannot send request', err as AxiosError);
}
```





<br><br>

# 𝑽𝒂𝒍𝒊𝒅𝒂𝒕𝒊𝒐𝒏𝑬𝒓𝒓𝒐𝒓 ❌

**HTTP Status**: 400

## Arguments:
- **1**: `{string}` - Error Message
- **2**: `{object}` - Invalid Data
- **3**: `{Error}` [optional] - Error

```typescript
import { ValidationError } from 'error-manager-helper';

if (test !== 'expectedValue') {
    throw new ValidationError('Test is not valid', { test });
}
```






<br><br>

# 𝑹𝒆𝒔𝒐𝒖𝒓𝒄𝒆𝑵𝒐𝒕𝑭𝒐𝒖𝒏𝒅𝑬𝒓𝒓𝒐𝒓 🔍

**HTTP Status**: 404

## Arguments:
- **1**: `{string}` - Error Message
- **2**: `{object}` - Invalid Data
- **3**: `{Error}` [optional] - Error

```typescript
import { ResourceNotFoundError } from 'error-manager-helper';

const doc = await Model.findOne({ storeId });

if (!doc) {
    throw new ResourceNotFoundError('Document not found', { storeId });
}
```






<br><br>

# 𝑹𝒖𝒏𝑻𝒊𝒎𝒆𝑬𝒓𝒓𝒐𝒓 ⏳

**Custom HTTP Status**

## Arguments:
- **1**: `{string}` - Error Message
- **2**: `{StatusCodes}` - HTTP Status Code [Default: 500]
- **3**: `{Error}` [optional] - Error

```typescript
import { RuntimeError, StatusCodes } from 'error-manager-helper';

const res = await getKey();

if (res.status === 403) {
    throw new RuntimeError('Request is forbidden', StatusCodes.FORBIDDEN);
}
```




















<br><br><br><br>

# npm_lifecycle_event 🛠️

Some errors may leak sensitive information in the stack, message, or additional data included in your custom error. 

To mitigate this, when you use `npm_lifecycle_event=start`, your provided `error`, `data`, and `stack trace will be sanitized` and not sent to the client. 

### Sample Response:
```javascript
{
    "name": "ValidationError",
    "environment": "start",
    "timestamp": "2024-09-22T17:02:07.987Z",
    "message": "Collection name 'test!' cannot contain special characters",
    "httpStatus": 400,
    "error": "[SANITIZED]",
    "data": "[SANITIZED]",
    "stack": "[SANITIZED]"
}
```

With all other `npm_lifecycle_event`, the error will **not** be sanitized. However, even with `npm_lifecycle_event=start`, the full error will be logged using `console.error`.




















<br><br><br><br>

# Tests ✅

---

## Interfaces
- `IBaseError`
- `IHttpClientError`
- `IResourceNotFoundError`
- `IRuntimeError`
- `IValidationError`

---

## Integration Test

The example below demonstrates an integration test for an internal service that throws a `BaseError`.

```typescript
import axios, { AxiosError } from 'axios';
import { it, expect, assert } from 'vitest';
import { type IBaseError, StatusCodes } from 'error-manager-helper';

it('should return 500 with BaseError details - error passed', async () => {
    try {
        await axios.get('https://localhost:3000/base-error?param=wrong');
        assert.fail('This line should not be reached');
    } catch (err) {
        if (err instanceof AxiosError) {
            expect(err.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);

            const data = err.response?.data as IBaseError;
            expect(data.error).toEqual(`Error: ${errorMessageFromService}`);
            expect(data.message).toBe(errorMessage);

            return;
        }

        assert.fail('This line should not be reached');
    }
});
```





<br><br>

## Unit Test

```typescript
import { it, expect, assert, describe } from 'vitest';
import { BaseError, type IBaseError } from 'error-manager-helper';

describe('Any test block', () => {
    const errMsg = 'Test error';
    const errMsgOriginal = 'Test error original';
    const error = new Error(errMsgOriginal);

    const fn = () => {
        throw new BaseError(errMsg);
    };

    it('should throw BaseError', () => {
        try {
            fn();
            assert.fail('This line should not be reached');
        } catch (err) {
            if (err instanceof BaseError) {
                expect(err.error).toEqual(error);
                expect(err.message).toBe(errMsg);
                return;
            }

            assert.fail('This line should not be reached');
        }
    });
});
```