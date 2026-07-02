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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="main.js" label="main.js" default>
    ```
    npm install refract-js
    ```
  </TabItem>
  <TabItem value="app.js" label="app.js">
    ```
    yarn add refract-js
    ```
  </TabItem>
  <TabItem value="index.html" label="index.html">
    ```
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
    ```
    npm install refract-js
    ```
  </TabItem>
</Tabs>

