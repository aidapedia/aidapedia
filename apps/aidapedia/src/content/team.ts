// From the creator's own LinkedIn profile. Update it there first, then here.
export const PROFILE = {
  name: 'Kurniaji Gunawan',
  initials: 'KG',
  role: 'Software Engineer | Go',
  location: 'Yogyakarta, Indonesia',
  education: 'Universitas Islam Indonesia',
  skills: ['Go', 'Redis', 'PHP', 'Java', 'Project Management', 'Public Speaking', 'Leadership'],
}

export type Experience = {
  company: string
  location?: string
  roles: { title: string; type?: string; period: string }[]
  highlights: string[]
}

export const EXPERIENCE: Experience[] = [
  {
    company: 'ByteDance',
    roles: [{ title: 'Software Engineer', type: 'Full-time', period: 'Feb 2024 - Aug 2026 · 2 yrs 7 mos' }],
    highlights: [
      'Migrated 2 promotion services (HTTP, RPC, MQ and Cron) from Google Cloud Platform to ByteDance Cloud Platform, covering system design, re-architecture, regression testing and load testing.',
      'Drove 100% tech standardization of client connections (RPC and HTTP) across all Digital Goods B2C services.',
      'Designed and implemented Digital tNPS on the ByteDance Survey Platform, achieving 97.5% user satisfaction and unlocking continuous feedback loops.',
    ],
  },
  {
    company: 'Tokopedia',
    location: 'Yogyakarta, Indonesia',
    roles: [{ title: 'Software Engineer', type: 'Full-time', period: 'Apr 2021 - Feb 2024 · 2 yrs 11 mos' }],
    highlights: [
      'Promotion Platform: contributed to the Unified Internal Dashboard, maintained seller vouchers before and after the Shop integration with TikTok Shop, and implemented gratification vouchers by user type.',
      'Digital Goods B2B2C Platform: improved partner integration and delivered Operator Excellence features that reduced technical support work.',
      'Tokopedia Print: designed and implemented product navigation so customers could find the service more easily.',
      'Helped build uptime monitoring on all Digital Platform servers.',
    ],
  },
  {
    company: 'Qatros',
    location: 'Sleman Regency, Yogyakarta, Indonesia',
    roles: [
      { title: 'Junior Backend Engineer', type: 'Contract', period: 'Sep 2020 - Mar 2021 · 7 mos' },
      { title: 'Junior Backend Engineer', type: 'Internship', period: 'Jul 2020 - Sep 2020 · 3 mos' },
    ],
    highlights: [
      'Online shopping: integrated a payment gateway and logistics tracking, and built stock handling across warehouses.',
      'Built a scenario history audit trail for a manual-testing debugging product.',
    ],
  },
  {
    company: 'PT. Folarium Innotek Indonesia',
    location: 'Sleman Regency, Yogyakarta, Indonesia',
    roles: [{ title: 'Web Developer', type: 'Internship', period: 'Nov 2018 - Mar 2019 · 5 mos' }],
    highlights: ['Developed People Directorate features for an ERP system, such as leave and insurance reimbursement.'],
  },
  {
    company: 'Universitas Islam Indonesia',
    location: 'Yogyakarta, Indonesia',
    roles: [
      { title: 'Laboratory Assistant', period: 'Dec 2017 - Nov 2018 · 1 yr' },
      { title: 'Assistant Lecturer', period: 'Dec 2017 - Jul 2018 · 8 mos' },
    ],
    highlights: ['Assisted Data Structure and Object Oriented Programming courses.'],
  },
]
