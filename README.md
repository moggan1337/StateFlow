# StateFlow ⚡

**Reactive State Management** - Inspired by Redux/Zustand.

## Features

- **📦 Immutable** - Immutable state updates
- **🔔 Subscriptions** - Subscribe to changes
- **⚙️ Middleware** - Extend functionality
- **🛠️ DevTools** - Debug state changes

## Installation

```bash
npm install stateflow
```

## Usage

```typescript
import { createStore } from 'stateflow';

// Create store
const store = createStore({
  count: 0,
  user: null
});

// Subscribe
store.subscribe((state) => {
  console.log('State changed:', state);
});

// Update
store.setState({ count: store.getState().count + 1 });

// Get
console.log(store.getState().count);
```

## Middleware

```typescript
const logger = (store) => (next) => (action) => {
  console.log('Before:', store.getState());
  next(action);
  console.log('After:', store.getState());
};
```

## License

MIT
