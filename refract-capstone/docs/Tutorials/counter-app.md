---
title: Build a counter component
sidebar_position: 1
---

# Build a counter application in Refract

In this tutorial, we will create a counter application in Refract. 

Along the way we will: 
- create a component 
- add reactivity to the counter so the UI changes when a user clicks it
- create styling for the application user interface

## Prerequisites
Before you start, make sure you have:

- Installed Refract
- Basic knowledge of Javascript

## 1. Initialise your application
In your `main.js` file, add the following code:

```js
import { createApp } from '@refract-framework/core';

const app = createApp();
```

## 2. Create the counter component

In your `app.js` file, add the following code:

```js
import { createComponent, useRefraction } from '@refract-framework/core';

const Counter = createComponent(() => {
  const [count, setCount] = useRefraction(0);
  
  return {
    view: () => (
      <div>
        <p>Count: {count.value}</p>
        <button onClick={() => setCount(count.value + 1)}>
          Increment
        </button>
      </div>
    )
  };
});

```


Notice how the starting count variable is defined by `useRefraction` being set to 0. When a user clicks a button, the value of setCount updates by increasing by 1.

## Live Demo

import CounterDemo from "@site/src/CounterDemo";

<CounterDemo />


## 3. Register the component and mount the app

Add the following code to the `main.js` file
```js
app.registerComponent('counter', Counter);

// In your HTML:
// <div id="app"></div>

app.mount('#app');
```

## 4. Full code for your application
To run your application, check that the following code is contained in these 4 key files:

- **main.js** : initialises the application instance
- **app.js** : contains the core logic and visual template for UI components
- **index.html** : provides the placeholder div where your application attaches itself and links the external JavaScript and CSS files together.
- **styles.css**: Contains visual rules for your components. Controls the colors, sizing, and alignment of the text, button, and layout.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="main.js" label="main.js" default>
    ```js
    import { createApp } from '@refract-framework/core';
import { Counter } from './app.js'; // <-- You must add this import line!

const app = createApp();

app.registerComponent('counter', Counter);

// In your HTML:
// <div id="app"></div>

app.mount('#app');
    ```
  </TabItem>
  <TabItem value="app.js" label="app.js">
    ```js
   import { createComponent, useRefraction } from '@refract-framework/core';

// The "export" keyword here allows main.js to import it!
export const Counter = createComponent(() => {
  const [count, setCount] = useRefraction(0); // Initialize with 0

  return {
    view: () => (
      <div>
        <p>Current count: {count.value}</p>
        <button onClick={() => setCount(count.value + 1)}>
          Increment
        </button>
      </div>
    )
  };
});
    ```
  </TabItem>
  <TabItem value="index.html" label="index.html">
    ```html
    <!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Refract Counter App</title>
    <!-- Links your CSS styling file -->
    <link rel="stylesheet" href="style.css"> 
</head>
<body>

    <!-- The essential HTML box where your app will inject itself -->
    <div id="app"></div>

    <!-- The script tag that tells the browser to run your JavaScript -->
    <script type="module" src="main.js"></script>
</body>
</html>
    ```
  </TabItem>
  <TabItem value="style.css" label="style.css" default>
    ```css
    /* Center everything on the screen */
body {
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* The card container */
#app > div {
  background: #fdfdfd;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  border: 1px solid #f0f0f0;
}

/* The "Current count" text */
#app p {
  font-size: 24px;
  color: #333333;
  margin-top: 0;
  margin-bottom: 20px;
}

/* The "Increment" button */
#app button {
  background-color: #0056b3;
  color: white;
  border: 1px solid #004494;
  padding: 12px 36px;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: background-color 0.1s ease;
}

/* Button hover state */
#app button:hover {
  background-color: #004494;
}
    ```
  </TabItem>
</Tabs>

