---
title: Build a counter component
sidebar_position: 1
---

# Build a counter component in Refract

This step-by-step guide will walk you through creating a simple counter component that manages its own local state.

## Step 1: Create the Component Shell

We start by defining our Counter component using createComponent(). This function gives us access to the lens object, which is essential for managing our component's state.

```js
import { createComponent } from 'refract';

// Define the component shell and receive the `lens`.
const Counter = createComponent(({ lens }) => {
  // All our component logic will go here.
  return (
    // Our UI will be returned here.
  );
});
```

## Step 2: Add Local, Isolated State

Inside the component, we use the lens.useRefraction() hook to create a piece of state. We'll name this state count and give it an initial value of 0.

```js
import { createComponent } from 'refract';

const Counter = createComponent(({ lens }) => {
  // Create a local refraction named 'count'.
  const count = lens.useRefraction(0);

  // All our component logic will go here.
  return (
    // Our UI will be returned here.
  );
});
```

## Step 3: Create the State Update Logic

Next, we write a simple function to update our counter. We use the `.set()` method on our count refraction to change its value. This is the only way to update state and trigger a re-render.

```js
import { createComponent } from 'refract';

const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);

  // This function updates the count state.
  const increment = () => {
    count.set(count.value + 1);
  };

  return (
    // Our UI will be returned here.
  );
});
```

## Step 4: Build the Component's User Interface

Now we create the component's UI. We display the current count by accessing `count.value` and attach our increment function to a button's `onClick` event.

```js
import { createComponent } from 'refract';

const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);
  
  const increment = () => {
    count.set(count.value + 1);
  };

  return (
    <div style={{
      border: '2px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      minWidth: '200px'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Current Count: {count.value}</h3>
      <button 
        onClick={increment} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}>
        Increment
      </button>
    </div>
  );
});
```

## Step 5: Demonstrate State Isolation

To show that each component instance has its own state, we render two Counter components side-by-side in a parent App component.
```js
import { createComponent } from 'refract';

const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);

  const increment = () => {
    count.set(count.value + 1);
  };

  return (
    <div style={{
      border: '2px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      minWidth: '200px'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Current Count: {count.value}</h3>
      <button 
        onClick={increment} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}>
        Increment
      </button>
    </div>
  );
});

// Main App component to render two isolated counters.
const App = createComponent(() => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      padding: '40px',
      fontFamily: 'sans-serif'
    }}>
      {/* Each of these counters has its own independent state. */}
      <Counter />
      <Counter />
    </div>
  );
});

export default App;

```

