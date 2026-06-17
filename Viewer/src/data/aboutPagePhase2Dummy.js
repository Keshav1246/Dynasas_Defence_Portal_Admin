import { Calendar, Award, Target, Crosshair, Globe } from 'lucide-react';

export const PHASE_2_DUMMY_DATA = {
  journey: {
    label: "OUR JOURNEY",
    heading: "A Legacy of Innovation and Commitment",
    description: "From our founding to becoming a global defense technology leader, our journey is defined by innovation, strategic partnerships, and mission success.",
    achievement: "25+ Years of excellence in delivering mission-critical defense solutions worldwide.",
    milestones: [
      {
        year: "1998",
        title: "Founded",
        description: "Dynasoft was founded with a vision to revolutionize defense technology.",
        icon: Calendar
      },
      {
        year: "2005",
        title: "First Defense Contract",
        description: "Secured our first major defense contract, marking the beginning of our mission-driven journey.",
        icon: Award
      },
      {
        year: "2012",
        title: "AI & Surveillance Division",
        description: "Expanded into AI-powered surveillance and autonomous reconnaissance systems.",
        icon: Target
      },
      {
        year: "2018",
        title: "Command & Control Expansion",
        description: "Launched advanced C2 platforms and strategic partnerships globally.",
        icon: Crosshair
      },
      {
        year: "2024+",
        title: "Global Defense Operations",
        description: "Delivering next-generation solutions across 40+ countries with continuing innovation.",
        icon: Globe
      }
    ],
    values: ["INNOVATION", "RELIABILITY", "SECURITY", "PARTNERSHIP"]
  },
  impact: {
    label: "OUR IMPACT",
    heading: "Delivering Impact",
    headingHighlight: "Across the Globe",
    description: "Our commitment to excellence and innovation is reflected in the trust of governments and defense organizations worldwide.",
    trustBadge: "Trusted. Proven. Mission-Ready.",
    statistics: [
      {
        value: "25+",
        title: "Years of Experience",
        description: "Over two decades of delivering innovative defense solutions worldwide."
      },
      {
        value: "500+",
        title: "Projects Delivered",
        description: "Successful delivery of mission-critical projects across diverse domains."
      },
      {
        value: "40+",
        title: "Countries Served",
        description: "Trusted by defense forces and organizations in over 40 countries."
      },
      {
        value: "2000+",
        title: "Operational Deployments",
        description: "Field-proven solutions deployed in real-world mission environments."
      }
    ]
  }
};
