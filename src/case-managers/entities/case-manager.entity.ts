/**
 * Entidad base para un administrador de casos.
 */
export class CaseManagerEntity {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    agencyId: number;
    createdAt: Date;
    updatedAt: Date;
  }