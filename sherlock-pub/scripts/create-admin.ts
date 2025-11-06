import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log('🔐 Create Admin User\n');

  const name = await question('Enter name: ');
  const email = await question('Enter email: ');
  const password = await question('Enter password: ');

  if (!name || !email || !password) {
    console.error('❌ All fields are required');
    process.exit(1);
  }

  // Check if user exists
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.error(`❌ User with email ${email} already exists`);
    process.exit(1);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('\n✅ Admin user created successfully!');
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
  console.log(`Role: ${user.role}`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    rl.close();
    await prisma.$disconnect();
  });
