import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('cars_image')
class CarImage {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  car_id: string;

  @Column('varchar')
  image_name: string;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { CarImage };
