/*
  Warnings:

  - You are about to drop the column `senha` on the `User` table. All the data in the column will be lost.
  - Added the required column `cacadorId` to the `Abate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo_lote` to the `Abate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_lote` to the `Abate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criadoPorId` to the `Foco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foto_url` to the `Foco` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Foco` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `senha_hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `papel` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Papel" AS ENUM ('cacador', 'produtor', 'admin');

-- CreateEnum
CREATE TYPE "StatusFoco" AS ENUM ('novo', 'em_atendimento', 'resolvido');

-- CreateEnum
CREATE TYPE "StatusLote" AS ENUM ('pendente_inspecao', 'liberado');

-- AlterTable
ALTER TABLE "Abate" ADD COLUMN     "cacadorId" INTEGER NOT NULL,
ADD COLUMN     "codigo_lote" TEXT NOT NULL,
ADD COLUMN     "focoId" INTEGER,
ADD COLUMN     "status_lote" "StatusLote" NOT NULL;

-- AlterTable
ALTER TABLE "Foco" ADD COLUMN     "criadoPorId" INTEGER NOT NULL,
ADD COLUMN     "foto_url" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusFoco" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "senha",
ADD COLUMN     "senha_hash" TEXT NOT NULL,
DROP COLUMN "papel",
ADD COLUMN     "papel" "Papel" NOT NULL;

-- AddForeignKey
ALTER TABLE "Foco" ADD CONSTRAINT "Foco_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abate" ADD CONSTRAINT "Abate_cacadorId_fkey" FOREIGN KEY ("cacadorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abate" ADD CONSTRAINT "Abate_focoId_fkey" FOREIGN KEY ("focoId") REFERENCES "Foco"("id") ON DELETE SET NULL ON UPDATE CASCADE;
