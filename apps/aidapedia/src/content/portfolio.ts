// The homepage is Kurniaji Gunawan's portfolio: who builds Aidapedia, what he built before, and what he builds now.
// Facts come from team.ts (his LinkedIn profile) and Aidapedia's GitHub profile README. Update those first.

export const HERO = {
  name: 'Kurniaji Gunawan',
  kicker: 'Founder of Aidapedia · Yogyakarta, Indonesia',
  lead: 'Software engineer building',
  roles: ['backend systems at scale', 'open-source developer tools', 'self-hosted software', 'Go libraries and SDKs'],
  intro:
    'Six years on promotion and digital-goods platforms at Tokopedia and ByteDance. Now I build Aidapedia, an open-source initiative of practical tools for developers, DevOps engineers and self-hosters.',
}

export type Stat = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }

export const STATS: Stat[] = [
  { value: 6, suffix: '+', label: 'years building production software' },
  { value: 2, label: 'promotion services migrated across clouds' },
  { value: 97.5, decimals: 1, suffix: '%', label: 'user satisfaction on Digital tNPS' },
  { value: 6, label: 'open-source repositories at Aidapedia' },
]

// What he works with: his own skills, and what Aidapedia's projects are built on.
export const STACK = ['Go', 'Redis', 'PostgreSQL', 'MySQL', 'SQLite', 'Kafka', 'TypeScript', 'React', 'Docker', 'PHP', 'Java', 'RouterOS', 'OpenID Connect']
export const PRACTICE = ['System design', 'Cloud migration', 'Load testing', 'RPC and HTTP standards', 'Message queues', 'Project management', 'Public speaking', 'Leadership']

// The hero's terminal types this out, one command at a time.
export const SESSION = [
  { command: 'whoami', output: 'kurniaji gunawan, software engineer (go)' },
  { command: 'cat experience.log', output: 'bytedance → tokopedia → qatros' },
  { command: 'ls ~/aidapedia', output: 'tabletsgo  hayat  gdk  go-routeros  jabberwock' },
  { command: 'echo $MISSION', output: 'useful tools, open to everyone.' },
]
