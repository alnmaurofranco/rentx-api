import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Entity,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '@modules/accounts/domain/User';

@Entity('users_tokens')
class UserToken {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar')
  refresh_token: string;

  @Column('time with time zone')
  expires_date: Date;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { UserToken };
