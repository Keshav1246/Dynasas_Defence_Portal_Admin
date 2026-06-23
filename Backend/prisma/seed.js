require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🚀 Starting Production Seed...');

  // =====================================================
  // CLEANUP
  // =====================================================

  console.log('🧹 Cleaning database...');

  await prisma.companyStatistic.deleteMany();
  await prisma.missionPillar.deleteMany();

  await prisma.userInvitation.deleteMany();
  await prisma.inquiry.deleteMany();

  await prisma.activityLog.deleteMany();
  await prisma.media.deleteMany();
  await prisma.partner.deleteMany();

  await prisma.homepageContent.deleteMany();
  await prisma.footerContent.deleteMany();

  await prisma.service.deleteMany();
  await prisma.websiteAnalytics.deleteMany();

  await prisma.rolePermissions.deleteMany();
  await prisma.settings.deleteMany();

  await prisma.companyProfile.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Database cleaned');

  // =====================================================
  // PASSWORDS
  // =====================================================

  const hashedPassword = await bcrypt.hash(
    'Admin@123',
    10
  );

  // =====================================================
  // USERS
  // =====================================================

  console.log('👤 Creating users...');

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Super Administrator',
        email: 'superadmin@dynasas.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
        lastLogin: new Date(),
      },
    }),

    prisma.user.create({
      data: {
        name: 'Operations Admin',
        email: 'admin@dynasas.com',
        password: hashedPassword,
        role: 'ADMIN',
        status: 'ACTIVE',
        lastLogin: new Date(
          Date.now() - 2 * 60 * 60 * 1000
        ),
      },
    }),

    prisma.user.create({
      data: {
        name: 'Content Manager',
        email: 'content@dynasas.com',
        password: hashedPassword,
        role: 'CONTENT_MANAGER',
        status: 'ACTIVE',
        lastLogin: new Date(
          Date.now() - 24 * 60 * 60 * 1000
        ),
      },
    }),

    prisma.user.create({
      data: {
        name: 'Viewer Account',
        email: 'viewer@dynasas.com',
        password: hashedPassword,
        role: 'VIEWER',
        status: 'INACTIVE',
        lastLogin: new Date(
          Date.now() - 15 * 24 * 60 * 60 * 1000
        ),
      },
    }),
  ]);

  const superAdmin = users[0];
  const admin = users[1];
  const contentManager = users[2];
  const viewer = users[3];

  console.log('✅ Users created');

  // =====================================================
  // ROLE PERMISSIONS
  // =====================================================

  console.log('🔐 Creating role permissions...');

  await prisma.rolePermissions.createMany({
    data: [
      {
        role: 'SUPER_ADMIN',

        dashboardAccess: true,
        homepageManage: true,

        servicesView: true,
        servicesEdit: true,
        servicesDelete: true,

        mediaUpload: true,
        mediaDelete: true,

        inquiriesView: true,
        inquiriesManage: true,

        partnersManage: true,

        analyticsView: true,
      },

      {
        role: 'ADMIN',

        dashboardAccess: true,
        homepageManage: true,

        servicesView: true,
        servicesEdit: true,
        servicesDelete: false,

        mediaUpload: true,
        mediaDelete: true,

        inquiriesView: true,
        inquiriesManage: true,

        partnersManage: true,

        analyticsView: true,
      },

      {
        role: 'CONTENT_MANAGER',

        dashboardAccess: true,
        homepageManage: true,

        servicesView: true,
        servicesEdit: true,
        servicesDelete: false,

        mediaUpload: true,
        mediaDelete: false,

        inquiriesView: true,
        inquiriesManage: false,

        partnersManage: false,

        analyticsView: true,
      },

      {
        role: 'VIEWER',

        dashboardAccess: true,
        homepageManage: false,

        servicesView: true,
        servicesEdit: false,
        servicesDelete: false,

        mediaUpload: false,
        mediaDelete: false,

        inquiriesView: true,
        inquiriesManage: false,

        partnersManage: false,

        analyticsView: true,
      },
    ],
  });

  console.log('✅ Role permissions created');

  // =====================================================
  // SETTINGS
  // =====================================================

  console.log('⚙️ Creating settings...');

  await prisma.settings.create({
    data: {
      primaryColor: '#004C97',
      accentColor: '#F3A900',
      backgroundDark: '#121212',
      textColor: '#333333',

      primaryLogo:
        'https://res.cloudinary.com/demo/image/upload/logo-primary.png',

      darkLogo:
        'https://res.cloudinary.com/demo/image/upload/logo-dark.png',

      favicon:
        'https://res.cloudinary.com/demo/image/upload/favicon.ico',

      headingFont: 'Inter',
      bodyFont: 'Roboto',

      linkedinUrl:
        'https://linkedin.com/company/dynasas',

      twitterUrl:
        'https://twitter.com/dynasas',

      youtubeUrl:
        'https://youtube.com/@dynasas',

      facebookUrl:
        'https://facebook.com/dynasas',

      instagramUrl:
        'https://instagram.com/dynasas',

      portalName:
        'Dynasas Defence Portal',

      siteName:
        'Dynasas Defence Technologies',

      siteDescription:
        'Advanced defence, aerospace, cybersecurity and tactical solutions.',

      supportEmail:
        'support@dynasas.com',

      supportPhone:
        '+91-11-23456789',

      defaultLanguage: 'English',
      timezone: 'Asia/Kolkata',

      maintenanceMode: false,
    },
  });

  console.log('✅ Settings created');

  // =====================================================
  // COMPANY PROFILE
  // =====================================================

  console.log('🏢 Creating company profile...');

  const companyProfile =
    await prisma.companyProfile.create({
      data: {
        companyName:
          'Dynasas Defence Technologies',

        overview:
          'Dynasas Defence Technologies is a leading provider of advanced defence systems, aerospace engineering, cybersecurity platforms, tactical communications, surveillance systems and strategic military solutions.',

        foundedYear: '2010',

        headquarters:
          'New Delhi, India',

        registrationNumber:
          'DYN-DEF-2010-938274',

        logo:
          'https://res.cloudinary.com/demo/image/upload/company-logo.png',

        missionTitle:
          'Protect Nations Through Innovation',

        missionStatement:
          'Deliver world-class defence technologies that enhance national security and operational readiness.',

        visionTitle:
          'Global Leadership in Defence Innovation',

        visionStatement:
          'To become one of the most trusted defence technology partners worldwide.',

        longTermGoals:
          'Expand into aerospace autonomy, satellite intelligence systems, AI-assisted battlefield operations and advanced cybersecurity by 2035.',

        generalEmail:
          'info@dynasas.com',

        securityEmail:
          'security@dynasas.com',

        hrEmail: 'hr@dynasas.com',
        enquiryEmail: 'enquiry@dynasas.com',
        partnersEmail: 'partners@dynasas.com',
        technicalEmail: 'technical@dynasas.com',

        mainPhone:
          '+91-11-23456789',

        defenseContractsPhone:
          '+91-11-99887766',

        mailingAddress:
          'Defence Technology Park, Sector 18, Gurugram, Haryana 122015, India',

        city: 'Gurugram',
        state: 'Haryana',
        country: 'India',
        postalCode: '122015',
        fullAddress: 'Defence Technology Park, Sector 18, Gurugram, Haryana 122015, India',

        website:
          'https://www.dynasas.com',
      },
    });

  console.log('✅ Company profile created');

  // =====================================================
  // COMPANY STATISTICS
  // =====================================================

  console.log('📊 Creating company statistics...');

  await prisma.companyStatistic.createMany({
    data: [
      {
        label: 'Countries Served',
        value: '25+',
        displayOrder: 1,
        companyProfileId: companyProfile.id,
      },

      {
        label: 'Defence Contracts',
        value: '180+',
        displayOrder: 2,
        companyProfileId: companyProfile.id,
      },

      {
        label: 'R&D Specialists',
        value: '450+',
        displayOrder: 3,
        companyProfileId: companyProfile.id,
      },

      {
        label: 'Global Partners',
        value: '60+',
        displayOrder: 4,
        companyProfileId: companyProfile.id,
      },

      {
        label: 'Years of Innovation',
        value: '15',
        displayOrder: 5,
        companyProfileId: companyProfile.id,
      },
    ],
  });

  console.log('✅ Statistics created');

  // =====================================================
  // MISSION PILLARS
  // =====================================================

  await prisma.missionPillar.createMany({
    data: [
      {
        text: 'Innovation Driven Defence Engineering',
        displayOrder: 1,
        companyProfileId: companyProfile.id,
      },

      {
        text: 'Operational Excellence',
        displayOrder: 2,
        companyProfileId: companyProfile.id,
      },

      {
        text: 'Cybersecurity First Strategy',
        displayOrder: 3,
        companyProfileId: companyProfile.id,
      },

      {
        text: 'Strategic Global Partnerships',
        displayOrder: 4,
        companyProfileId: companyProfile.id,
      },

      {
        text: 'Sustainable Defence Development',
        displayOrder: 5,
        companyProfileId: companyProfile.id,
      },
    ],
  });

  console.log('✅ Mission pillars created');

  // =====================================================
  // PART 2 STARTS HERE
  // =====================================================

  // =====================================================
  // HOMEPAGE CONTENT
  // =====================================================

  console.log('🏠 Creating homepage content...');

  await prisma.homepageContent.create({
    data: {
      heroTitle:
        'Defending Tomorrow. Securing Today.',

      heroSubtitle:
        'DYNASAS • DEFENSE TECHNOLOGY',

      heroDescription:
        'Advanced defence technologies, cybersecurity platforms, aerospace systems and strategic solutions engineered for modern security challenges.',

      ctaText:
        'Explore Solutions',

      ctaLink:
        '/services',

      heroImage:
        'https://res.cloudinary.com/demo/image/upload/hero-defense.jpg',

      secondaryCtaText:
        'Contact Our Team',

      secondaryCtaLink:
        '/contact',

      servicesSectionTitle: "Core Capabilities",
      servicesSectionDescription: "Delivering unmatched operational advantage through integrated defense technologies, AI-driven analytics, and secure communication networks.",
      statisticsSectionTitle: "By the Numbers",
      trustBarItems: [
        "TRUSTED BY GLOBAL ALLIES",
        "ISO 9001 CERTIFIED",
        "DEFENSE COMPLIANT",
        "MIL-SPEC APPROVED"
      ],

      sectionOrder: [
        'hero',
        'services',
        'statistics',
      ],
    },
  });

  console.log('✅ Homepage content created');

  // =====================================================
  // FOOTER CONTENT
  // =====================================================

  console.log('📄 Creating footer content...');

  await prisma.footerContent.create({
    data: {
      address:
        'Defence Technology Park, Sector 18, Gurugram, Haryana 122015, India',

      city: 'Gurugram',
      state: 'Haryana',
      country: 'India',
      postalCode: '122015',
      fullAddress: 'Defence Technology Park, Sector 18, Gurugram, Haryana 122015, India',

      phone:
        '+91-11-23456789',

      email:
        'contact@dynasas.com',

      footerTagline:
        'Engineering Security Through Innovation',

      footerDescription:
        'Dynasas Defence Technologies delivers cutting-edge defence, aerospace, surveillance and cybersecurity solutions worldwide.',

      companyLinks: [
        'About Us',
        'Leadership',
        'Careers',
        'News',
        'Contact',
      ],

      solutionLinks: [
        'Cyber Defense',
        'Aerospace Systems',
        'Surveillance',
        'Tactical Communications',
        'Intelligence Platforms',
      ],

      resourceLinks: [
        'Whitepapers',
        'Case Studies',
        'Research',
        'Documentation',
        'Media Kit',
      ],

      legalLinks: [
        'Privacy Policy',
        'Terms of Service',
        'Cookie Policy',
        'Compliance',
      ],
    },
  });

  console.log('✅ Footer content created');

  // =====================================================
  // SERVICES
  // =====================================================

  console.log('🛠 Creating services...');

  const services = [
    {
      title: 'Cyber Defense Platform',
      description: 'Advanced military-grade cybersecurity protection.',
      status: 'published',
    },
    {
      title: 'Threat Intelligence Suite',
      description: 'Real-time cyber threat monitoring and analysis.',
      status: 'published',
    },
    {
      title: 'Aerospace Engineering',
      description: 'Autonomous aerial systems and drone technologies.',
      status: 'published',
    },
    {
      title: 'Tactical Communications',
      description: 'Secure battlefield communication networks.',
      status: 'published',
    },
    {
      title: 'Command & Control Systems',
      description: 'Integrated operational management platforms.',
      status: 'published',
    },
    {
      title: 'Border Surveillance Solutions',
      description: 'Intelligent monitoring and intrusion detection.',
      status: 'published',
    },
    {
      title: 'Electronic Warfare Systems',
      description: 'Signal intelligence and disruption technologies.',
      status: 'published',
    },
    {
      title: 'AI Battlefield Analytics',
      description: 'Artificial intelligence powered defence insights.',
      status: 'published',
    },

    {
      title: 'Naval Defense Integration',
      description: 'Maritime defence coordination systems.',
      status: 'draft',
    },
    {
      title: 'Satellite Reconnaissance',
      description: 'Space-based intelligence platforms.',
      status: 'draft',
    },
    {
      title: 'Autonomous Ground Vehicles',
      description: 'AI-enabled tactical mobility systems.',
      status: 'draft',
    },
    {
      title: 'Secure Military Cloud',
      description: 'Private defence cloud infrastructure.',
      status: 'draft',
    },

    {
      title: 'Legacy Radar Modernization',
      description: 'Historical modernization initiative.',
      status: 'archived',
    },
    {
      title: 'Tactical Wearables Program',
      description: 'Archived battlefield wearable systems.',
      status: 'archived',
    },
    {
      title: 'Defense Mobility Pilot',
      description: 'Completed pilot modernization project.',
      status: 'archived',
    },
  ];

  await prisma.service.createMany({
    data: services.map((service, index) => ({
      ...service,
      image:
        `https://res.cloudinary.com/demo/image/upload/service-${index + 1}.jpg`,
      displayOrder: index + 1,
    })),
  });

  console.log('✅ Services created');

  // =====================================================
  // PARTNERS
  // =====================================================

  console.log('🤝 Creating partners...');

  await prisma.partner.createMany({
    data: [
      {
        name: 'TechSecure Global',
        category: 'Cybersecurity',
        status: 'ACTIVE',
        website: 'https://example.com',
        description: 'Strategic cybersecurity partner.',
      },

      {
        name: 'AeroVision Systems',
        category: 'Aerospace',
        status: 'ACTIVE',
        website: 'https://example.com',
        description: 'Aerospace innovation partner.',
      },

      {
        name: 'DefCom Networks',
        category: 'Communications',
        status: 'ACTIVE',
        website: 'https://example.com',
        description: 'Military communication technologies.',
      },

      {
        name: 'Sentinel Dynamics',
        category: 'Surveillance',
        status: 'ACTIVE',
        website: 'https://example.com',
        description: 'Surveillance and monitoring solutions.',
      },

      {
        name: 'Global Strategic Labs',
        category: 'Research',
        status: 'ACTIVE',
        website: 'https://example.com',
        description: 'Joint defence research initiatives.',
      },

      {
        name: 'Quantum Shield',
        category: 'Cybersecurity',
        status: 'ACTIVE',
      },

      {
        name: 'Titan Defense Manufacturing',
        category: 'Manufacturing',
        status: 'ACTIVE',
      },

      {
        name: 'SkyForce Technologies',
        category: 'Aerospace',
        status: 'ACTIVE',
      },

      {
        name: 'Legacy Military Systems',
        category: 'Manufacturing',
        status: 'INACTIVE',
      },

      {
        name: 'Arctic Defense Group',
        category: 'Research',
        status: 'INACTIVE',
      },

      {
        name: 'NavCom International',
        category: 'Communications',
        status: 'INACTIVE',
      },

      {
        name: 'Historical Systems Ltd',
        category: 'Manufacturing',
        status: 'INACTIVE',
      },
    ],
  });

  console.log('✅ Partners created');

  // =====================================================
  // MEDIA LIBRARY
  // =====================================================

  console.log('🖼 Creating media library...');

  await prisma.media.createMany({
    data: [
      {
        fileName: 'annual-report-2025.pdf',
        originalName: 'Annual_Report_2025.pdf',
        fileUrl: 'https://example.com/media/annual-report-2025.pdf',
        fileType: 'application/pdf',
        size: 4200000,
      },

      {
        fileName: 'cyber-defense-whitepaper.pdf',
        originalName: 'Cyber_Defense_Whitepaper.pdf',
        fileUrl: 'https://example.com/media/cyber-defense.pdf',
        fileType: 'application/pdf',
        size: 2500000,
      },

      {
        fileName: 'defense-brochure.pdf',
        originalName: 'Dynasas_Brochure.pdf',
        fileUrl: 'https://example.com/media/brochure.pdf',
        fileType: 'application/pdf',
        size: 1800000,
      },

      {
        fileName: 'service-catalog.docx',
        originalName: 'Service_Catalog.docx',
        fileUrl: 'https://example.com/media/catalog.docx',
        fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: 1200000,
      },

      {
        fileName: 'quarterly-analysis.xlsx',
        originalName: 'Quarterly_Analysis.xlsx',
        fileUrl: 'https://example.com/media/analysis.xlsx',
        fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: 980000,
      },

      {
        fileName: 'company-logo.png',
        originalName: 'Company_Logo.png',
        fileUrl: 'https://example.com/media/logo.png',
        fileType: 'image/png',
        size: 320000,
      },

      {
        fileName: 'hero-banner.jpg',
        originalName: 'Hero_Banner.jpg',
        fileUrl: 'https://example.com/media/banner.jpg',
        fileType: 'image/jpeg',
        size: 850000,
      },

      {
        fileName: 'drone-system.jpg',
        originalName: 'Drone_System.jpg',
        fileUrl: 'https://example.com/media/drone.jpg',
        fileType: 'image/jpeg',
        size: 790000,
      },

      {
        fileName: 'surveillance-platform.jpg',
        originalName: 'Surveillance.jpg',
        fileUrl: 'https://example.com/media/surveillance.jpg',
        fileType: 'image/jpeg',
        size: 760000,
      },

      {
        fileName: 'satellite-network.jpg',
        originalName: 'Satellite.jpg',
        fileUrl: 'https://example.com/media/satellite.jpg',
        fileType: 'image/jpeg',
        size: 830000,
      },

      {
        fileName: 'command-center.jpg',
        originalName: 'Command_Center.jpg',
        fileUrl: 'https://example.com/media/command.jpg',
        fileType: 'image/jpeg',
        size: 810000,
      },

      {
        fileName: 'corporate-video.mp4',
        originalName: 'Corporate_Video.mp4',
        fileUrl: 'https://example.com/media/video.mp4',
        fileType: 'video/mp4',
        size: 25800000,
      },

      {
        fileName: 'training-video.mp4',
        originalName: 'Training.mp4',
        fileUrl: 'https://example.com/media/training.mp4',
        fileType: 'video/mp4',
        size: 18700000,
      },

      {
        fileName: 'security-guide.pdf',
        originalName: 'Security_Guide.pdf',
        fileUrl: 'https://example.com/media/security-guide.pdf',
        fileType: 'application/pdf',
        size: 2100000,
      },

      {
        fileName: 'product-sheet.pdf',
        originalName: 'Product_Sheet.pdf',
        fileUrl: 'https://example.com/media/product-sheet.pdf',
        fileType: 'application/pdf',
        size: 1100000,
      },
    ],
  });

  console.log('✅ Media created');

  // =====================================================
  // PART 3 STARTS HERE
  // =====================================================

  // =====================================================
  // INQUIRIES
  // =====================================================

  console.log('📨 Creating inquiries...');

  const inquiries = await Promise.all([
    prisma.inquiry.create({
      data: {
        fullName: 'John Smith',
        email: 'john.smith@military.gov',
        phone: '+1-555-1001',
        organization: 'National Defense Agency',
        subject: 'Cybersecurity Consultation',
        message: 'Need assessment for military network security.',
        inquiryType: 'CONTACT',
        status: 'NEW',
      },
    }),

    prisma.inquiry.create({
      data: {
        fullName: 'Sarah Johnson',
        email: 'sarah@aerospacecorp.com',
        phone: '+1-555-1002',
        organization: 'Aerospace Corp',
        subject: 'Drone Demonstration',
        message: 'Requesting live drone demonstration.',
        inquiryType: 'DEMO_REQUEST',
        status: 'NEW',
      },
    }),

    prisma.inquiry.create({
      data: {
        fullName: 'Michael Chen',
        email: 'mchen@govagency.org',
        organization: 'Government Procurement Office',
        subject: 'Request for Quotation',
        message: 'Need quotation for surveillance systems.',
        inquiryType: 'QUOTE',
        status: 'NEW',
      },
    }),

    prisma.inquiry.create({
      data: {
        fullName: 'Emily Brown',
        email: 'ebrown@security.com',
        organization: 'Global Security Ltd',
        subject: 'Security Platform Review',
        message: 'Interested in platform capabilities.',
        inquiryType: 'CONTACT',
        status: 'IN_PROGRESS',
      },
    }),

    prisma.inquiry.create({
      data: {
        fullName: 'Robert Davis',
        email: 'rdavis@naval.gov',
        organization: 'Naval Command',
        subject: 'Maritime Defense System',
        message: 'Seeking maritime defense proposal.',
        inquiryType: 'QUOTE',
        status: 'IN_PROGRESS',
        assignedAdminId: admin.id,
      },
    }),

    prisma.inquiry.create({
      data: {
        fullName: 'Lisa Wilson',
        email: 'lisa@airforce.gov',
        organization: 'Air Force Division',
        subject: 'Aerospace Integration',
        message: 'Interested in aerospace integration.',
        inquiryType: 'DEMO_REQUEST',
        status: 'IN_PROGRESS',
        assignedAdminId: contentManager.id,
      },
    }),

    prisma.inquiry.create({
      data: {
        fullName: 'David Lee',
        email: 'dlee@research.org',
        organization: 'Strategic Research Lab',
        subject: 'Research Collaboration',
        message: 'Discuss research opportunities.',
        inquiryType: 'CONTACT',
        status: 'CLOSED',
        assignedAdminId: admin.id,
      },
    }),
  ]);

  const inquiryTypes = [
    'CONTACT',
    'DEMO_REQUEST',
    'QUOTE',
  ];

  const inquiryStatuses = [
    'NEW',
    'IN_PROGRESS',
    'CLOSED',
  ];

  for (let i = 8; i <= 20; i++) {
    await prisma.inquiry.create({
      data: {
        fullName: `Sample User ${i}`,
        email: `user${i}@example.com`,
        phone: `+91-90000000${i}`,
        organization: `Organization ${i}`,
        subject: `Inquiry Subject ${i}`,
        message: `Sample inquiry message ${i}`,
        inquiryType:
          inquiryTypes[i % inquiryTypes.length],
        status:
          inquiryStatuses[i % inquiryStatuses.length],
        assignedAdminId:
          i % 2 === 0 ? admin.id : null,
      },
    });
  }

  console.log('✅ Inquiries created');

  // =====================================================
  // USER INVITATIONS
  // =====================================================

  console.log('✉️ Creating invitations...');

  await prisma.userInvitation.createMany({
    data: [
      {
        email: 'invite1@dynasas.com',
        name: 'Pending Admin',
        role: 'ADMIN',
        invitationToken: crypto.randomBytes(16).toString('hex'),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'PENDING',
        invitedById: superAdmin.id,
      },

      {
        email: 'invite2@dynasas.com',
        name: 'Pending Content Manager',
        role: 'CONTENT_MANAGER',
        invitationToken: crypto.randomBytes(16).toString('hex'),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: 'PENDING',
        invitedById: superAdmin.id,
      },

      {
        email: 'invite3@dynasas.com',
        name: 'Viewer Invite',
        role: 'VIEWER',
        invitationToken: crypto.randomBytes(16).toString('hex'),
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'PENDING',
        invitedById: admin.id,
      },

      {
        email: 'invite4@dynasas.com',
        name: 'Cancelled Invite',
        role: 'ADMIN',
        invitationToken: crypto.randomBytes(16).toString('hex'),
        expiresAt: new Date(),
        status: 'CANCELLED',
        invitedById: superAdmin.id,
      },

      {
        email: 'invite5@dynasas.com',
        name: 'Accepted Invite',
        role: 'CONTENT_MANAGER',
        invitationToken: crypto.randomBytes(16).toString('hex'),
        expiresAt: new Date(),
        status: 'ACCEPTED',
        invitedById: superAdmin.id,
      },
    ],
  });

  for (let i = 6; i <= 10; i++) {
    await prisma.userInvitation.create({
      data: {
        email: `invite${i}@dynasas.com`,
        name: `Invitation User ${i}`,
        role: i % 2 === 0 ? 'VIEWER' : 'ADMIN',
        invitationToken: crypto.randomBytes(16).toString('hex'),
        expiresAt: new Date(
          Date.now() + i * 24 * 60 * 60 * 1000
        ),
        status: 'PENDING',
        invitedById: superAdmin.id,
      },
    });
  }

  console.log('✅ Invitations created');

  // =====================================================
  // WEBSITE ANALYTICS
  // =====================================================

  console.log('📈 Creating analytics...');

  const pages = [
    '/',
    '/services',
    '/contact',
    '/about',
    '/analytics',
    '/company-profile',
  ];

  const analyticsRecords = [];

  for (let i = 1; i <= 150; i++) {
    const daysAgo = Math.floor(Math.random() * 365);

    analyticsRecords.push({
      sessionId: `session-${Math.ceil(i / 3)}`,
      visitorId: `visitor-${Math.ceil(i / 2)}`,
      pagePath: pages[i % pages.length],
      durationSeconds:
        Math.floor(Math.random() * 600) + 20,
      bounced: Math.random() < 0.25,
      createdAt: new Date(
        Date.now() -
        daysAgo * 24 * 60 * 60 * 1000
      ),
    });
  }

  await prisma.websiteAnalytics.createMany({
    data: analyticsRecords,
  });

  console.log('✅ Analytics created');

  // =====================================================
  // ACTIVITY LOGS
  // =====================================================

  console.log('📝 Creating activity logs...');

  const logs = [
    'Created service: Cyber Defense Platform',
    'Created service: Aerospace Engineering',
    'Created service: Tactical Communications',
    'Updated homepage content',
    'Updated footer content',
    'Created company profile',
    'Updated company profile: About Us',
    'Updated company profile: Mission',
    'Updated company profile: Vision',
    'Updated company profile: Contact Information',
    'Created settings',
    'Updated branding settings',
    'Updated social media settings',
    'Updated site settings',
    'Created partner: TechSecure Global',
    'Created partner: AeroVision Systems',
    'Updated partner status',
    'Uploaded media: Annual Report',
    'Uploaded media: Security Guide',
    'Deleted media: Training Video',
    'Created statistic',
    'Updated statistic',
    'Deleted statistic',
    'Created mission pillar',
    'Updated mission pillar',
    'Deleted mission pillar',
    'Assigned inquiry',
    'Updated inquiry status',
    'Invitation sent',
    'System seeded',
  ];

  for (let i = 0; i < logs.length; i++) {
    await prisma.activityLog.create({
      data: {
        action: logs[i],
        entityType: 'System',
        entityId: String(i + 1),
        details: logs[i],
      },
    });
  }

  console.log('✅ Activity logs created');

  // =====================================================
  // FINISHED
  // =====================================================

  console.log('');
  console.log('====================================');
  console.log('✅ DATABASE SEEDED SUCCESSFULLY');
  console.log('====================================');
  console.log('');
  console.log('Users: 4');
  console.log('Permissions: 4');
  console.log('Services: 15');
  console.log('Partners: 12');
  console.log('Media: 15');
  console.log('Inquiries: 20');
  console.log('Invitations: 10');
  console.log('Analytics: 150');
  console.log('Activity Logs: 30');
  console.log('');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
