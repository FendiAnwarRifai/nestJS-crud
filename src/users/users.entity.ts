import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')

export class users {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique: true})
    email:string;

    @Column()
    password:string;
}