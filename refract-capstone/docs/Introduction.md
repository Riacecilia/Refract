---
title: Introduction
sidebar_position: 1
---

## What is Refract?
Refract is a UI framework designed to help you build fast, modular user interfaces with a minimal and intuitive API. 

At its core, Refract is built on three concepts:
- Refractions: Manage reactive state that automatically triggers UI updates
- Lenses: Scoped state access and lifecycle handling 
- Optics:  Composing reusable logic

With these 3 key concepts, you can develop UIs without having to learn about complex component lifecycles, complex state logic or boiler plate. 

This combination allows you to create highly performant and maintainable applications with clean, easy-to-read code.

## What can Refract do?

**Refractions**


Refractions manage reactive state and automatically update the UI. 

```js
import { createComponent } from "refract";

const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);

  return (
    <button onClick={() => count.set(count.value + 1)}>
      Clicked {count.value} times
    </button>
  );
});

export default Counter;
```

The count refraction automatically updates the button text when you click it. No useState, no manual state management—just describe what you want and let Refract handle the rest

**Lenses**


Lenses connect component logic to reactive state and side-effects:

```js
const TodoList = createComponent(({ lens }) => {
  const todos = lens.useRefraction([]);
  lens.useEffect(() => {
    fetchTodos().then(todos.set);
  }, []);
});
```

See how `lens.useEffect` triggers the asynchronous side effect of fetching data exactly once, immediately after the component mounts. Once the data is retrieved, it synchronizes the component's reactive state with the external source by passing the result directly to the `todos.set` method.

**Optics**


An optic is a reusable hook/ logic pattern that encapsulates a specific behaviour you want for your UI.

```js
function useMousePosition() {
  const pos = useRefraction({ x: 0, y: 0 });

  useOptic(() => {
    const handler = e => pos.set({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return pos;
}
```

## Why choose Refract?
1. **Exceptional Performance**: 
- only the parts of the UI that need to be updated are re-rendered. 
- built-in caching and animation-aware transitions to keep your application fast and smooth.

2. **Modularity**: 
- Complex logic is packaged into optics
- Optics allow you to share complex and repetitive behaviors (data fetching, event handling, or animations) across your application
-  No code duplication. Define the behaviour once and never have to copy it again.


3. **Minimalist API**: 
- Refract has a small, focused API that's easy to learn. 
- No complex component lifecycle to memorize; you just describe your component's state and logic, and the framework handles the rest.

4. **Clean Code**: The declarative nature of Refract and the use of optics naturally lead to more readable and maintainable components.




## Comparison with other UI frameworks

See how Refract compares with two other UI frameworks: React and Svelte.

| Feature       | Refract                                                                                                                   | Svelte                                                                                                                       | React                                                                                                                                 |
|---------------|---------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Approach      | **Runtime-based, minimal API**. Relies on a small runtime to manage explicit reactivity primitives (refractions, optics). | **Compiler-based**. Compiles code to highly optimized vanilla JavaScript at build time, with a near-zero runtime.            | **Runtime-based, Virtual DOM**. Uses a runtime library to manage a virtual representation of the UI.                                  |
| DOM Updates   | **Fine-grained**. Only updates the specific DOM nodes that depend on a changed refraction.                                | **Surgical**. Directly manipulates the DOM in the most efficient way possible.                                               | **Diffing**. Compares the virtual DOM with the previous state to find and apply changes.                                              |
| Reactivity    | **Explicit & reactive primitives**. State changes with .set() on a refraction automatically trigger updates.              | **Implicit & reactive primitives**. Assignments (=) to a state variable are automatically reactive.                          | **Explicit & hook-based**. Requires calling a setter function (useState setter) to trigger a re-render.                               |
| Component Run | **Runs once**. The component function is a "setup" that runs once on mount. Updates are handled by the reactivity system. | **Runs once**. Component code is compiled into an optimized function that runs once to create the initial DOM.               | **Re-renders**. The component function re-runs on every state or prop change to create a new virtual DOM.                             |
| Bundle Size   | **Extremely small**. The runtime is minimal as most logic is handled by the framework's core.                             | **Minimal**. The compiler produces highly optimized, tiny bundles with almost no runtime overhead.                           | **Larger**. Requires a larger runtime for the virtual DOM and its diffing algorithm.                                                  |
| Performance   | **Very high**. Aims for native-like performance due to minimal runtime and surgical updates.                              | **Very high**. Achieves peak performance by eliminating the virtual DOM.                                                     | **High**. Performance is excellent for most applications, but can be less performant than Svelte or Refract on complex updates.       |
| Mental Model  | **Pure function-driven UIs**. You describe the UI as a function of state, and Refract ensures the two are always in sync. | **Component-as-vanilla-JS**. You write in a simple component syntax, and Svelte "disappears," leaving behind optimized code. | **UI as a function of state**. You write a function that takes props and state and returns JSX, and React figures out what to change. |


## What's Next 
