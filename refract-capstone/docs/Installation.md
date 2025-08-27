---
sidebar_position: 2
title: Installation
---

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