import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text"})
    title: string;

    @Column({nullable: true})
    author: string;

    @Column({type: "text", nullable: true})
    imageUrl: string;

    @Column({type: "longtext"})
    description: string;

}