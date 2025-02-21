export interface FilterOptions {
    isActive?: boolean;
    name?: string;
    email?: string;
    startDate?: string;
    endDate?: string;
  }
  
  export interface PaginationOptions {
    page: number;
    pageSize: number;
  }
  
  export interface SortOptions {
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }
  
  // Función para aplicar los filtros, búsqueda, paginación y ordenamiento
  export function applyFilters(
    prismaModel: any,
    filters: FilterOptions = {},
    pagination: PaginationOptions = { page: 1, pageSize: 10 },
    sort: SortOptions = { sortBy: 'createdAt', sortOrder: 'asc' }
  ) {
    const where = {
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
      ...(filters.name && {
        name: {
          contains: filters.name,
          mode: 'insensitive', // Búsqueda insensible a mayúsculas/minúsculas
        },
      }),
      ...(filters.email && {
        email: {
          contains: filters.email,
          mode: 'insensitive',
        },
      }),
      ...(filters.startDate && filters.endDate && {
        locStartDate: {
          gte: filters.startDate,
        },
        locEndDate: {
          lte: filters.endDate,
        },
      }),
    };
  
    return prismaModel.findMany({
      where,
      skip: (pagination.page - 1) * pagination.pageSize, // Paginación
      take: pagination.pageSize,
      orderBy: {
        [sort.sortBy]: sort.sortOrder, // Ordenamiento
      },
    });
  }
  