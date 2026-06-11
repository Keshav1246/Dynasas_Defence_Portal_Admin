const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Delete existing seeded demo data (keeping CompanyProfile, HomepageContent, FooterContent intact)
  console.log('Cleaning up existing demo data...');
  await prisma.service.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.media.deleteMany();
  await prisma.activityLog.deleteMany();
  await prisma.user.deleteMany({
    where: {
      email: {
        in: ['admin1@dynasas.com', 'admin2@dynasas.com', 'admin3@dynasas.com']
      }
    }
  });

  // 2. Seed Users
  console.log('Seeding Users...');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  const usersData = [
    { name: 'Admin One', email: 'admin1@dynasas.com', password: hashedPassword, role: 'admin' },
    { name: 'Admin Two', email: 'admin2@dynasas.com', password: hashedPassword, role: 'admin' },
    { name: 'Admin Three', email: 'admin3@dynasas.com', password: hashedPassword, role: 'admin' }
  ];

  for (const user of usersData) {
    await prisma.user.create({ data: user });
  }

  // 3. Seed Services
  console.log('Seeding Services...');
  const servicesData = [
    // Published (7)
    { title: 'AI Surveillance', description: 'Advanced AI-driven surveillance systems.', status: 'published', displayOrder: 1 },
    { title: 'Drone Defense', description: 'Counter-UAS mitigation technology.', status: 'published', displayOrder: 2 },
    { title: 'Cyber Threat Intel', description: 'Real-time threat intelligence.', status: 'published', displayOrder: 3 },
    { title: 'Border Security', description: 'Integrated border monitoring.', status: 'published', displayOrder: 4 },
    { title: 'Secure Comms', description: 'Encrypted communication networks.', status: 'published', displayOrder: 5 },
    { title: 'Autonomous ISR', description: 'Intelligence, Surveillance, and Reconnaissance.', status: 'published', displayOrder: 6 },
    { title: 'Naval Defense', description: 'Maritime security solutions.', status: 'published', displayOrder: 7 },
    // Draft (3)
    { title: 'Space Systems', description: 'Satellite tracking and defense.', status: 'draft', displayOrder: 8 },
    { title: 'Quantum Encryption', description: 'Next-gen secure data storage.', status: 'draft', displayOrder: 9 },
    { title: 'Robotics Infantry', description: 'Automated ground support units.', status: 'draft', displayOrder: 10 },
    // Archived (2)
    { title: 'Legacy Radar Systems', description: 'Older generation radar monitoring.', status: 'archived', displayOrder: 11 },
    { title: 'Analog Comms', description: 'Discontinued radio systems.', status: 'archived', displayOrder: 12 }
  ];

  await prisma.service.createMany({ data: servicesData });

  // 4. Seed Partners
  console.log('Seeding Partners...');
  const partnersData = [
    // Active (5)
    { name: 'Lockheed Martin', category: 'Aerospace', status: 'ACTIVE' },
    { name: 'Northrop Grumman', category: 'Defense Technology', status: 'ACTIVE' },
    { name: 'BAE Systems', category: 'Engineering', status: 'ACTIVE' },
    { name: 'Raytheon Technologies', category: 'Intelligence', status: 'ACTIVE' },
    { name: 'General Dynamics', category: 'Marine Systems', status: 'ACTIVE' },
    // Inactive (3)
    { name: 'Defunct Tech Solutions', category: 'Cybersecurity', status: 'INACTIVE' },
    { name: 'Old Guard Logistics', category: 'Logistics', status: 'INACTIVE' },
    { name: 'Retro Arms', category: 'Manufacturing', status: 'INACTIVE' }
  ];

  await prisma.partner.createMany({ data: partnersData });

  // 5. Seed Inquiries
  console.log('Seeding Inquiries...');
  const inquiriesData = [];
  for (let i = 1; i <= 20; i++) {
    let status = 'NEW';
    if (i % 3 === 0) status = 'IN_PROGRESS';
    if (i % 4 === 0) status = 'CLOSED';

    inquiriesData.push({
      fullName: `Contact Person ${i}`,
      email: `contact${i}@example.com`,
      organization: `Organization ${i}`,
      subject: `Inquiry regarding Service ${i}`,
      message: `This is a detailed message for inquiry ${i}.`,
      status: status
    });
  }

  await prisma.inquiry.createMany({ data: inquiriesData });

  // 6. Seed Media
  console.log('Seeding Media...');
  const mediaData = [
    { fileName: 'demo-hero.jpg', originalName: 'hero.jpg', fileUrl: 'https://placehold.co/800x600.jpg', fileType: 'image/jpeg', size: 1048576 }, // 1 MB
    { fileName: 'product-shot.png', originalName: 'product.png', fileUrl: 'https://placehold.co/400x400.png', fileType: 'image/png', size: 2097152 }, // 2 MB
    { fileName: 'team-photo.jpeg', originalName: 'team.jpeg', fileUrl: 'https://placehold.co/600x400.jpeg', fileType: 'image/jpeg', size: 1572864 }, // 1.5 MB
    { fileName: 'defense-expo.png', originalName: 'expo.png', fileUrl: 'https://placehold.co/800x800.png', fileType: 'image/png', size: 3145728 }, // 3 MB
    { fileName: 'promo-video.mp4', originalName: 'promo.mp4', fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', fileType: 'video/mp4', size: 26214400 }, // 25 MB
    { fileName: 'demo-reel.mp4', originalName: 'reel.mp4', fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', fileType: 'video/mp4', size: 52428800 }, // 50 MB
    { fileName: 'presentation.pdf', originalName: 'pres.pdf', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', fileType: 'application/pdf', size: 524288 }, // 500 KB
    { fileName: 'whitepaper.pdf', originalName: 'wp.pdf', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', fileType: 'application/pdf', size: 1048576 }, // 1 MB
    { fileName: 'contract-template.pdf', originalName: 'contract.pdf', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', fileType: 'application/pdf', size: 204800 }, // 200 KB
    { fileName: 'infographic.png', originalName: 'info.png', fileUrl: 'https://placehold.co/800x1200.png', fileType: 'image/png', size: 4194304 }, // 4 MB
    { fileName: 'tutorial.mp4', originalName: 'tutorial.mp4', fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', fileType: 'video/mp4', size: 15728640 }, // 15 MB
    { fileName: '3d-drone-model.glb', originalName: 'drone.glb', fileUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', fileType: 'model/gltf-binary', size: 8388608 }, // 8 MB
  ];

  await prisma.media.createMany({ data: mediaData });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
