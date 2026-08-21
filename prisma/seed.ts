import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: 'IIT Madras',
        location: 'Chennai, Tamil Nadu',
        city: 'Chennai',
        state: 'Tamil Nadu',
        fees: 800000,
        rating: 4.8,
        courses: ['B.Tech CSE', 'B.Tech Mechanical', 'M.Tech'],
        overview: 'Premier engineering institute known for research and placements.',
        placements: { avgPackage: 18.5, highestPackage: 120, topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs'] },
      },
      {
        name: 'Anna University',
        location: 'Chennai, Tamil Nadu',
        city: 'Chennai',
        state: 'Tamil Nadu',
        fees: 150000,
        rating: 4.2,
        courses: ['B.E CSE', 'B.E ECE', 'MBA'],
        overview: 'Leading state technical university with strong industry connections.',
        placements: { avgPackage: 6.5, highestPackage: 25, topRecruiters: ['TCS', 'Infosys', 'Wipro'] },
      },
      {
        name: 'VIT Vellore',
        location: 'Vellore, Tamil Nadu',
        city: 'Vellore',
        state: 'Tamil Nadu',
        fees: 400000,
        rating: 4.3,
        courses: ['B.Tech CSE', 'B.Tech IT', 'M.Tech'],
        overview: 'Private university known for its flexible curriculum and campus life.',
        placements: { avgPackage: 8.5, highestPackage: 44, topRecruiters: ['Amazon', 'Deloitte', 'Cognizant'] },
      },
    ],
  })
  console.log('Seed data added successfully')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())