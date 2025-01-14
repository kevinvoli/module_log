import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("corbeille", { schema: "gestion_stock" })
export class Corbeille {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "type_element", nullable: true, length: 50 })
  typeElement: string | null;

  @Column("longtext", { name: "contenu", nullable: true })
  contenu: string | null;

  @Column("datetime", {
    name: "date_suppression",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateSuppression: Date | null;

  @CreateDateColumn({type:'datetime',  name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime', name: 'delected_at'})
  delectedAt:Date;
}



