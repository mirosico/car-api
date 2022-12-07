import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
  AfterInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  // hooks call right after entity updates but not when table updates
  @AfterInsert()
  logInsert() {
    console.log('User inserted');
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User updated');
  }

  @AfterRemove()
  logRemove() {
    console.log('User removed');
  }
}
