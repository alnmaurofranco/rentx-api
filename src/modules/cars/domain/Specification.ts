import {
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  PrimaryColumn,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Car } from '@modules/cars/domain/Car';

@Entity('specifications')
class Specification {
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

  // @ManyToMany(() => Car)
  // @JoinTable({
  //   name: 'cars_specifications',
  //   joinColumns: [{ name: 'specification_id' }],
  //   inverseJoinColumns: [{ name: 'car_id' }],
  // })
  // cars: Car[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Specification };
