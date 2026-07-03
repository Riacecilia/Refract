---
sidebar_position: 2
title: Installation
---

:::note[Prerequisites]

- Node.js ≥ 19
- A modern browser
- A code editor (we recommend VS Code)
- A package manager - npm (comes with Node.js), yarn or pnpm

:::

## Create your project directory 

```
mkdir my-refract-app
cd my-refract-app
``` 

## Initialise the project 
Set up a new Node.js project and generate a package.json file:

```
npm init -y
```

## Install Refract and dependencies
Add Refract along with the essential development dependencies:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>
    ```
    npm install refract-js
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```
    yarn add refract-js
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```
    pnpm add refract-js
    ```
  </TabItem>
</Tabs>


## Create your project structure
Create the following folders and files:

```
my-refract-app/
├── src/
│   ├── components/
│   │   ├── App.js
│   │   └── Header.js
│   ├── optics/
│   │   └── useTheme.js
│   ├── main.js
│   └── index.html
├── refract.config.js
└── vite.config.js
└── package.json


```

Here's what each part does:

- `src/`: Your source code lives here
- `src/components/`: All Refract components live here
  - `App.js`: Main app component
  - `Header.js`: Individual UI components
- `src/optics/`: Reusable state logic and custom hooks
- `src/main.js`: Your app's entry point where you mount the root component
- `src/index.html`: The HTML template that loads your app
- `refract.config.js`: Optional configuration file for compiler settings and build options
- `vite.config.js`: contains configuration file for Vite
- `package.json`: npm package file with  dependencies

## Modify project files

In your `src/main.js` file, 

```js
import { createApp } from 'refract';
import App from './components/App';

createApp(App).mount('#root');

```

In your `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Refract App</title>
</head>
<body>
  <div id="root"></div>
  <script src="./main.js"></script>
</body>
</html>
```

In the `src/components/App.js` file, 

```js
import { createComponent } from "refract";
const App = createComponent(() => {
	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>Hello from Refract!</h1>
			<p>You've installed everything correctly.</p>
		</div>
	);
});
export default App;
```

## Add your build tool configuration

Vite (recommended)

Install the Refract plugin 
```
npm install @refract/vite-plugin
```

Create a new file named `vite.config.js` and add the following code:

```
import { defineConfig } from 'vite';
import refract from '@refract/vite-plugin';

export default defineConfig({
  plugins: [refract()],
});
```

## Run the development server 

To view your site, you'll need to run the development server. Run the following command in the terminal.
 
<Tabs>
  <TabItem value="npm" label="npm" default>
    ```
    npm run dev
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```
    yarn dev
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```
    pnpm dev
    ```
  </TabItem>
</Tabs>


If everything is working, you should see a new window should open in your browser at localhost:3000, and you should see the message "Hello from Refract. 


If you don't see this message, look at our troubleshooting section to resolve common installation errors.


