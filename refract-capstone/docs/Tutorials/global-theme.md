---
title: Set a global theme
sidebar_position: 2
---

# Set a global theme in Refract

This step-by-step guide will walk you through how to create an application and set a global theme for it.

## Step 1: Create the Global Refraction

Unlike local state, global state is created outside of any component function. We'll define a **refraction** called `theme` in a file of its own. This single refraction will be the source of truth for the entire application's theme.

```js
import { createComponent, useRefraction } from 'refract';

// Create the global theme refraction outside of any component.
const theme = useRefraction('light');
```

## Step 2: Read the Global State in a Component

To read the global state, a component simply needs to import the `theme` refraction and access its `.value` property. The `Header` component below does exactly this to style itself based on the current theme.

Code snippet
```js
import { createComponent, useRefraction } from 'refract';

const theme = useRefraction('light');

// The Header component reads the global theme.
const Header = createComponent(() => {
  const currentTheme = theme.value;

  return (
    <header style={{ 
      padding: '20px', 
      backgroundColor: currentTheme === 'light' ? '#f0f0f0' : '#333',
      color: currentTheme === 'light' ? '#000' : '#fff'
    }}>
      <h1>Current Theme: {currentTheme}</h1>
    </header>
  );
});
```

## Step 3: Update the Global State from Another Component

Any component can update the global state by importing the same `theme` refraction and calling its `.set()` method. The `ThemeSwitcher` component demonstrates this by toggling the theme. This single update will automatically notify all other components that depend on `theme.value` and trigger a re-render for them.

```js
import { createComponent, useRefraction } from 'refract';

const theme = useRefraction('light');

// The ThemeSwitcher component updates the global theme.
const ThemeSwitcher = createComponent(() => {
  const toggleTheme = () => {
    // Update the global state from this component.
    theme.set(theme.value === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button 
      onClick={toggleTheme} 
      style={{
        padding: '10px 20px', 
        fontSize: '16px',
        margin: '20px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px'
      }}>
      Toggle Theme
    </button>
  );
});
```


## Step 4: Assemble the Application

Finally, we put everything together in a main `App` component. It renders both the `Header` and `ThemeSwitcher`, which are now synchronized by the shared `theme` refraction. The full code snippet below is a complete, working example you can use.

```js
import { createComponent, useRefraction } from 'refract';

// Step 1: Create the global theme refraction.
const theme = useRefraction('light');

// Step 2: The Header component reads the global theme.
const Header = createComponent(() => {
  const currentTheme = theme.value;

  return (
    <header style={{ 
      padding: '20px', 
      backgroundColor: currentTheme === 'light' ? '#f0f0f0' : '#333',
      color: currentTheme === 'light' ? '#000' : '#fff'
    }}>
      <h1>Current Theme: {currentTheme}</h1>
    </header>
  );
});

// Step 3: The ThemeSwitcher component updates the global theme.
const ThemeSwitcher = createComponent(() => {
  const toggleTheme = () => {
    theme.set(theme.value === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button 
      onClick={toggleTheme} 
      style={{
        padding: '10px 20px', 
        fontSize: '16px',
        margin: '20px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px'
      }}>
      Toggle Theme
    </button>
  );
});

// Step 4: The main App component assembles the pieces.
const App = createComponent(() => {
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <Header />
      <ThemeSwitcher />
    </div>
  );
});

export default App;

```
