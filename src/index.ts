type Listener<T> = (state: T) => void;

export class Store<T extends object> {
  private state: T;
  private listeners: Set<Listener<T>> = new Set();

  constructor(initial: T) { this.state = initial; }

  getState(): T { return this.state; }

  setState(partial: Partial<T>) {
    const prev = this.state;
    this.state = { ...this.state, ...partial };
    this.listeners.forEach(fn => fn(this.state));
  }

  subscribe(listener: Listener<T>) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export function createStore<T extends object>(initial: T) {
  return new Store(initial);
}
