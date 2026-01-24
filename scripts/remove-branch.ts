import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// this is to run and remove branch to verify onboarding page to add branch for old users
async function main() {
  const rollNo = process.argv[2];

  if (!rollNo) {
    console.log(
      'Please provide a roll number: npx ts-node scripts/remove-branch.ts <roll_number>'
    );
    return;
  }

  console.log(`Removing branch for user with roll number: ${rollNo}...`);

  try {
    const user = await prisma.user.update({
      where: { roll_number: Number(rollNo) },
      data: {
        branch: null,
      },
    });
    console.log('Success! Branch removed for user:', user.name);
    console.log(
      'Now log in as this user to verify the onboarding redirection.'
    );
  } catch (e) {
    if (e instanceof Error) {
      console.error('Error updating user:', e.message);
    } else {
      console.error('An unknown error occurred:', e);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
