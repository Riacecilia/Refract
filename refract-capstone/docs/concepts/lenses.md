---
sidebar_position: 2
title: Lenses
---

## What is a Lens?

In Refract, a lens is a special object that acts a gateway to a component's local reactivity and lifecycle hooks.  It provides scoped access  to Refract's core features from within a component's definition. 

---

### Understanding lenses through an analogy 

You can think of a lens as a component's personal, private toolkit. 🛠️

Imagine creating a component is like building a house.

Imagine you have a group of builders all working on different houses. Each builder is given a backpack to build their house. This backpack  contains personalised tools they need to build their specific house—a hammer, a saw, blueprints and some nails. 

In this analogy:
    The house is a component. 
    The backpack is the lens.
    The tools inside the backpack are the hooks, like useRefraction() and useEffect().

In the same way that each house is constructed from the unique set of instructions and tools, in Refract, each  component   holds all the house's private state (`useRefraction`) and instructions (`useEffect`) so that it doesn't get mixed up with any other houses being built.

The lens ensures that all the state and effects you create for a component are completely isolated to that specific component instance. It prevents one component's state from accidentally interfering with another's, just like one builder's tools don't affect another's project.

---

## Why would I need a lens? Purpose of a lens

 The `lens` object provides scoped access to Refract's core features (reactivity, hooks, side effects) from within a component's definition. 
 
 It prevents component-local logic from accidentally interfering with global state or other components' reactivity.

The `lens` gives you access to:

- **`lens.useRefraction()`:** This is how you declare local, reactive state within a component. The `lens` ensures this refraction belongs only to that specific component instance.
- **`lens.useEffect()`:** This is the hook for performing side effects (like data fetching, DOM manipulation, or subscriptions) that need to be cleaned up when the component is unmounted. It also correctly tracks dependencies on refractions.
- **`lens.useMemo()` (or similar):** A hook for memoizing expensive computations based on reactive dependencies.


---

## When to Use a Lens

You use a  `lens` every time you define a new Refract component. The `lens` is a required part of the `createComponent` function signature. You don't have a choice in whether to use it or not; it is the fundamental way you interact with the framework's features from within a component.

---

## Special Syntax

-  The `lens` is the first and only argument to your component's setup function. 
- All of Refract's component-level hooks are accessed as methods on this `lens` object.


---

## How to create a lens

```JavaScript
// The 'lens' is passed in here 👇
const MyComponent = createComponent(({ lens }) => {
  // Access component-local state via the lens
  const count = lens.useRefraction(0);

  // Access a lifecycle hook via the lens
  lens.useEffect(() => {
    // ... side effect logic here
  }, []);

  return (
    <button onClick={() => count.set(count.value + 1)}>
      Count: {count.value}
    </button>
  );
});
```


---

## Example

Aim: To create 2 counter components, with each managing its own independent count.

The `lens` provides the necessary encapsulation. When you call `createComponent`, Refract internally creates a new `lens` object for that specific instance. Every time you use `lens.useRefraction()`, you are creating a new, isolated piece of reactive state that is owned by that component alone.


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


When you click the first button, only its count will increase. The second button's count will remain at zero until you click it. This happens because the `lens` guarantees that `lens.useRefraction(0)` creates a new, independent `count` variable for **each instance** of the `Counter` component.

 The `lens` guarantees this isolation. It's the mechanism that turns a generic `useRefraction` function into a component-specific tool, allowing you to build robust, independent components without worrying about state leaking or interfering with other parts of your application.


---

## Similarity to other frameworks 

The concept of a lens in Refract is similar to other concepts in other frameworks.

### React 
The `lens` is functionally similar to a combination of **React's hooks system**. The hooks (`useState`, `useEffect`, `useMemo`, etc.) are what you use inside a functional component to manage local state and side effects. 

You can think of the `lens` as an object that bundles all of those capabilities into a single, passed-in argument.

### Svelte
The concept of a `lens` is most similar to **how Svelte implicitly handles reactivity and lifecycle hooks**. 

In Svelte 3/4, a component's top-level `let` variables and reactive declarations (`$:`) were its local state, and lifecycle functions like `onMount` were imported directly. Svelte's compiler would implicitly "know" which parts belonged to which component. 

In Svelte 5, the new `$state` and other "runes" are the direct primitives for a component's local reactivity, which is a closer parallel to Refract's `lens.useRefraction`.

## Recap

A lens...
- is an object, automatically created for each component. 
- is the first and only argument in a component's set up function. It gives each component scoped access to Refract's features.
- acts as a container for each component instance. Any reactive state you declare, or effects that you run are tied directly and exclusively to that specific component. 
- each component's behaviour stays inside the component and doesn't affect other components or global state.

