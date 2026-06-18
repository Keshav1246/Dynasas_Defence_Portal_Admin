import { DEFAULT_ASSETS } from './assets';

export const DEFAULT_SERVICES = [
  {
    id: 1,
    title: 'Advanced Aerospace Systems',
    description: 'Next-generation avionics and integrated flight systems for manned and autonomous platforms. Delivering unparalleled situational awareness and operational capabilities in contested airspaces.',
    image: DEFAULT_ASSETS.IMAGE_PLACEHOLDER,
    displayOrder: 1,
    features: ['Integrated Avionics', 'Autonomous Navigation', 'Electronic Warfare Suites']
  },
  {
    id: 2,
    title: 'Cyber Defense & Warfare',
    description: 'Offensive and defensive cyber capabilities engineered to protect critical national infrastructure and disrupt adversary networks in real-time.',
    image: DEFAULT_ASSETS.IMAGE_PLACEHOLDER,
    displayOrder: 2,
    features: ['Zero-Trust Architecture', 'Quantum-Resistant Encryption', 'Automated Threat Neutralization']
  },
  {
    id: 3,
    title: 'C4ISR Integration',
    description: 'Command, Control, Communications, Computers, Intelligence, Surveillance, and Reconnaissance systems that provide complete battlefield dominance through multi-domain sensor fusion.',
    image: DEFAULT_ASSETS.IMAGE_PLACEHOLDER,
    displayOrder: 3,
    features: ['Multi-Domain Sensor Fusion', 'Secure Tactical Datalinks', 'Predictive AI Analysis']
  },
  {
    id: 4,
    title: 'Autonomous Land Systems',
    description: 'Unmanned ground vehicles for logistics, reconnaissance, and direct combat support, minimizing human risk while maximizing operational tempo.',
    image: DEFAULT_ASSETS.IMAGE_PLACEHOLDER,
    displayOrder: 4,
    features: ['Swarm Coordination', 'All-Terrain Mobility', 'Modular Payload Integration']
  }
];
