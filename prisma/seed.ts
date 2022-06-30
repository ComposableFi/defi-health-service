import { PrismaClient } from '@prisma/client';
import type { Service } from '@prisma/client';

const prisma = new PrismaClient();

const seedData: Service[] = [
  {
    id: 0,
    created_at: new Date(),
    updated_at: new Date(),
    name: 'TheDAO',
    contract_address: '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413',
    chain_id: '1',
    webhook_url: 'https://example.com/webhook',
    health_status: 'COMPROMISED',
  },
  {
    id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    name: 'Sushi',
    contract_address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    chain_id: '1',
    health_status: 'HEALTHY',
    webhook_url: 'https://eojk01e0ar9a2y0.m.pipedream.net',
  },
  {
    id: 2,
    created_at: new Date(),
    updated_at: new Date(),
    name: 'PancakeSwap',
    contract_address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    chain_id: '56',
    health_status: 'HEALTHY',
    webhook_url: 'https://fakewh.zip',
  },
];

async function main() {
  console.log('Starting Prisma seed...');
  for (const service of seedData) {
    const data = await prisma.service.create({ data: service });
    console.log(`Created service for ${data.name}`);
  }
  console.log('Seeding complete');
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
