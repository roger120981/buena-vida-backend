/**
 * Entidad base para un cuidador.
 */
export class CaregiverEntity {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }