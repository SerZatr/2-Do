class LocalStorageMock {
    store: {[key:string]: string};
    length: number;
    key: any;
    constructor() {
      this.store = {};
      this.length = 0;
      this.key = 0;
    }
    clear() {
      this.store = {};
    }
    getItem(key: string) {
      return this.store[key] || null;
    }
    setItem(key: string, value: string | null) {
      this.store[key] = String(value);
    }
    removeItem(key: string) {
      delete this.store[key];
    }
  }

  export default LocalStorageMock;