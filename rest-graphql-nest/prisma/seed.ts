import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"


const prisma = new PrismaClient()

async function main() {
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }))

  await prisma.user.createMany({
    data: users,
  })
  console.log('✅ Users seeded')

  const posts = Array.from({ length: 40 }).map(() => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    authorId: faker.number.int({ min: 1, max: 10 }),
  }))

  await Promise.all(
    posts.map(async (post) => {
      await prisma.post.create({
        data: {
          ...post,
          comments: {
            createMany: {
              data: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }).map(() => ({
                content: faker.lorem.sentence(),
                authorId: faker.number.int({ min: 1, max: 10 }),
              })),
            }
          }
        },
      })
    })
  )

  console.log('✅ Posts seeded')
  console.log('✅ Comments seeded')
  console.log('🎉 All data seeded')
}

main()

