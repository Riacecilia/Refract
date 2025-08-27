---
title: Introduction
sidebar_position: 1
---

## Overview
Refract is a lightweight, reactive UI framework designed to help you build fast, modular user interfaces with a minimal and intuitive API. 

It embraces a declarative approach where you describe what your UI should look like, and Refract handles the efficient updates behind the scenes.

At its core, Refract is built on three powerful concepts:
- Refractions for state management.
- Lenses for providing scoped component capabilities.
- Optics for composing reusable logic.


This combination allows you to create highly performant and maintainable applications with clean, easy-to-read code.


## Advantages
1. **Exceptional Performance**: Refract's fine-grained reactivity system ensures that only the parts of the UI that need to be updated are re-rendered. It includes built-in caching and animation-aware transitions to keep your application fast and smooth.
2. **Modularity**: By packaging logic into optics, you can share complex behaviors—like data fetching, event handling, or animations—across your application without code duplication.
3. **Minimalist API**: Refract has a small, focused API that's easy to learn. There's no complex component lifecycle to memorize; you just describe your component's state and logic, and the framework handles the rest.
4. **Clean Code**: The declarative nature of Refract and the use of optics naturally lead to more readable and maintainable components.


## Use Cases
Refract is well-suited for a variety of applications, especially those that require high performance and frequent updates.
- Interactive Dashboards: Build dashboards that update in real time with data visualizations and charts.
- Real-Time Applications: Ideal for live chat, collaborative tools, or financial tickers that need to respond to a constant stream of information.
- Games and Animations: The framework's ability to sync with the browser's animation frame makes it a great choice for fluid animations and web-based games.
- Complex Forms: Manage intricate form logic and validation by encapsulating it into reusable optics.


## Comparison with other frameworks

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
