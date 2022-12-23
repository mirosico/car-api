import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
  AfterInsert,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Report } from '../../reports/entities/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
