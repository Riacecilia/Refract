---
title: Build a counter component
sidebar_position: 1
---

# Build a counter application in Refract

In this tutorial, we will create a counter application in Refract. 

Along the way we will: 
- create a component 
- add reactivity to the counter so the UI changes when a user clicks it
- create styling for the application user interface

## Prerequisites
Before you start, make sure you have:

- Installed Refract
- Basic knowledge of Javascript

## 1. Initialise your application

```js
import { createApp } from '@refract-framework/core';

const app = createApp();
```

## 2. Create the counter component

```js
import { createComponent, useRefraction } from '@refract-framework/core';

const Counter = createComponent(() => {
  const [count, setCount] = useRefraction(0);
  
  return {
    view: () => (
      <div>
        <p>Count: {count.value}</p>
        <button onClick={() => setCount(count.value + 1)}>
          Increment
        </button>
      </div>
    )
  };
});

```


Notice how the starting count variable is defined by `useRefraction` being set to 0. When a user clicks a button, the value of setCount updates by increasing by 1.

## Live Demo

import CounterDemo from "@site/src/CounterDemo";

<CounterDemo />




