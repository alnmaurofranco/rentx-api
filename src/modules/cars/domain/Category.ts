import { randomUUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryColumn('varchar')
  id?: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export { Category };
