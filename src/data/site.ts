// Single source of truth for identity/contact info.
// Replace the placeholders below with your real details before publishing.
export const site = {
  handle: 'KESTREL',
  tagline: 'Finding signal in the noise.',
  positioning:
    'Offense-side recon. Defense-side detection. Full-stack investigation tooling. Built and operated end-to-end on self-hosted infrastructure.',
  bio: `I build and break things on the same network. Most weeks that means writing
    automation that maps an attack surface, tuning a SIEM until it actually catches
    what I threw at it the day before, or shipping a small tool because the existing
    ones didn't talk to each other. I care more about whether a detection fires than
    whether a slide deck says it should.`,
  email: 'you@example.com',
  github: 'https://github.com/yourhandle',
  linkedin: 'https://linkedin.com/in/yourhandle',
  resumeHref: '/resume.pdf',
  capabilities: [
    {
      label: 'Offense',
      items: ['Recon automation', 'Attack-surface mapping', 'Bug bounty tooling'],
    },
    {
      label: 'Defense',
      items: ['Detection engineering', 'SIEM tuning', 'ATT&CK-mapped validation'],
    },
    {
      label: 'Investigation',
      items: ['OSINT tooling', 'Correlation & enrichment', 'Open-source intel sources'],
    },
    {
      label: 'Infrastructure',
      items: ['Network segmentation', 'Self-hosted platforms', 'Backup & recovery'],
    },
  ],
};
