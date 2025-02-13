
import { Ability } from "@casl/ability";
import { Action } from "src/auth/entities/permission.entity";

import { getMetadataArgsStorage } from "typeorm";
// Charger toutes les entités enregistrées dans TypeORM
const allEntities = getMetadataArgsStorage().tables.map((table) => table.target);

// Construire dynamiquement les types des sujets
type Subjects = typeof allEntities[number] | 'all';

// AppAbility définit la structure des permissions
export type AppAbility = Ability<[Action, Subjects]>;

export type PolicyHandler = (ability: AppAbility) => boolean;
