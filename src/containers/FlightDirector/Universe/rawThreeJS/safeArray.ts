export default class SafeArray<T> {
  array: T[];
  addQueue: T[];
  removeQueue: Set<T>;
  constructor() {
    this.array = [];
    this.addQueue = [];
    this.removeQueue = new Set();
  }
  get isEmpty() {
    return this.addQueue.length + this.array.length > 0;
  }
  add(element: T) {
    this.addQueue.push(element);
  }
  remove(element: T) {
    this.removeQueue.add(element);
  }
  forEach(fn: (item: T) => void) {
    this._addQueued();
    this._removeQueued();
    for (const element of this.array) {
      if (this.removeQueue.has(element)) {
        continue;
      }
      fn(element);
    }
    this._removeQueued();
  }
  find(fn: (item: T) => boolean) {
    this._addQueued();
    this._removeQueued();
    for (const element of this.array) {
      if (this.removeQueue.has(element)) {
        continue;
      }
      if (fn(element)) {
        return element;
      }
    }
  }
  map(fn: (item: T) => any) {
    this._addQueued();
    this._removeQueued();
    let newArray = [];
    for (const element of this.array) {
      if (this.removeQueue.has(element)) {
        continue;
      }
      newArray.push(fn(element));
    }
    this._removeQueued();
    return newArray;
  }
  filter(fn: (item: T) => boolean) {
    this._addQueued();
    this._removeQueued();
    let newArray = [];
    for (const element of this.array) {
      if (this.removeQueue.has(element)) {
        continue;
      }
      if (fn(element)) {
        newArray.push(element);
      }
    }
    this._removeQueued();
    return newArray;
  }
  reduce<I>(fn: (prev: I, next: T, index?: number, array?: T[]) => I, acc: I) {
    this._addQueued();
    this._removeQueued();
    for (let i = 0; i < this.array.length; i++) {
      acc = fn(acc, this.array[i], i, this.array);
    }
    return acc;
  }
  _addQueued() {
    if (this.addQueue.length) {
      this.array.splice(this.array.length, 0, ...this.addQueue);
      this.addQueue = [];
    }
  }
  _removeQueued() {
    if (this.removeQueue.size) {
      this.array = this.array.filter(element => !this.removeQueue.has(element));
      this.removeQueue.clear();
    }
  }
}
