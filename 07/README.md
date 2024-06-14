
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
```
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

> yarn add -D tailwindcss postcss autoprefixer

> npx tailwindcss init -p

* index.html
```.html
...
<script src="main.js" type="module"></script>
...
```

* main.js
```js
import './style.css'
console.log('hello world')
```


* styles.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply antialiased;
}

```
