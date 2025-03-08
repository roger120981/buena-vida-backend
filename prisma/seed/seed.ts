import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

async function seed() {
  const prisma = new PrismaClient();
  const CLEAN_DATABASE = true; // Cambia a `false` si no quieres limpiar los datos existentes

  try {
    // Limpiar las tablas si CLEAN_DATABASE es true
    if (CLEAN_DATABASE) {
      console.log("Cleaning up existing data...");
      try {
        await prisma.participantsOnCaregivers.deleteMany();
      } catch (error) {
        console.warn("Table participants_on_caregivers may not exist yet, skipping cleanup.");
      }
      try {
        await prisma.participant.deleteMany();
      } catch (error) {
        console.warn("Table participant may not exist yet, skipping cleanup.");
      }
      try {
        await prisma.caregiver.deleteMany();
      } catch (error) {
        console.warn("Table caregiver may not exist yet, skipping cleanup.");
      }
      try {
        await prisma.caseManager.deleteMany();
      } catch (error) {
        console.warn("Table case_manager may not exist yet, skipping cleanup.");
      }
      try {
        await prisma.agency.deleteMany();
      } catch (error) {
        console.warn("Table agency may not exist yet, skipping cleanup.");
      }
    }

    // Generar Agencias
    console.log("Generating agencies...");
    const agencies = Array.from({ length: 3 }, () => ({
      name: faker.company.name(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const createdAgencies = await prisma.agency.createMany({
      data: agencies,
    });

    // Obtener las agencias creadas para usar sus IDs
    const agenciesInDb = await prisma.agency.findMany();
    console.log(`Created ${agenciesInDb.length} agencies.`);

    // Generar Case Managers
    console.log("Generating case managers...");
    const caseManagers = Array.from({ length: 10 }, () => {
      const agency = faker.helpers.arrayElement(agenciesInDb);
      const phoneNumber = `${faker.string.numeric({ length: 3 })}-${faker.string.numeric({ length: 4 })}`;
      return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: phoneNumber,
        agencyId: agency.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const createdCaseManagers = await prisma.caseManager.createMany({
      data: caseManagers,
    });

    // Obtener los case managers creados para usar sus IDs
    const caseManagersInDb = await prisma.caseManager.findMany();
    console.log(`Created ${caseManagersInDb.length} case managers.`);

    // Generar Caregivers
    console.log("Generating caregivers...");
    const caregivers = Array.from({ length: 15 }, () => {
      const phoneNumber = `${faker.string.numeric({ length: 3 })}-${faker.string.numeric({ length: 4 })}`;
      return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: phoneNumber,
        isActive: faker.datatype.boolean({ probability: 0.9 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const createdCaregivers = await prisma.caregiver.createMany({
      data: caregivers,
    });

    // Obtener los caregivers creados para usar sus IDs
    const caregiversInDb = await prisma.caregiver.findMany();
    console.log(`Created ${caregiversInDb.length} caregivers.`);

    // Generar Participants
    console.log("Generating participants...");
    const participants: Prisma.ParticipantCreateManyInput[] = [];
    const uniqueNames = new Set<string>();

    for (let i = 0; i < 100; i++) {
      let name: string;
      do {
        name = faker.person.fullName();
      } while (uniqueNames.has(name)); // Asegurar nombres únicos
      uniqueNames.add(name);

      const gender = faker.helpers.arrayElement(["M", "F", "O"]);
      const dob = faker.date.birthdate({ min: 18, max: 80, mode: "age" });
      const isActive = faker.datatype.boolean({ probability: 0.8 });
      const caseManager = faker.helpers.arrayElement(caseManagersInDb);
      const primaryPhone = `${faker.string.numeric({ length: 3 })}-${faker.string.numeric({ length: 4 })}`;
      const secondaryPhone = `${faker.string.numeric({ length: 3 })}-${faker.string.numeric({ length: 4 })}`;

      const participant: Prisma.ParticipantCreateManyInput = {
        name,
        gender,
        medicaidId: `MED-${faker.string.alphanumeric({ length: 9 }).toUpperCase()}`,
        dob,
        location: faker.location.city(),
        community: faker.location.state(),
        address: faker.location.streetAddress(),
        primaryPhone,
        secondaryPhone,
        isActive,
        locStartDate: faker.date.past({ years: 2 }),
        locEndDate: faker.date.future({ years: 1 }),
        pocStartDate: faker.date.past({ years: 1 }),
        pocEndDate: faker.date.future({ years: 0.5 }), // Medio año
        units: faker.number.int({ min: 1, max: 100 }),
        hours: faker.number.float({ min: 1, max: 40, fractionDigits: 1 }),
        hdm: faker.datatype.boolean(),
        adhc: faker.datatype.boolean(),
        cmID: caseManager.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      participants.push(participant);
    }

    const createdParticipants = await prisma.participant.createMany({
      data: participants,
    });

    // Obtener los participants creados para usar sus IDs
    const participantsInDb = await prisma.participant.findMany();
    console.log(`Created ${participantsInDb.length} participants.`);

    // Generar ParticipantsOnCaregivers (relación muchos-a-muchos)
    console.log("Generating ParticipantsOnCaregivers relationships...");
    const participantsOnCaregivers = [];
    if (participantsInDb.length === 0 || caregiversInDb.length === 0) {
      console.error("No participants or caregivers found to create relationships.");
    } else {
      for (const participant of participantsInDb) {
        const numberOfCaregivers = faker.number.int({ min: 1, max: 3 }); // 1-3 cuidadores por participante
        const assignedCaregivers = faker.helpers.arrayElements(caregiversInDb, numberOfCaregivers);
        for (const caregiver of assignedCaregivers) {
          participantsOnCaregivers.push({
            participantId: participant.id,
            caregiverId: caregiver.id,
            assignedBy: faker.person.fullName(),
          });
        }
      }

      if (participantsOnCaregivers.length > 0) {
        await prisma.participantsOnCaregivers.createMany({
          data: participantsOnCaregivers,
        });
      } else {
        console.warn("No ParticipantsOnCaregivers relationships were generated.");
      }
    }

    console.log("Seeding completed. Generated:");
    console.log(`- ${createdAgencies.count} agencies`);
    console.log(`- ${createdCaseManagers.count} case managers`);
    console.log(`- ${createdCaregivers.count} caregivers`);
    console.log(`- ${createdParticipants.count} participants`);
    console.log(`- ${participantsOnCaregivers.length} participant-caregiver relationships`);
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();