---
sidebar_position: 1
title: "`createComponent`"
---

# `createComponent`

The `createComponent()` API is the main entry point for defining a Refract component. It takes a single function and returns a component that can be rendered in your application. This function is your component's core logic, and it will automatically be provided with a unique **`lens` object** 🧰.

---

### Parameters

- `setupFunction`: A function that receives the `lens` object as its only argument. 

In this setupFunction, you use the `lens` hooks to declare:
- component state
- derived values 
- side effects 


`setupFunction` must return a UI element (e.g., JSX).


### Returns

- A **Refract component**, which can be used in your application's JSX tree.


### Usage

Refract automatically calls  `setupFunction` whenever a component needs to be rendered. A lens is provided for each component instance. This ensures that a component's state is completely isolated from other components.



```js
import { createComponent } from 'refract';

// Defines a new component called 'MyButton'
const MyButton = createComponent(({ lens }) => {
  const isHovering = lens.useRefraction(false);

  return (
    <button
      onMouseEnter={() => isHovering.set(true)}
      onMouseLeave={() => isHovering.set(false)}
      style={{
        backgroundColor: isHovering.value ? 'dodgerblue' : 'gray',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Hello, Refract!
    </button>
  );
});
```

### Additional Key Information

- **The Setup Function Re-runs:** The component's `setupFunction` re-runs on every render. The `lens` object and its hooks are what allow state to persist between these renders. The mental model is not that the function only runs once, but that the hooks inside it are what "remember" state and effects.

- **Performance:** Avoid performing heavy, non-hook-based computations directly in the setup function. If a calculation is expensive and only depends on reactive state, it should be moved into an **optic** or a memoized hook (like `useMemo`) to prevent it from re-running unnecessarily.

### Troubleshooting and Errors

The `createComponent()` API is the foundation of every Refract component. Errors related to it are often simple and tied to its core purpose: to return a renderable UI element.



#### Error: The component renders nothing

A component's setup function **must return a renderable UI element**, such as a single JSX element or a fragment (`<>...</>`). 

If you omit a return statement, the component will render `null`, and you'll see a blank space in your UI.

**Incorrect** ❌

```js
const MissingReturnComponent = createComponent(({ lens }) => {
  const message = lens.useRefraction('I should be visible!');
  // Missing a return statement here.
});
```

**Correct** ✅

```js
const CorrectReturnComponent = createComponent(({ lens }) => {
  const message = lens.useRefraction('I am visible!');
  return (
    <div>
      <p>{message.value}</p>
    </div>
  );
});
```
