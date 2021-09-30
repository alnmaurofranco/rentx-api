import {
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  PrimaryColumn,
  Entity,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Specification };
