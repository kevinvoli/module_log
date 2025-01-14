import { Logs } from "src/log/entities/log.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";



@Index("email", ["email"], { unique: true })
@Entity("utilisateurs", { schema: "gestion_stock" })
export class Utilisateurs {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 100 })
  nom: string;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("varchar", { name: "mot_de_passe", length: 255 })
  motDePasse: string;

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;

}
