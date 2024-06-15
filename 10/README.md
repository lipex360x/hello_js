#### Fase 1 - Backend server

> yarn add express cors && yarn add -D tsx


* package.json
```json
...
"type": "module",
"scripts": {
  "dev": "tsx watch ./src/server.js"
},
...
```

* server.js
```js
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

```