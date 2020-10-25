import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Image {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "text"})
    image: string;

}