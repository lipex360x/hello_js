
#### fase 1 - Startup

* index.html
```html
<html>
  <head></head>
  <body>
    <div id="app"></div>
    <h1>Hello World</h1>
    <script src="main.js"></script>
  </body>
</html>
```

* main.js
```js
console.log('hello world')
```
---

#### fase 2 - Vite

* package.json
```json
{
  "name": "financas",
  "version": "1.0.0",
}

```

> yarn add -D vite

* package.json
```
...
"scripts": {
  "dev": "vite"
},
...
```

* .gitignore
```
node_modules
```

---

#### Fase 3 - Tailwind

> yarn add -D tailwindcss postcss autoprefixer sass

> npx tailwindcss init -p

* index.html
```html
...
<script src="main.js" type="module"></script>
...
```

* styles.scss
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply antialiased;
}

```

* main.js
```js
import './style.scss'
console.log('hello world')
```

* .vscode/settings.json
```json
{
  "scss.lint.unknownAtRules": "ignore",
}
```

---

#### Fase 4 - Backend server

> yarn add express cors && yarn add -D tsx