/*
  Warnings:

  - The primary key for the `Events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Events` table. All the data in the column will be lost.
  - The required column `event_id` was added to the `Events` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Events" (
    "event_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "location" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Events" ("created_at", "description", "end_time", "location", "start_time", "title", "updated_at") SELECT "created_at", "description", "end_time", "location", "start_time", "title", "updated_at" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
