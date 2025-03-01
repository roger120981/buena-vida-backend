import { BadRequestException } from '@nestjs/common';

/**
 * Opciones de filtrado dinámico para consultas Prisma.
 */
export type FilterOptions = Record<string, any>;

/**
 * Opciones de paginación.
 */
export interface PaginationOptions {
  page: number;
  pageSize: number;
}

/**
 * Opciones de ordenamiento.
 */
export interface SortOptions {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

/**
 * Resultado paginado genérico.
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
}

/**
 * Aplica filtros, paginación y ordenamiento a cualquier modelo de Prisma.
 */
export async function applyFilters<T>(
  prismaModel: { findMany: (args: any) => Promise<T[]>; count: (args: any) => Promise<number> },
  filters: FilterOptions = {},
  pagination: PaginationOptions = { page: 1, pageSize: 10 },
  sort: SortOptions = { sortBy: 'createdAt', sortOrder: 'asc' },
  validSortFields?: string[],
): Promise<PaginatedResult<T>> {
  // Validaciones
  if (!Number.isInteger(pagination.page) || pagination.page < 1) {
    throw new BadRequestException('Page must be a positive integer');
  }
  if (!Number.isInteger(pagination.pageSize) || pagination.pageSize < 1) {
    throw new BadRequestException('PageSize must be a positive integer');
  }
  if (sort.sortOrder !== 'asc' && sort.sortOrder !== 'desc') {
    throw new BadRequestException('SortOrder must be "asc" or "desc"');
  }
  if (validSortFields && !validSortFields.includes(sort.sortBy)) {
    throw new BadRequestException(`Invalid sortBy field: ${sort.sortBy}. Allowed fields: ${validSortFields.join(', ')}`);
  }

  const maxPageSize = 100;
  const effectivePageSize = Math.min(pagination.pageSize, maxPageSize);
  const skip = (pagination.page - 1) * effectivePageSize;
  const take = effectivePageSize;

  // Filtros dinámicos
  const where = { ...filters };
  if (where.startDate) where.startDate = { gte: new Date(where.startDate) };
  if (where.endDate) where.endDate = { lte: new Date(where.endDate) };
  if (where.locStartDate) where.locStartDate = { gte: new Date(where.locStartDate) };
  if (where.locEndDate) where.locEndDate = { lte: new Date(where.locEndDate) };

  // Ejecución paralela
  const [total, data] = await Promise.all([
    prismaModel.count({ where }),
    prismaModel.findMany({
      where,
      skip,
      take,
      orderBy: { [sort.sortBy]: sort.sortOrder },
    }),
  ]);

  return {
    data,
    total,
    page: pagination.page,
    pageSize: effectivePageSize,
    totalPages: Math.ceil(total / effectivePageSize),
    hasNext: skip + data.length < total,
  };
}