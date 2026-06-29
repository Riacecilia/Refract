---
sidebar_position: 2
title: Lenses
---

## What is a Lens?

In Refract, a lens is a special object that acts a gateway to a component's local reactivity and lifecycle hooks.  


It provides scoped access  to Refract's core features from within a component's definition. This means that a lens ensures that all the state and effects you create for a component are completely isolated to that specific component instance.


It prevents component-local logic from accidentally interfering with global state or other components' reactivity.


## When to Use a Lens

You use a  `lens` every time you define a new Refract component. 


The `lens` is a required part of the `createComponent` function signature. You don't have a choice in whether to use it or not; it is the fundamental way you interact with the framework's features from within a component.



## Syntax

-  The `lens` is the first and only argument to your component's setup function. 
- All of Refract's component-level hooks are accessed as methods on this `lens` object.



## Example

Aim: To create 2 counter components, with each managing its own independent count.


### 1. Import the the Framework and Define the Component 

```Javascript
import { createComponent } from 'refract';

const Counter = createComponent(({ lens }) => {
```

What is happening: 

- `const Counter = createComponent(...)`: This declares a reusable UI block called Counter and begins its initialization.

- `({ lens }) => {`: This passes a setup function into the component. The framework automatically injects an object into this function; here, we extract the lens property, which is responsible for giving this specific instance of the button its own isolated memory scope.

### 2. Initialize State and Create the Logic 


```javascript
const count = lens.useRefraction(0);

  const increment = () => {
    count.set(count.value + 1);
  };
```

What is happening:
- `const count = lens.useRefraction(0);`: This uses the instance's lens to allocate a private, reactive data store (a "refraction") and hooks it up with a starting value of 0.

- `const increment = () => { ... };`: This defines an internal action function that runs whenever it is called.

- `count.value + 1`: This reads the current number stored inside the count state object and adds 1 to it.

- `count.set(...)`: This updates the reactive state with the new value. Because it is reactive, this method automatically signals the UI to refresh its appearance.


### 3. Render the Counter UI 


```javascript
return (
    <button onClick={increment} style={{ padding: '10px 20px', margin: '5px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#f0f0f0' }}>
      Count: {count.value}
    </button>
  );
});
```

What is happening:
- `return (`: This marks the layout portion of the component, written in HTML-like syntax called JSX.

- `<button onClick={increment} ...>`: This creates an HTML button element and binds a click listener to it. Every time a user clicks this button, the increment logic from Step 2 executes.

- `style={{ ... }}`: This applies a JavaScript object containing CSS rules directly to the button to style its padding, borders, background, and cursor.

- `Count: {count.value}`: The curly braces {} tell the framework to evaluate JavaScript. It reads the current live value of the state and injects it as text onto the face of the button.

- `</button>); });`: This closes the button element, ends the layout return, and completes the entire definition for the Counter component.

### 4. Assemble the Parent App with Isolated Counter Instances 


```javascript
const App = createComponent(() => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', border: '2px solid #007bff', borderRadius: '10px' }}>
      <h2>Independent Counters with Lens</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Counter />
        <Counter />
      </div>
    </div>
  );
});
```
What is happening:

- `const App = createComponent(() => {`: This creates the main root component of the application, which serves as a layout wrapper.

- `<div style={{ ... }}> ... </div>`: This creates an outer structural layout container with a blue border (#007bff) and sets up a flexible column layout.

- `<h2>Independent Counters with Lens</h2>`: This renders a simple header title inside the box.

- `<div style={{ display: 'flex', gap: '10px' }}>`: This creates an inner horizontal row to display elements side-by-side with a space between them.

- `<Counter /> (First Instance)`: This mounts the counter component for the first time. The framework creates a brand new lens for this specific button, initializing its count at 0.

- `<Counter /> (Second Instance)`: This mounts the counter component a second time. Because it's a completely separate instance, the framework generates a different lens. It gets its own memory, meaning clicking the first counter won't affect this one.

### 5. Full code snippet 


```JavaScript
import { createComponent } from 'refract';

// This is the definition of our reusable Counter component.
// The `lens` ensures that each time this component is used,
// it gets its own, private `count` refraction.
const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);

  const increment = () => {
    count.set(count.value + 1);
  };

  return (
    <button onClick={increment} style={{ padding: '10px 20px', margin: '5px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#f0f0f0' }}>
      Count: {count.value}
    </button>
  );
});

// This is a parent component that uses the Counter component.
const App = createComponent(() => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', border: '2px solid #007bff', borderRadius: '10px' }}>
      <h2>Independent Counters with Lens</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        {/*
          This is the first instance of our Counter component.
          It has its own, unique `count` refraction.
        */}
        <Counter />

        {/*
          This is the second instance.
          It has a completely separate `count` refraction,
          unaffected by the first one.
        */}
        <Counter />
      </div>
    </div>
  );
});

// To run the application, you would render the `App` component.
// <App />

```
