---
sidebar_position: 3
title: " `useOptic` "
---

`useOptic` is a Refract Hook that lets you synchronize a component's external systems and manage its side effects.

---

### Parameters

- `setup`: A function that contains the logic for your side effect. This function is automatically run by Refract when the component is first created, and again whenever a value in the dependencies array changes. This function can optionally return a cleanup function, which Refract will execute before the next setup run or when the component is removed from the UI.
    
- `dependencies`: An optional array of values that your setup function uses. Refract will compare the values in this array between renders. If any value has changed, the setup function is re-run.
    

- If you omit this argument, the side effect will re-run after every render.
    
- If you provide an empty array ([]), the setup function will run only once when the component is first created.
    

---

### Returns

`useOptic` returns nothing (undefined).

---

### Usage Rules

1. Call `useOptic` at the top level of your component. Do not call useOptic inside loops, conditions, or nested functions. This ensures that the hook is called in the same order on every render.

2. The setup function must be synchronous. You can start an asynchronous action within it (like a fetch request), but you cannot declare the setup function as async.

3. Return a cleanup function from setup to avoid memory leaks. The cleanup function should reverse any actions taken in the `setup` function. This is  important for event listeners, timers, and subscriptions. 

4.  **The `setup` function runs after the DOM has been updated.** This is a critical rule. It means you can safely query the DOM, get measurements, or interact with rendered elements inside your `useOptic`'s `setup` function.

5. Keep rendering logic separate from side effects.** All side effects, such as mutations or asynchronous actions, must be contained within the `useOptic` hook's `setup` and cleanup functions. The component's main body should be pure and focused on returning JSX.


---

### Real-Life Example: A Shopping Cart


This example demonstrates how useOptic can be used to manage complex, interrelated calculations for a shopping cart. The optic for subtotal depends on the items array, and subsequent optics for taxAmount and total are chained, depending on the subtotal and taxRate.


```js
import { createComponent, useRefraction, useOptic } from 'refract';
// A global refraction for the tax rate.This could be updated from a different part of the app.
const taxRate = useRefraction(0.08);

const ShoppingCart = createComponent(({ lens }) => {

  // A local refraction to hold the cart items.
  const items = lens.useRefraction([
    { name: 'Apples', price: 1.50, quantity: 3 },
    { name: 'Milk', price: 3.00, quantity: 1 },
  ]);

  // Optic 1: Calculates the subtotal. It's dependent on the 'items' refraction,so it will re-run whenever an item is added, removed, or changed.

  const subtotal = lens.useOptic(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  // Optic 2: Calculates the tax. It depends on the 'subtotal' and the global 'taxRate',so it will re-run only when either of those values change.

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

// To render this component: <ShoppingCart />
```
  

### Additional Key Information


- Dependency-Aware Caching: The setup function is only re-executed if a dependency has genuinely changed, which is more efficient than manual checks and prevents unnecessary computations.

- Animation-Aware Transitions:  `useOptic` can automatically synchronise its side effects with the browser's animation frame (requestAnimationFrame), which helps create fluid animations and visual transitions without manual management.


---

### Troubleshooting and Error Documentation

#### Error: Infinite Loop

**Description:** Your application becomes unresponsive, and you may see a warning in the console about too many re-runs of a hook.

**Cause:** This happens when an optic's `setup` function updates one of its dependencies without a condition. Refract detects the change, re-runs the optic, which updates the dependency again, creating a continuous loop.

**Fix:** Ensure that any state updates within an optic's `setup` function are conditional, or that the dependency array correctly prevents the optic from re-running unnecessarily.

**Incorrect Usage:**

```js
// This code is a conceptual example for documentation and is not runnable.

// This optic will cause an infinite loop!
function useInfiniteLoop() {
  const count = useRefraction(0);
  
  useOptic(() => {
    // The optic re-runs, which triggers another state update, and so on.
    count.set(count.value + 1);
  }, [count]);
}
```

**Correct Usage:**

```js
// This code is a conceptual example for documentation and is not runnable.

// This optic correctly updates the count once on mount.
function useInitialCount() {
  const count = useRefraction(0);
  
  useOptic(() => {
    // This state update runs only once because the dependency array is empty.
    count.set(100);
  }, []);
  
  return count;
}
```

---

#### Error: Missing Cleanup

**Description:** Your application experiences unexpected behavior or a memory leak. For example, a global event listener continues to fire even after the component that added it has been removed.

**Cause:** The `useOptic`'s `setup` function adds an external resource (like an event listener, timer, or subscription) but fails to return a cleanup function to remove it.

**Fix:** Always return a function from the `useOptic`'s `setup` function that reverses the side effect. This is crucial for properly tearing down resources when the optic is unmounted or its dependencies change.

**Incorrect Usage:**

```js
// This code is a conceptual example for documentation and is not runnable.

// This optic has a memory leak!
function useMousePositionNoCleanup() {
  const pos = useRefraction({ x: 0, y: 0 });
  
  useOptic(() => {
    // We add an event listener...
    window.addEventListener('mousemove', e => pos.set({ x: e.clientX, y: e.clientY }));
    // but we don't return a cleanup function to remove it.
  }, []);
  
  return pos;
}
```

**Correct Usage:**

```js
// This code is a conceptual example for documentation and is not runnable.

// This optic correctly cleans up after itself.
function useMousePositionWithCleanup() {
  const pos = useRefraction({ x: 0, y: 0 });
  
  useOptic(() => {
    const handler = e => pos.set({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    
    // The cleanup function properly removes the listener.
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  
  return pos;
}
```


#### Error: Incorrect Dependencies

**Description:** Your side effect is not running when you expect it to, and the component's state is not updating to reflect a new value.

**Cause:** The `setup` function of your `useOptic` hook uses a value (e.g., a state variable or prop) that is not included in its dependency array. Refract's runtime assumes the value has not changed and therefore skips re-running the side effect, leading to stale data.

**Fix:** Carefully review your `setup` function and ensure that every value from your component's scope that is referenced inside it is also listed in the dependency array.

**Incorrect Usage:**


```js
// This code is a conceptual example for documentation and is not runnable.

// This optic is broken! The timer will never update if the 'delay' changes.
function useIntervalNoDeps(callback, delay) {
  useOptic(() => {
    // 'delay' is used here...
    const id = setInterval(callback, delay.value);
    return () => clearInterval(id);
  }, []); // ...but it's missing from the dependency array.
}
```

**Correct Usage:**

```js
// This code is a conceptual example for documentation and is not runnable.

// This optic correctly re-runs when the 'delay' changes.
function useInterval(callback, delay) {
  useOptic(() => {
    const id = setInterval(callback, delay.value);
    return () => clearInterval(id);
  }, [delay]); // Correct! The 'delay' refraction is included.
}
```