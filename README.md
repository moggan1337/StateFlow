# StateFlow ⚡

[![npm version](https://img.shields.io/npm/v/stateflow?style=flat-square)](https://www.npmjs.com/package/stateflow)
[![license](https://img.shields.io/npm/l/stateflow?style=flat-square)](https://github.com/stateflow/stateflow/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/min/stateflow?style=flat-square)](https://bundlephobia.com/package/stateflow)
[![Build Status](https://img.shields.io/github/actions/workflow/status/stateflow/stateflow/ci.yml?style=flat-square)](https://github.com/stateflow/stateflow/actions)
[![Downloads](https://img.shields.io/npm/dm/stateflow?style=flat-square)](https://www.npmjs.com/package/stateflow)

> **Lightweight Reactive State Management** — A minimal, type-safe state management library with middleware support, inspired by Redux and Zustand.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [API Reference](#api-reference)
- [Middleware](#middleware)
- [Advanced Patterns](#advanced-patterns)
- [Comparison](#comparison-with-redux-and-zustand)
- [Best Practices](#best-practices)
- [TypeScript Support](#typescript-support)
- [License](#license)

---

## Overview

StateFlow is a lightweight, reactive state management library designed for modern JavaScript and TypeScript applications. It provides a simple yet powerful API for managing application state with automatic reactivity, making it ideal for projects ranging from small prototypes to production-grade applications.

### Why StateFlow?

State management is a critical aspect of building scalable web applications. While solutions like Redux offer robust tooling, they often come with significant boilerplate and complexity. StateFlow bridges this gap by providing:

- **Minimal API surface** — Only 3 core methods needed for 95% of use cases
- **TypeScript-first** — Full type inference with zero runtime overhead
- **Middleware extensibility** — Chain custom logic for logging, persistence, and more
- **Framework agnostic** — Works with React, Vue, Svelte, or vanilla JS

### Design Philosophy

StateFlow follows these core principles:

1. **Simplicity First** — The API should be learnable in minutes, not hours
2. **Immutability by Default** — State is never mutated in place
3. **Subscription-based Reactivity** — Components subscribe to state changes efficiently
4. **Progressive Complexity** — Start simple, extend when needed

---

## Features

| Feature | Description |
|---------|-------------|
| 🔐 **Immutable Updates** | State changes always create new objects |
| 🔔 **Reactive Subscriptions** | Listeners automatically triggered on changes |
| 🧩 **Middleware System** | Extend functionality with custom middleware |
| 📦 **Zero Dependencies** | No external runtime dependencies |
| ⚡ **Tiny Bundle** | Under 1KB gzipped |
| 🎯 **TypeScript Native** | First-class TypeScript support |
| 🛠️ **DevTools Ready** | Easy integration with browser extensions |
| 🔄 **Undo/Redo Ready** | Middleware for time-travel debugging |

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Application                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐      ┌──────────────┐      ┌───────────────┐  │
│  │  Component  │ ───▶ │   Middleware │ ───▶ │     Store     │  │
│  │  (Listener) │      │    Chain     │      │  (State Root) │  │
│  └─────────────┘      └──────────────┘      └───────────────┘  │
│         │                    │                     │            │
│         │                    │                     │            │
│         ▼                    ▼                     ▼            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    State Container                       │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐  │    │
│  │  │  User   │  │  UI     │  │  Data   │  │  Settings   │  │    │
│  │  │  State  │  │  State  │  │  Cache  │  │   Config    │  │    │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────────┘  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action
     │
     ▼
┌────────────┐
│  setState  │
└────────────┘
     │
     ▼
┌────────────────────────────────────┐
│     Apply Middleware Chain         │
│  ┌──────┐ ┌──────┐ ┌────────────┐  │
│  │Logger│ │Persist│ │ Analytics │  │
│  └──┬───┘ └──┬───┘ └─────┬──────┘  │
│     │        │           │          │
└─────┼────────┼───────────┼──────────┘
      │        │           │
      ▼        ▼           ▼
┌─────────────────────────────────────┐
│         Update State (Immutable)     │
└─────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────┐
│     Notify All Subscribers          │
│  ┌─────────┐ ┌─────────┐ ┌───────┐  │
│  │Component│ │Component│ │Logger │  │
│  └─────────┘ └─────────┘ └───────┘  │
└─────────────────────────────────────┘
```

### Component Interaction

```
┌─────────────────────────────────────────────────────────────────┐
│                         Store Instance                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  state: { counter: 0, user: null, theme: 'dark' }       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│         ┌────────────────────┼────────────────────┐             │
│         │                    │                    │             │
│         ▼                    ▼                    ▼             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐      │
│  │  Listener   │      │  Listener   │      │  Listener   │      │
│  │  (Counter)  │      │  (Header)   │      │  (Theme)    │      │
│  └─────────────┘      └─────────────┘      └─────────────┘      │
│         │                    │                    │             │
│         ▼                    ▼                    ▼             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐      │
│  │  Re-render  │      │  Re-render  │      │  Re-render  │      │
│  │  on count   │      │  on user    │      │  on theme   │      │
│  └─────────────┘      └─────────────┘      └─────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Installation

### npm

```bash
npm install stateflow
```

### yarn

```bash
yarn add stateflow
```

### pnpm

```bash
pnpm add stateflow
```

### CDN

You can also use StateFlow directly from a CDN:

```html
<script type="module">
  import { createStore } from 'https://esm.sh/stateflow';
</script>
```

### Requirements

- **Node.js**: 14.0.0 or higher
- **TypeScript**: 4.0 or higher (optional, but recommended)
- **ES Modules**: Required (set `"type": "module"` in package.json)

---

## Quick Start

### Basic Usage

```typescript
import { createStore } from 'stateflow';

// 1. Create a store with initial state
const counterStore = createStore({
  count: 0,
  increment: () => {
    const current = counterStore.getState();
    counterStore.setState({ count: current.count + 1 });
  }
});

// 2. Subscribe to changes
counterStore.subscribe((state) => {
  console.log('Count changed:', state.count);
});

// 3. Update state
counterStore.setState({ count: 10 });

// 4. Read current state
console.log(counterStore.getState().count); // 10
```

### With React

```tsx
import { createStore } from 'stateflow';
import { useEffect, useState } from 'react';

// Create the store
const useStore = createStore({
  theme: 'light',
  toggleTheme: () => {
    const current = useStore.getState();
    useStore.setState({ 
      theme: current.theme === 'light' ? 'dark' : 'light' 
    });
  }
});

// Custom hook for React integration
function useSelector<T>(selector: (state: ReturnType<typeof useStore.getState>) => T) {
  const [value, setValue] = useState(() => selector(useStore.getState()));

  useEffect(() => {
    return useStore.subscribe((state) => {
      const selected = selector(state);
      setValue(selected);
    });
  }, [selector]);

  return value;
}

// Use in components
function ThemeToggle() {
  const theme = useSelector((state) => state.theme);
  
  return (
    <button onClick={() => useStore.getState().toggleTheme()}>
      Current: {theme}
    </button>
  );
}
```

---

## Core Concepts

### Store

The Store is the central container for your application state. It maintains the current state and notifies all subscribers when changes occur.

```typescript
import { Store, createStore } from 'stateflow';

// Using the class directly
const store = new Store({ count: 0 });

// Or using the factory function (recommended)
const store = createStore({
  user: null,
  items: [],
  loading: false
});
```

### State

State is a plain JavaScript object that represents the current state of your application. State must always be an object (not a primitive).

```typescript
// ✅ Valid state
const store = createStore({
  name: 'John',
  age: 30
});

// ❌ Invalid - primitives are not allowed
const store = createStore(0); // Error!
```

### Actions

Actions are functions that update state. Unlike Redux, StateFlow doesn't enforce action types — you can update state directly or through action functions.

```typescript
const store = createStore({
  count: 0,
  // Action as part of state
  increment: () => {
    store.setState({ count: store.getState().count + 1 });
  },
  decrement: () => {
    store.setState({ count: store.getState().count - 1 });
  },
  reset: () => {
    store.setState({ count: 0 });
  }
});
```

### Immutable Updates

StateFlow enforces immutability. Always create new objects when updating state:

```typescript
// ✅ Correct - create new object
store.setState({ 
  ...store.getState(), 
  count: store.getState().count + 1 
});

// ✅ Better - use callback form (planned for future)
// store.setState((state) => ({ count: state.count + 1 }));

// ❌ Incorrect - mutation won't trigger updates
store.getState().count = 100;
store.getState().count += 1;
```

---

## API Reference

### `createStore<T>(initial: T): Store<T>`

Creates a new store with the given initial state.

**Parameters:**
- `initial: T` — The initial state object (must be an object type)

**Returns:**
- `Store<T>` — A new store instance

**Example:**

```typescript
interface AppState {
  user: User | null;
  notifications: Notification[];
  theme: 'light' | 'dark';
}

const store = createStore<AppState>({
  user: null,
  notifications: [],
  theme: 'light'
});
```

---

### `store.getState(): T`

Returns the current state. This method performs no subscriptions or updates — it's a pure getter.

**Returns:**
- `T` — The current state object

**Example:**

```typescript
const currentState = store.getState();
console.log(currentState.count);

// Type-safe access
const count: number = store.getState().count;
```

**Performance Note:**
`getState()` returns the same reference if state hasn't changed. This allows you to use reference equality checks for optimization:

```typescript
const state = store.getState();
// Safe to compare: state === previousState if unchanged
```

---

### `store.setState(partial: Partial<T>): void`

Updates the state by merging the partial state with the current state. All subscribers are notified after the state is updated.

**Parameters:**
- `partial: Partial<T>` — An object containing the properties to update

**Returns:**
- `void`

**Example:**

```typescript
// Update single property
store.setState({ count: 42 });

// Update multiple properties
store.setState({
  user: { name: 'Alice', email: 'alice@example.com' },
  theme: 'dark'
});

// Based on current state
const current = store.getState();
store.setState({ 
  items: [...current.items, newItem] 
});
```

**Immutability:**
`setState` creates a shallow merge. Nested objects are replaced, not merged:

```typescript
store.setState({
  user: { name: 'Bob' }  // Replaces entire user object
  // Previous: { name: 'Alice', email: 'alice@example.com' }
  // New: { name: 'Bob' }
});
```

---

### `store.subscribe(listener: Listener<T>): () => void`

Adds a listener function that will be called whenever the state changes. Returns an unsubscribe function.

**Parameters:**
- `listener: (state: T) => void` — A callback function called with the new state

**Returns:**
- `() => void` — An unsubscribe function

**Example:**

```typescript
// Subscribe to all changes
const unsubscribe = store.subscribe((state) => {
  console.log('State updated:', state);
});

// Later: unsubscribe
unsubscribe();

// Subscribe to specific changes with selector
function subscribeToCount(store: Store<AppState>) {
  let lastCount: number;
  
  return store.subscribe((state) => {
    if (state.count !== lastCount) {
      lastCount = state.count;
      console.log('Count changed to:', state.count);
    }
  });
}
```

**Subscription Lifecycle:**

```typescript
const store = createStore({ value: 0 });

// Subscribe
const unsub1 = store.subscribe(console.log);
const unsub2 = store.subscribe(console.log);

store.setState({ value: 1 });
// Output: { value: 1 }
// Output: { value: 1 }
// Both listeners called

// Unsubscribe one
unsub1();

store.setState({ value: 2 });
// Output: { value: 2 }
// Only unsub2 called

// Unsubscribe remaining
unsub2();

store.setState({ value: 3 });
// No output - no listeners
```

---

## Middleware

Middleware allows you to intercept and enhance state changes. They are applied in order and can perform side effects, logging, persistence, and more.

### Middleware Signature

```typescript
type Middleware<T> = (store: Store<T>) => (next: (state: Partial<T>) => void) => (state: Partial<T>) => void;

// Or simpler: wraps setState behavior
type Middleware<T> = (store: Store<T>) => {
  setState: (partial: Partial<T>) => void;
};
```

### Built-in Middleware Examples

#### Logger Middleware

```typescript
function logger<T>(store: Store<T>) {
  const originalSetState = store.setState.bind(store);
  
  return {
    setState: (partial: Partial<T>) => {
      console.log('🔵 Before:', store.getState());
      console.log('🔵 Update:', partial);
      originalSetState(partial);
      console.log('🟢 After:', store.getState());
    }
  };
}
```

#### Persistence Middleware

```typescript
function persist<T>(store: Store<T>, key: string) {
  // Load initial state from localStorage
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      store.setState(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to parse saved state:', e);
    }
  }

  // Save state on changes
  store.subscribe((state) => {
    localStorage.setItem(key, JSON.stringify(state));
  });
}

// Usage
const store = createStore({ count: 0, name: 'App' });
persist(store, 'app-state');
```

#### DevTools Middleware

```typescript
function devTools<T>(store: Store<T>, name: string = 'StateFlow') {
  const globalAny = globalThis as any;
  
  if (typeof globalAny.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') {
    const devTools = globalAny.__REDUX_DEVTOOLS_EXTENSION__.connect({ name });
    
    // Send initial state
    devTools.init(store.getState());
    
    // Subscribe to changes
    store.subscribe((state) => {
      devTools.send('Update', state);
    });
    
    // Optionally handle incoming actions from DevTools
    devTools.subscribe((action: any) => {
      if (action.type === 'DISPATCH') {
        // Handle time-travel or other actions
      }
    });
  }
}
```

#### Analytics Middleware

```typescript
function analytics<T>(store: Store<T>, tracker: AnalyticsTracker) {
  store.subscribe((state, prevState) => {
    if (state.user && !prevState.user) {
      tracker.track('user_login', { userId: state.user.id });
    }
    if (state.purchase && !prevState.purchase) {
      tracker.track('purchase', { amount: state.purchase.amount });
    }
  });
}
```

#### Undo/Redo Middleware

```typescript
function undoRedo<T>(store: Store<T>, maxHistory: number = 50) {
  const history: T[] = [];
  let future: T[] = [];
  let isUndoing = false;

  const originalSetState = store.setState.bind(store);

  store.setState = (partial: Partial<T>) => {
    if (!isUndoing) {
      history.push(store.getState());
      if (history.length > maxHistory) history.shift();
      future = [];
    }
    originalSetState(partial);
  };

  return {
    undo: () => {
      if (history.length === 0) return;
      isUndoing = true;
      future.push(store.getState());
      originalSetState(history.pop()!);
      isUndoing = false;
    },
    redo: () => {
      if (future.length === 0) return;
      isUndoing = true;
      history.push(store.getState());
      originalSetState(future.pop()!);
      isUndoing = false;
    },
    canUndo: () => history.length > 0,
    canRedo: () => future.length > 0
  };
}
```

### Applying Middleware

```typescript
const store = createStore({ count: 0, user: null });

// Apply single middleware
const loggedStore = logger(store);

// Apply multiple middleware (chain)
let enhancedStore = store;
enhancedStore = logger(enhancedStore);
enhancedStore = persist(enhancedStore, 'app-state');
enhancedStore = devTools(enhancedStore);
```

---

## Advanced Patterns

### Derived State with Selectors

```typescript
const store = createStore({
  items: [],
  filter: 'all'
});

// Selector function
const selectFilteredItems = (state: typeof store.getState extends () => infer T ? T : never) => {
  if (state.filter === 'all') return state.items;
  return state.items.filter(item => item.category === state.filter);
};

// Subscribe with selector
store.subscribe((state) => {
  const filtered = selectFilteredItems(state);
  console.log('Filtered items:', filtered);
});
```

### Multiple Stores

```typescript
// User store
const userStore = createStore({
  currentUser: null,
  isAuthenticated: false
});

// UI store
const uiStore = createStore({
  theme: 'light',
  sidebarOpen: false,
  notifications: []
});

// Product store
const productStore = createStore({
  products: [],
  selectedProduct: null,
  cart: []
});
```

### Store Composition

```typescript
function createAppStore() {
  const userStore = createStore({ user: null });
  const uiStore = createStore({ theme: 'light' });
  
  return {
    user: userStore,
    ui: uiStore,
    
    // Combined getter
    getState: () => ({
      user: userStore.getState(),
      ui: uiStore.getState()
    })
  };
}
```

---

## Comparison with Redux and Zustand

| Feature | StateFlow | Redux | Zustand |
|---------|-----------|-------|--------|
| **Bundle Size** | ~1KB | ~7KB | ~1.5KB |
| **Boilerplate** | Minimal | Extensive | Minimal |
| **Actions** | Direct or functions | Action creators required | Direct or functions |
| **Middleware** | Custom implementation | Built-in middleware | Custom implementation |
| **DevTools** | Manual integration | Built-in | Built-in |
| **Immutability** | Required | Enforced | Required |
| **TypeScript** | Native | Native | Native |
| **Async Handling** | In actions | Thunks/Sagas | In actions |
| **Learning Curve** | Low | High | Low |
| **React Integration** | Manual hook | react-redux | Built-in |

### StateFlow vs Redux

**Redux** is a battle-tested, predictable state container with an extensive ecosystem. It enforces:
- Single source of truth
- State is read-only
- Changes are made with pure functions (reducers)

**StateFlow** offers a simpler alternative:
- Direct state mutations with immutable updates
- No reducers or action types required
- Minimal API surface

```typescript
// Redux approach
const increment = () => ({ type: 'INCREMENT' });
const reducer = (state = initial, action) => {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 };
    default: return state;
  }
};
const store = createStore(reducer);
store.dispatch(increment());

// StateFlow approach
const store = createStore({ count: 0 });
store.setState({ count: store.getState().count + 1 });
```

### StateFlow vs Zustand

**Zustand** is the closest comparison to StateFlow. Both are lightweight, minimal-boilerplate solutions:

| Aspect | StateFlow | Zustand |
|--------|-----------|---------|
| **API Style** | Class-based Store | Hook-based |
| **Subscriptions** | Manual | Built-in useStore |
| **Middleware** | Custom | Built-in compose |
| **React Integration** | Manual | Automatic |
| **Persistance** | Manual | Built-in middleware |

```typescript
// Zustand
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));
const count = useStore((state) => state.count);

// StateFlow
const store = createStore({ count: 0 });
store.subscribe((state) => {
  // React component re-render
});
```

### When to Choose StateFlow

✅ **Choose StateFlow when:**
- You want maximum simplicity
- Building a small to medium application
- Migrating from useState/useReducer
- Need zero dependencies

⚠️ **Consider Redux when:**
- Building a large, complex application
- Need extensive DevTools support
- Require advanced middleware (sagas)
- Team is already Redux-familiar

✅ **Consider Zustand when:**
- Building primarily with React
- Want automatic React integration
- Need built-in persistence

---

## Best Practices

### 1. Keep State Flat

Deeply nested state makes updates and subscriptions harder:

```typescript
// ❌ Avoid deep nesting
const store = createStore({
  nested: {
    deep: {
      value: 0
    }
  }
});

// ✅ Better: flatten your state
const store = createStore({
  value: 0
});
```

### 2. Use TypeScript Interfaces

Define your state shape clearly:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  user: User | null;
  items: Item[];
  loading: boolean;
  error: string | null;
}

const store = createStore<AppState>({
  user: null,
  items: [],
  loading: false,
  error: null
});
```

### 3. Batch Updates

For multiple related updates, batch them to avoid multiple re-renders:

```typescript
// ❌ Multiple updates
store.setState({ a: 1 });
store.setState({ b: 2 });
store.setState({ c: 3 });

// ✅ Single update
store.setState({ a: 1, b: 2, c: 3 });
```

### 4. Clean Up Subscriptions

Always unsubscribe when components unmount:

```typescript
useEffect(() => {
  const unsubscribe = store.subscribe(handleChange);
  return () => unsubscribe();
}, []);
```

---

## TypeScript Support

StateFlow is written in TypeScript and provides full type inference:

### Basic Types

```typescript
import { createStore, Store } from 'stateflow';

interface CounterState {
  count: number;
  step: number;
}

const store = createStore<CounterState>({
  count: 0,
  step: 1
});

// Fully typed getState
const state: CounterState = store.getState();

// Typed subscribe
store.subscribe((state: CounterState) => {
  console.log(state.count);
});
```

### Extracting Types

```typescript
import { createStore, Store } from 'stateflow';

const store = createStore({
  user: null as User | null,
  theme: 'light' as 'light' | 'dark'
});

// Extract state type from store
type AppState = ReturnType<typeof store.getState>;

// Or from Store instance
type AppState2 = Store<{ count: number }> extends Store<infer T> ? T : never;
```

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>StateFlow</strong> — Simple, reactive, lightweight.
</p>
