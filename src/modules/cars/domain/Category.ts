import { randomUUID } from 'crypto';

class Category {
  id?: string;

  name: string;

  description: string;

  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export { Category };
