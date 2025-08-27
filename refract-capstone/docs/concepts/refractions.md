---
sidebar_position: 1
title: Refractions
---

# Refractions

In Refract, refractions are reactivity primitives. They are the smallest units of observable state, tracked by the reactivity system. When data in a refraction changes, Refract's reactivity system updates the UI.

## What is a refraction?  
A refraction is like a tiny motion sensor connected to a network of lights in a house. When you leave your bedroom, the sensor registers motion and sends a signal, and the light connected to the bedroom is turned off.

In our case, a refraction is the motion sensor, and the UI is our network of lights. When a user clicks a 'save' button, a signal is sent and Refract accomplishes the action and then makes the button unclickable, for example.

### Refractions as reactivity primitives
In Refract, a **refraction** is that very primitive. Here's what that means:

1. **Fundamental Unit of Change:** A refraction (`useRefraction(initialValue)`) holds a single value. When you interact with this refraction (e.g., `count.set(count.value + 1)`), Refract's reactivity system is immediately aware of this change.

2. **Automatic Dependency Tracking:** When a component's JSX or an optic's logic _reads_ the value of a refraction (`count.value`), Refract automatically creates a "dependency." It knows that this part of the UI or logic "depends" on that specific refraction.

3. **Surgical Updates:** Because Refract tracks these dependencies at a granular level, when a refraction's value changes, the framework doesn't need to re-run the entire component or re-evaluate large parts of the UI. Instead, it only re-executes the precise pieces of code (and updates the exact DOM elements) that depend on that specific refraction. This is often referred to as **fine-grained reactivity**.


Refractions work the same way. 
A refraction 

What kind of things does a refract allow?
- sends out a signal every time something changes
- if another part of the UI depends on this refraction, Refract tracks all dependencies of refractions automatically. So anytime a refraction changes, all its dependencies 
  
---

## When would I use a refraction? Use cases

You should use a **refraction** whenever you have a piece of data in your Refract application that needs to be **reactive**, meaning that when its value changes, the UI (or other dependent logic) should automatically update. Refractions are the core primitive for managing dynamic state in Refract.

### 1. Local Component State 📦

Refractions are used to:
- manage local state of  a single component. 
- manage changes that should trigger updates within a component's UI.

**Examples:**
- The `count` in a `Counter` component.
- The `isOn` boolean in a `ToggleButton`.
- The visibility state of a modal (`isModalOpen`).
- The value of an individual input field (`inputValue`).

### 2. Global or Shared Application State 🌐

In addition to controlling the state of an individual component, refractions can share data to multiple components of your site if they need it.

This is commonly used when you want  settings in your application to be used by the entire site. This is what is called global or shared state.

**Examples:**
- The current `appTheme` (e.g., 'light' or 'dark'). 
- The `currentUser` object after a user logs in.
- A `shoppingCart` array that multiple product components and a cart summary component need to access.
- The application's `language` setting.

### 3. Derived State (Computed Values) 🧮

Refractions can create values derived from other reactive states. 

**Examples:**
- A `fullName` refraction derived from `firstName` and `lastName` refractions.
- A `totalPrice` refraction derived from an array of `itemPrice` refractions.
- An `isFormValid` refraction derived from the state of multiple form input refractions.

### 4. Managing Asynchronous Data ⏳

When fetching data from an API or performing other asynchronous operations, refractions are excellent for holding the state of the data, as well as related loading and error states.

**Examples:**
- A `fetchedData` refraction to store the results of an API call.
- An `isLoading` refraction to indicate if data is currently being fetched.
- An `errorMessage` refraction to store any errors during data loading.

### 5. Form Inputs and Validation 📝

Refractions are ideal for binding to form input values and managing their state, as well as tracking validation status.

**Examples:**
- A `usernameInput` refraction for a text field.
- A `passwordInput` refraction.
- An `isUsernameValid` refraction that updates based on `usernameInput`.

---

## Advantages of using refractions 

Using refractions in these cases leverages Refract's core strengths:

- **Automatic UI Updates:** You don't manually tell the DOM to update. When a refraction's value changes, Refract's compile-time reactivity system automatically and surgically updates only the necessary parts of the UI that depend on it.

- **Fine-Grained Performance:** Because updates are highly targeted, Refract minimizes unnecessary work, leading to very efficient and performant applications.

- **Declarative Code:** You declare _what_ the state is and _how_ it's derived, rather than imperatively managing DOM changes. This makes your code cleaner and easier to reason about.

- **Clear State Management:** Refractions provide a clear and explicit way to define and interact with reactive state, making your application's data flow predictable.

---
## How to create a refraction

Once created, a refraction object typically has two essential properties/methods:

- **`.value`**: A property used to **read** the current value of the refraction.
    
- **`.set(newValue)`**: A method used to **update** the value of the refraction. Calling this method is what triggers the reactivity system to re-evaluate and update any parts of the UI that depend on this refraction.
  

## Example: creating & using a refraction

In this example, we want to create create the `isOn` refraction to manage a togglebutton on a UI.  

### 1. Declare the Refraction (Component Setup)

Declare the reactive state for the component using `lens.useRefraction()`.


```js
const isOn = lens.useRefraction(false);
```

**What happens:** 
- When the `ToggleButton` component is initially set up (which happens once, thanks to Refract's compile-time nature), `lens.useRefraction(false)` creates a new **refraction** named `isOn`. 
- This `isOn` object holds the boolean state for the button's toggle status, and it's initialized to `false`. 
- Refract's internal system now knows to track changes to this specific `isOn` refraction.

---

### 2. Initial Render (Display the Initial State)

The first time the component renders, the JSX uses the current value of the `isOn` refraction to determine the button's appearance and text.

```js
// ...
backgroundColor: isOn.value ? '#28a745' : '#dc3545', // Red if off
// ...
{isOn.value ? 'ON' : 'OFF'} // Displays 'OFF'
```

**What happens:** 
- Since `isOn.value` is initially `false`, the button renders with a red background and the text "OFF". 
- The Refract compiler has already established the dependencies: it knows that the button's `backgroundColor` style and its `children` (text content) are directly linked to `isOn.value`.

---
#### 3. User Interaction (Clicking the Button)

The user interacts with the UI by clicking the button.

```js
<button onClick={handleClick}>
// ...
```

- **What happens:** The `onClick` event listener attached to the button triggers the `handleClick` function defined within the component's setup.

---
#### 4. Updating the Refraction's Value

Inside the `handleClick` function, the `isOn` refraction's value is explicitly changed.


```js
const handleClick = () => {
  isOn.set(!isOn.value); // Toggles from false to true
};
```

**What happens:** 
- The `isOn.set()` method is called with the _negated_ current value of `isOn.value` (so `!false` becomes `true`). 
- This is the critical moment where the state changes. Refract's reactivity system detects that the `isOn` refraction has a new value (`true`).

---
#### 5. Reactivity System Detects Change

Refract's compile-time generated code springs into action.

**What happens:** 
- Because the compiler previously identified that certain parts of the button's JSX depend on `isOn.value`, it now knows exactly which specific DOM updates are required. 
- The `ToggleButton` component's setup function itself **does not re-run**; only the affected parts of the UI are targeted.

---

#### 6. Surgical DOM Update

The browser's Document Object Model (DOM) is directly and efficiently updated.


```js
// ...
backgroundColor: isOn.value ? '#28a745' : '#dc3545', // Now becomes green
// ...
{isOn.value ? 'ON' : 'OFF'} // Now displays 'ON'
```

**What happens:** 
- Refract's optimized JavaScript code directly changes the button's `backgroundColor` style to green and updates its text content from "OFF" to "ON". 
- This is a "surgical" update, meaning only the necessary elements are touched, leading to high performance and a smooth visual transition. 
- The user sees the button instantly change its appearance and text.

Full code snippet
```js 
import { createComponent } from 'refract';

// This is the main component that contains our toggle button.
const ToggleButton = createComponent(({ lens }) => {
  // We use `useRefraction` to create a local, reactive state named `isOn`.
  // We initialize its value to `false`.
  const isOn = lens.useRefraction(false);

  // This function is called when the button is clicked.
  // It flips the boolean value of our `isOn` refraction.
  const toggle = () => {
    isOn.set(!isOn.value);
  };

  // We return a button whose appearance and text change based on the state.
  return (
    <button
      onClick={toggle}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        // The background color is a derived value, depending on `isOn.value`.
        backgroundColor: isOn.value ? '#28a745' : '#dc3545',
      }}>
      {/* The button's text is also a derived value. */}
      {isOn.value ? 'ON' : 'OFF'}
    </button>
  );
});

// The main App component to render our button.
const App = createComponent(() => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'sans-serif'
    }}>
      <ToggleButton />
    </div>
  );
});

export default App;

```

## Recap
 - A refraction is a reactivity primitive, the smallest value that the UI framework can track.
 - Refractions allow for automatic dependency tracking. If a refraction changes, the UI only reexecutes the precise code that depended on the specific refraction.
- Refractions are used wherever you expect data in your application to be reactive. 
