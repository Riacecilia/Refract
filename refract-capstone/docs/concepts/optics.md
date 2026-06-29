---
sidebar_position: 3
title: Optics
---

## What is an Optic?

 An **optic** is a reusable hook or logic pattern designed to encapsulate a specific piece of behavior. 

An optic allows you to take complex functionality—such as managing state, handling side effects, or performing computations—and package it into a single, modular function. 

This promotes a clean, organized codebase where components remain focused on their primary role of rendering UI.

## When to Use Optics

You should use an optic:
- when you have a piece of logic that needs to be reused in multiple places  
- when you want to move a component's complicated, non-UI-related tasks into a separate, reusable function.
- manage input values and validate them in real time
- to manage side effects such as event listeners, fetching asynchornous data, setting up timers


## Syntax

An optic is simply a JavaScript function that uses Refract's hooks and returns a value (typically a refraction). 

By convention, optic function names should begin with `use`.

Here is the general structure:

```js
import { useOptic, useRefraction } from 'refract';

function useMyOptic(inputArgs) {
  // Use hooks to manage state and side effects
  const myState = useRefraction(initialValue);

  useOptic(() => {
    // Side effect logic here
    return () => {
      // Cleanup logic here
    };
  }, [dependencies]);

  // Return the state or any other values the optic provides
  return myState;
}
```


## Usage

Using an optic is straightforward and declarative. You simply call the optic function at the top level of your component, and it provides you with the state and functionality you need.

Here are the basic steps:

1. **Define the Optic:** Create a function (e.g., `useMousePosition()`) that encapsulates your reusable logic using Refract's hooks.
    
2. **Import the Optic:** In your component file, import the optic function.
    
3. **Call the Optic:** Call the function at the top of your component's setup function to get the reactive values it provides.
    
4. **Use the Values:** Use the returned values (refractions) within your component's JSX to display data and trigger behavior.
    

## Example: A Real-Life Shopping Cart Scenario

Aim: To declaratively calculate and display a shopping cart's financial summary using a highly optimized, reactive state dependency graph that automatically updates the UI only when relevant values change.


### 1. Initialise the base state

```javascript
// Global base state
const taxRate = useRefraction(0.08);

// Local base state inside ShoppingCart
const items = lens.useRefraction([
  { name: 'Apples', price: 1.50, quantity: 3 },
  { name: 'Milk', price: 3.00, quantity: 1 },
]);
```
Establish your raw source data nodes before any optics are introduced. This instantiates the global taxRate refraction outside the component and the local items array refraction inside the component configuration.


### 2. Chain the subtotal optic

```javascript
const subtotal = lens.useOptic(() => {
  return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

```
Set up your first optic node named subtotal. It is chained directly to the raw items refraction node, recalculating a single price value whenever items are added, removed, or modified.


### 3. Chain the taxAmount optic

```js
const taxAmount = lens.useOptic(() => {
  return subtotal.value * taxRate.value;
});
```

Chain the next optic node named taxAmount. This optic creates a multi-parent dependency, chaining its logic directly to the output of the subtotal optic node from Step 2 as well as the global taxRate node from Step 1.


### 4. Chain the total optic

```js
const total = lens.useOptic(() => {
  return subtotal.value + taxAmount.value;
});
```
Chain the final derived data node named total. This optic sits at the end of the chain, combining the computed outputs of both the subtotal optic (Step 2) and the taxAmount optic (Step 3).


### 5. Bind to the layout
Finally, read from the .value property of these optics inside your JSX. Refract hooks these DOM elements directly into the graph so they react automatically.


```js
// Step 5: Read from the optics and bind their values to the layout
  return (
    <div style={{ padding: '20px', border: '2px solid #28a745', borderRadius: '10px', fontFamily: 'sans-serif' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Shopping Cart Summary</h3>
      <p>Subtotal: ${subtotal.value.toFixed(2)}</p>
      <p>Tax ({taxRate.value * 100}%): ${taxAmount.value.toFixed(2)}</p>
      <hr style={{ margin: '10px 0' }} />
      <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Total: ${total.value.toFixed(2)}</p>
    </div>
  );
}); // <-- Closes the createComponent function wrapper
```

### 6. Full Code snippet
```js
// This code is a conceptual example for documentation and is not runnable.

import { createComponent, useRefraction, useOptic } from 'refract';

// A global refraction for the tax rate
const taxRate = useRefraction(0.08);

const ShoppingCart = createComponent(({ lens }) => {
  // A local refraction to hold the cart items
  const items = lens.useRefraction([
    { name: 'Apples', price: 1.50, quantity: 3 },
    { name: 'Milk', price: 3.00, quantity: 1 },
  ]);

  // Optic 1: Calculates the subtotal. It depends on the 'items' refraction.
  const subtotal = lens.useOptic(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  // Optic 2: Calculates the tax. It depends on 'subtotal' and the global 'taxRate'.
  const taxAmount = lens.useOptic(() => {
    return subtotal.value * taxRate.value;
  });

  // Optic 3: Calculates the final total. It depends on 'subtotal' and 'taxAmount'.
  const total = lens.useOptic(() => {
    return subtotal.value + taxAmount.value;
  });

  return (
    <div style={{ padding: '20px', border: '2px solid #28a745', borderRadius: '10px', fontFamily: 'sans-serif' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Shopping Cart Summary</h3>
      <p>Subtotal: ${subtotal.value.toFixed(2)}</p>
      <p>Tax ({taxRate.value * 100}%): ${taxAmount.value.toFixed(2)}</p>
      <hr style={{ margin: '10px 0' }} />
      <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Total: ${total.value.toFixed(2)}</p>
    </div>
  );
});

// To render this component:
// <ShoppingCart />
```

