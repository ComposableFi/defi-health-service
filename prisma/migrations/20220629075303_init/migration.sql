-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "chain_id" TEXT NOT NULL,
    "contract_address" TEXT NOT NULL,
    "webhook_url" TEXT NOT NULL,
    "health_status" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_id_key" ON "Service"("id");
