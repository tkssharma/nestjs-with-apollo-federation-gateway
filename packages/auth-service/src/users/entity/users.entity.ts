import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255, select: true, unique: true })
  public email!: string;

  @Column({ type: 'varchar', length: 500 })
  public password!: string;

  @Column({ type: 'varchar', length: 255, select: true, unique: true })
  public username!: string;

  @Column({ type: 'jsonb', default: [] })
  public permissions!: string[];

  @Column({ type: 'varchar', length: 255, select: true })
  public lowercaseUsername!: string;

  @Column({ type: 'varchar', length: 255, select: true })
  public lowercaseEmail!: string;

  @Column({ type: 'jsonb', default: null })
  public passwordReset!: any;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: true })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: true })
  public updated_at!: Date;

}
