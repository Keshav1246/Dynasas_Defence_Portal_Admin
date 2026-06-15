const prisma = require('../src/config/prisma');
const crypto = require('crypto');
const uuidv4 = () => crypto.randomUUID();

async function main() {
  console.log('Seeding Database...');

  // --- CLEAR DB ---
  console.log('Clearing old data...');
  await prisma.websiteAnalytics.deleteMany({});
  await prisma.inquiry.deleteMany({});
  await prisma.userInvitation.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.rolePermissions.deleteMany({});

  // --- SEED PERMISSIONS MATRIX ---
  console.log('Seeding Permissions Matrix...');
  const roles = ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER', 'VIEWER'];
  for (const role of roles) {
    await prisma.rolePermissions.create({
      data: {
        role,
        dashboardAccess: true,
        homepageManage: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'].includes(role),
        servicesView: true,
        servicesEdit: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'].includes(role),
        servicesDelete: ['SUPER_ADMIN', 'ADMIN'].includes(role),
        mediaUpload: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'].includes(role),
        mediaDelete: ['SUPER_ADMIN', 'ADMIN'].includes(role),
        inquiriesView: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'].includes(role),
        inquiriesManage: ['SUPER_ADMIN', 'ADMIN'].includes(role),
        partnersManage: ['SUPER_ADMIN', 'ADMIN'].includes(role),
        analyticsView: ['SUPER_ADMIN', 'ADMIN', 'VIEWER'].includes(role),
      }
    });
  }

  // --- SEED ADMIN USERS ---
  console.log('Seeding Admin Users...');
  const bcrypt = require('bcrypt');
  const password = await bcrypt.hash('password123', 10);
  
  await prisma.user.createMany({
    data: [
      {
        name: 'Admin User',
        email: 'admin@dynasoft.com',
        password,
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        name: 'Sarah Williams',
        email: 's.williams@dynasoft.com',
        password,
        role: 'ADMIN',
        status: 'ACTIVE',
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        name: 'Marcus Chen',
        email: 'm.chen@dynasoft.com',
        password,
        role: 'CONTENT_MANAGER',
        status: 'ACTIVE',
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      },
      {
        name: 'Robert Thompson',
        email: 'r.thompson@dynasoft.com',
        password,
        role: 'VIEWER',
        status: 'INACTIVE',
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
      }
    ]
  });

  const superAdmin = await prisma.user.findFirst({ where: { email: 'admin@dynasoft.com' } });

  // --- SEED INVITATIONS ---
  console.log('Seeding Invitations...');
  await prisma.userInvitation.create({
    data: {
      name: 'Elena Rodriguez',
      email: 'e.rodriguez@dynasoft.com',
      role: 'VIEWER',
      invitationToken: crypto.randomBytes(32).toString('hex'),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      invitedById: superAdmin.id,
      status: 'PENDING'
    }
  });

  // --- SEED INQUIRIES (12 MONTHS TREND) ---
  console.log('Generating 12 months of Inquiries...');
  const baseInquiries = [
    { fullName: 'Rajesh Sharma', email: 'r.sharma@drdo.gov.in', organization: 'DRDO', inquiryType: 'CONTACT', status: 'NEW' },
    { fullName: 'Col. Vikram Singh', email: 'v.singh@indianarmy.nic.in', organization: 'Indian Army', inquiryType: 'DEMO_REQUEST', status: 'NEW' },
    { fullName: 'Anita Desai', email: 'adesai@hal-india.co.in', organization: 'HAL', inquiryType: 'QUOTE', status: 'IN_PROGRESS' },
    { fullName: 'Ravi Kumar', email: 'rkumar@bel-india.in', organization: 'BEL', inquiryType: 'CONTACT', status: 'CLOSED' },
    { fullName: 'Sanjay Reddy', email: 'sanjay.reddy@bdl-india.in', organization: 'BDL', inquiryType: 'DEMO_REQUEST', status: 'IN_PROGRESS' },
    { fullName: 'Dr. Meera Iyer', email: 'meera.iyer@isro.gov.in', organization: 'ISRO', inquiryType: 'QUOTE', status: 'CLOSED' },
    { fullName: 'Capt. Aman Verma', email: 'aman.verma@indiannavy.nic.in', organization: 'Indian Navy', inquiryType: 'CONTACT', status: 'NEW' },
    { fullName: 'Priya Patel', email: 'priya.patel@lntecc.com', organization: 'L&T Defence', inquiryType: 'QUOTE', status: 'IN_PROGRESS' },
  ];

  const inquiriesToInsert = [];
  const now = new Date();
  
  // Create a growing trend over the last 12 months (less in past, more recently)
  for (let i = 0; i < 365; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    // Exponential-like probability for growth trend
    const prob = 0.2 + (1 - i / 365) * 0.8; 
    
    // Generate 0-3 inquiries per day based on probability
    const numInquiries = Math.floor(Math.random() * 3 * prob);
    
    for (let j = 0; j < numInquiries; j++) {
      const base = baseInquiries[Math.floor(Math.random() * baseInquiries.length)];
      inquiriesToInsert.push({
        fullName: base.fullName,
        email: base.email,
        phone: '+91-9999999999',
        organization: base.organization,
        subject: `Inquiry regarding ${base.organization} systems`,
        message: 'This is a generated inquiry for analytics testing.',
        inquiryType: base.inquiryType,
        status: base.status,
        createdAt: date,
        updatedAt: date,
      });
    }
  }

  // Insert Inquiries in chunks
  console.log(`Inserting ${inquiriesToInsert.length} Inquiries...`);
  for (let i = 0; i < inquiriesToInsert.length; i += 50) {
    await prisma.inquiry.createMany({
      data: inquiriesToInsert.slice(i, i + 50),
    });
  }

  // --- SEED WEBSITE ANALYTICS (12 MONTHS) ---
  console.log('Generating 12 months of Website Analytics (Traffic)...');
  const analyticsData = [];
  
  // We want nice graphs, e.g., 50-200 sessions per day with a growth trend
  // To avoid inserting a million records, we'll insert a representative sample: ~150 events per day
  for (let i = 0; i < 365; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    // Growth trend logic: More traffic recently, less traffic a year ago
    const baseTraffic = 50 + ((365 - i) / 365) * 150; 
    const randomVariance = Math.random() * 30 - 15; // +/- 15
    let dailySessions = Math.max(10, Math.floor(baseTraffic + randomVariance));
    
    // Add some random spikes to make the graph look realistic
    if (Math.random() > 0.9) dailySessions += 50;

    for (let s = 0; s < dailySessions; s++) {
      const isBounce = Math.random() > 0.65; // ~35% bounce rate
      const durationSeconds = isBounce ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 600 + 60); // Bounces: 0-10s, Normal: 1-10 mins
      
      const sessionEvents = isBounce ? 1 : Math.floor(Math.random() * 4) + 1; // 1 to 4 pageviews per session
      
      const sessionId = uuidv4();
      const visitorId = Math.random() > 0.8 ? uuidv4() : `returning-visitor-${Math.floor(Math.random() * 50)}`; // 20% new, 80% returning

      for (let p = 0; p < sessionEvents; p++) {
        // distribute events randomly throughout the day
        const eventTime = new Date(date.getTime() + Math.random() * 24 * 60 * 60 * 1000);
        
        analyticsData.push({
          sessionId,
          visitorId,
          pagePath: p === 0 ? '/' : ['/about', '/services', '/contact'][Math.floor(Math.random() * 3)],
          durationSeconds: p === 0 ? durationSeconds : 0, // Store total session duration on the first event for simplicity
          bounced: isBounce && p === 0,
          createdAt: eventTime,
        });
      }
    }
  }

  console.log(`Inserting ${analyticsData.length} Website Analytics records... (this may take a few seconds)`);
  // Insert in chunks of 5000
  for (let i = 0; i < analyticsData.length; i += 5000) {
    await prisma.websiteAnalytics.createMany({
      data: analyticsData.slice(i, i + 5000),
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
