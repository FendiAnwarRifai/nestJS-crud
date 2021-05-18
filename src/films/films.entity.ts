import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('films')

export class films {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: false })
    name:string;

    @Column({ nullable: false, type: 'text' })
    description:String;

    @Column({ nullable: false })
    price:string;
}