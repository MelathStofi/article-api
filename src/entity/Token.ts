import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Token {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "text"})
    platform: string;

    @Column({default: 5})
    remaining: number;

}