---
sidebar_position: 3
title: Optics
---

## What is an Optic?

 An **optic** is a reusable hook or logic pattern designed to encapsulate a specific piece of behavior. 

An optic allows you to take complex functionality—such as managing state, handling side effects, or performing computations—and package it into a single, modular function. 

This promotes a clean, organized codebase where components remain focused on their primary role of rendering UI.

## What Does It Do?

The purpose of an optic is to provide a standardized, reusable way to manage logic across your application. It typically combines two key features:

1. **State Management:** An optic uses the **`useRefraction()`** hook to create and manage its own internal, reactive state. When this state is updated, any component using the optic will automatically reflect the changes.

2. **Side Effect Management:** An optic uses the **`useOptic()`** hook to manage side effects, such as adding event listeners, fetching data, or setting up a timer. This hook handles cleanup automatically, preventing memory leaks and other common issues.

By combining these features, an optic ensures that its internal logic is completely self-contained and isolated from the components that use it.

## When to Use Optics

You should use an optic:
- when you have a piece of logic that needs to be reused in multiple places  
- when you want to move a component's complicated, non-UI-related tasks into a separate, reusable function.


Common use cases of optics include:

- **Handling Form State and Validation:** Create an optic to manage input values and validate them in real-time.

- **Managing Animations:** Encapsulate the logic for a specific animation, making it easy to apply to any component.

- **Fetching Asynchronous Data:** Build an optic to handle data fetching, loading states, and error handling for a specific API endpoint.

- **Responding to External Events:** Create an optic to manage event listeners for things like mouse movement, key presses, or media queries.



## Advantages of Optics

- **Modularity and Reusability**: Optics are designed to be highly modular. By encapsulating logic, state, and side effects into a single function, you can write the code once and easily reuse it across multiple components. This reduces code duplication and makes your application easier to maintain.

- **Encapsulation and Clarity**: Optics hide complex implementation details. A component that needs to track mouse position, for example, doesn't need to know about `mousemove` event listeners or state management—it simply calls the `useMousePosition` optic. This keeps the component's code clean and focused on its primary job of rendering the UI.

- **Performance Benefits**: Refract's optics are "dependency-aware," meaning they benefit from the framework's built-in optimizations. This includes memoization and caching, which ensure that the optic's internal computations only re-run when their dependencies have actually changed. This fine-grained reactivity helps minimize unnecessary work and improves application performance.



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



## How to Use Optics

Using an optic is straightforward and declarative. You simply call the optic function at the top level of your component, and it provides you with the state and functionality you need.

Here are the basic steps:

1. **Define the Optic:** Create a function (e.g., `useMousePosition()`) that encapsulates your reusable logic using Refract's hooks.
    
2. **Import the Optic:** In your component file, import the optic function.
    
3. **Call the Optic:** Call the function at the top of your component's setup function to get the reactive values it provides.
    
4. **Use the Values:** Use the returned values (refractions) within your component's JSX to display data and trigger behavior.
    


## Example: A Real-Life Shopping Cart Scenario

This example demonstrates how to use multiple optics to manage a shopping cart. It shows how optics can be chained together, where one optic's output becomes the input for another, creating a robust and modular system.

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

## Recap
- An optic is a reusable hook/ logic pattern that encapsulates a specific behaviour you want for your UI.
- Optics allow you to put complex functionality into a single function, that can be reused across multiple components.
- Optics are typically used to manage internal reactive state and to manage side effects (add event listeners, set timers, fetch data, add animations etc.)
- Optic function names begin with `use`.
- To use an optic, you must call it at the top of your component set up function to get the reactive values it provides.
