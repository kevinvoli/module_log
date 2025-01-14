import { Utilisateurs } from "src/utilisateurs/entities/utilisateur.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
// import { Utilisateurs } from "./Utilisateurs";

@Index("user_id", ["userId"], {})
@Entity("logs", { schema: "gestion_stock" })
export class Logs {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "type_action", nullable: true, length: 100 })
  typeAction: string | null;

  @Column("datetime", {
    name: "date_action",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateAction: Date | null;

  @Column("varchar", { name: "module", nullable: true, length: 50 })
  module: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @ManyToOne(() => Utilisateurs, (utilisateurs) => utilisateurs.logs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Utilisateurs;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;
}
