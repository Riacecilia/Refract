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


## First time installation 

To get started with Refract, you'll need to use a package manager like npm.

1. Install the Refract package in your project directory:


```js 
npm install refract
```

2. Set up your development environment. Refract works well with modern bundlers like [Vite](https://vite.dev/) or [webpack](https://webpack.js.org/).


## Basic Usage

```js
import { createApp } from 'refract';
import App from './App';

createApp(App).mount('#root');
```

## Example: Your first component

Here is a step-by-step guide for creating your first component in Refract.

1. **Set up Your File**


First, create a new JavaScript file for your component. In this example, we'll call it `App.js`. This file will contain the code for a basic Refract component.



2. **Import the `createComponent` Function**


At the top of your `App.js` file, you need to import the `createComponent` function from the refract library. This is the core function you'll use to define a new component.

```js
import { createComponent } from 'refract';
```

3. **Define Your Component**


Now you can define your component using `createComponent`. This function takes a single argument: a setup function that contains all of your component's logic and returns the UI.

The setup function receives an object with a `lens` property. The `lens` is Refract's toolkit for managing local state and side effects.


```js
const App = createComponent(({ lens }) => {
  // All your component's logic goes here
});
```

4. **Add State and UI**


Inside your setup function, you can use the `lens` to create a reactive state variable with `lens.useRefraction()`. Then, return the JSX that defines your component's UI.

For this example, we'll create a simple counter. We'll use a refraction to hold the count and a button to update it.

```js
const App = createComponent(({ lens }) => {
  // Use a refraction to create a reactive state variable initialized to 0.
  const count = lens.useRefraction(0);

  // Return the JSX that defines the component's UI.
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
      <p style={{ fontSize: '2em', margin: '0 0 10px 0' }}>{count.value}</p>
      <button
        onClick={() => count.set(count.value + 1)}
        style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white' }}
      >
        Click me
      </button>
    </div>
  );
});
```


5. **Export the Component**


Finally, you need to export your component so it can be used in other files, like your application's main entry point.


```js
// Add this line at the end of the file.
export default App;
```


6. **Putting it all together**


When you put all the pieces together, your complete `App.js` file looks like this:


```js
// This code is a conceptual example for documentation and is not runnable.

import { createComponent } from 'refract';

// A simple counter component that manages its own internal state.
const App = createComponent(({ lens }) => {
  // Use a refraction to create a reactive state variable initialized to 0.
  const count = lens.useRefraction(0);

  // Return the JSX that defines the component's UI.
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
      <p style={{ fontSize: '2em', margin: '0 0 10px 0' }}>{count.value}</p>
      <button
        onClick={() => count.set(count.value + 1)}
        style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white' }}
      >
        Click me
      </button>
    </div>
  );
});

export default App;
```