---
sidebar_position: 2
title: Installation
---
## Prerequisites
- Node.js ≥ 19
- A modern browser
- A code editor (we recommend VS Code)
- A package manager - npm (comes with Node.js), yarn or pnpm

## Create your project directory 

```
mkdir my-refract-app
cd my-refract-app
``` 

## Initialise project 
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

## Configure the development environment 


## Run the server and verify your installation 

Run the code. If everything is working, you should see the message "Hello from Refract. You've installed everything correctly".

If you don't see this message, look at our troubleshooting section to resolve common installation errors.

## Add Refract to an existing project 


