/*
  Warnings:

  - You are about to drop the `ParticipantsOnCaregivers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParticipantsOnCaregivers" DROP CONSTRAINT "ParticipantsOnCaregivers_caregiverId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantsOnCaregivers" DROP CONSTRAINT "ParticipantsOnCaregivers_participantId_fkey";

-- DropTable
DROP TABLE "ParticipantsOnCaregivers";

-- CreateTable
CREATE TABLE "participants_on_caregivers" (
    "participantId" INTEGER NOT NULL,
    "caregiverId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "participants_on_caregivers_pkey" PRIMARY KEY ("participantId","caregiverId")
);

-- AddForeignKey
ALTER TABLE "participants_on_caregivers" ADD CONSTRAINT "participants_on_caregivers_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants_on_caregivers" ADD CONSTRAINT "participants_on_caregivers_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "Caregiver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
