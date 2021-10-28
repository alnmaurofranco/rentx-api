import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Category } from '@modules/cars/domain/Category';

@Entity('cars')
class Car {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('numeric')
  daily_rate: number;

  @Column('boolean')
  available: boolean; // true

  @Column('varchar')
  license_plate: string;

  @Column('numeric')
  fine_amount: number;

  @Column('varchar')
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column('varchar')
  category_id: string;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}

export { Car };
