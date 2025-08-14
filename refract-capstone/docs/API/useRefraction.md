---
sidebar_position: 2 
title: "`useRefraction`"
---

`useRefraction()` is the hook for adding **local, reactive state** to your components. 

It stores data that persists between renders and automatically updates the UI when changed.

---

### Parameters

- `initialValue`: The value the state should start with. This value can be:
    - a primitive (string, number, boolean) 
    - a more complex object (array, object).


### Returns

A **refraction object** with two properties:

- `value`: The current value of the state. You should only read from this property.

- `set`: A function to update the state. You must use this function to trigger a re-render.


### Usage Rules

1.  **Top-Level Calls Only:** Just like with React hooks, `useRefraction()` must be called at the top level of your component function. Do not call it inside loops, conditionals, or nested functions.


```js
import { createComponent } from 'refract';

const Counter = createComponent(({ lens }) => {
  // `count` is the refraction object. Its initial value is 0.
  const count = lens.useRefraction(0);

  // A function that updates the state.
  const increment = () => {
    // You MUST use the `set` function to update the value.
    // Reading is done via `count.value`.
    count.set(count.value + 1);
  };

  return (
    <div>
      <p>Current count: {count.value}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
});
```

 2. **Do Not Mutate Directly:**  **Never** directly change the value of a refraction by writing to `refraction.value`. For example, `myRefraction.value = 'new value'` will **not** trigger a re-render and can lead to unexpected bugs. 
 
 Always use the `.set()` function to update the state.

### **Additional Key Information**


- **Lazy Initial State:** If your initial state is the result of an expensive computation, you can pass a function to `useRefraction`. This function will only be executed once, on the very first render, which improves performance.

```js
// This function will only be called once on mount
const user = lens.useRefraction(() => {
  return createComplexDefaultUserObject();
});
```

- **Passing Refractions as Props:** When you pass a refraction to a child component, you can either pass the entire refraction object or just its value. Passing the entire object allows the child to both read and update the state, which can be useful but also less predictable. Passing just the `.value` makes the prop read-only for the child.

### Troubleshooting and Error documentation

#### Error: The component doesn't re-render after a state change

This happens when you try to **directly mutate the `.value`** of a refraction instead of using its `.set()` method. 

Modifying the value directly bypasses Refract's reactivity system, so the framework doesn't know to re-render the component.

**Incorrect** ❌

```js
const BustedCounter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);
  
  const increment = () => {
    // ⚠️ This will NOT trigger a re-render!
    count.value += 1; 
  };

  return <button onClick={increment}>Count: {count.value}</button>;
});
```


**Correct** ✅

```js
const WorkingCounter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);

  const increment = () => {
    // ✅ Always use the `.set()` method to update state.
    count.set(count.value + 1);
  };

  return <button onClick={increment}>Count: {count.value}</button>;
});
```

---

#### Error: `useRefraction` is called conditionally

Refract hooks must be called at the top level of your component function.

Errors (e.g. Invariant Violations) and unpredictable behaviour occur if you call `useRefraction`
- inside an `if` statement 
- a loop
- a nested function 

**Incorrect** ❌

```js
const ConditionalState = createComponent(({ lens }) => {
  // ⚠️ Do not call hooks conditionally.
  if (someCondition) {
    const data = lens.useRefraction(null);
  }
  // This breaks the order of hooks on subsequent renders.
});
```

**Correct** ✅

JavaScript

```js
const ConditionalRendering = createComponent(({ lens }) => {
  // ✅ Call hooks at the top level of your component function.
  const data = lens.useRefraction(null);
  
  // Use the state to conditionally render the UI, not the hook itself.
  if (data.value === null) {
    return <p>Loading...</p>;
  }
  
  return <p>{data.value}</p>;
});
```

