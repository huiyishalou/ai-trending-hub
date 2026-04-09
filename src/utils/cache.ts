export class Cache {
  private data: Map<string, { value: any; expiry: number }> = new Map();

  set(key: string, value: any, ttlMinutes: number = 60): void {
    this.data.set(key, {
      value,
      expiry: Date.now() + ttlMinutes * 60 * 1000,
    });
  }

  get(key: string): any | null {
    const item = this.data.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.data.delete(key);
      return null;
    }

    return item.value;
  }

  clear(): void {
    this.data.clear();
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

export const cache = new Cache();
