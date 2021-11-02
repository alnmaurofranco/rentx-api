import {
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  PrimaryColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Car } from '@modules/cars/domain/Car';

@Entity('rentals')
class Rental {
  @PrimaryColumn('varchar')
  id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column('varchar')
  car_id: string;

  @Column('varchar')
  user_id: string;

  @Column({ type: 'time with time zone' })
  start_date: Date;

  @Column({ type: 'time with time zone' })
  end_date: Date;

  @Column({ type: 'time with time zone' })
  expected_return_date: Date;

  @Column('numeric')
  total: number;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Rental };
