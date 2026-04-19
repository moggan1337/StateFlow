# StateFlow

Reactive state management inspired by Redux/Zustand.

## Features
- Immutable updates
- Subscriptions
- Middleware support
- DevTools integration

## Usage
```typescript
const store = createStore({ count: 0, user: null });
store.subscribe(state => console.log(state));
store.setState({ count: store.getState().count + 1 });
```
