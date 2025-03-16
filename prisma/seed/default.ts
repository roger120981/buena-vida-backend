// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Crear una Agency predeterminada (id: 1)
    const defaultAgency = await prisma.agency.upsert({
      where: { id: 1 },
      update: {}, // No actualizamos nada si ya existe
      create: {
        id: 1,
        name: 'Default Agency',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log('Default Agency created or already exists:', defaultAgency);

    // Crear un CaseManager predeterminado (id: 1) asociado a la Agency predeterminada
    const defaultCaseManager = await prisma.caseManager.upsert({
      where: { id: 1 },
      update: {}, // No actualizamos nada si ya existe
      create: {
        id: 1,
        name: 'Default CaseManager',
        email: 'default@example.com',
        phone: '000-000-0000',
        agencyId: defaultAgency.id, // Vinculamos al agencyId predeterminado (1)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log('Default CaseManager created or already exists:', defaultCaseManager);

  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .then(() => {
    console.log('Seeding completed successfully');
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });