export const toolsData = [
  {
    id: 'linkedin',
    title: 'LinkedIn Hook & Post Crafter',
    tagline: 'Generate top 1% viral hooks & formatted posts to blow up your impressions.',
    badge: 'Popular',
    icon: 'Share2',
    color: 'from-blue-500 to-indigo-600',
    inputs: [
      { id: 'topic', label: 'Topic or Core Message', type: 'text', placeholder: 'e.g. How I built a 100% free tool to 10k users without spending $1 on ads' },
      { id: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g. Founders, Marketers, Creators, Freelancers' },
      { id: 'tone', label: 'Tone of Voice', type: 'select', options: ['Storytelling / Authentic', 'Bold & Controversial', 'Actionable Step-by-Step', 'Data-Driven / Analytical'] }
    ]
  },
  {
    id: 'youtube',
    title: 'YouTube Script & Outline Builder',
    tagline: 'Hook viewers in the first 5 seconds and maximize viewer retention.',
    badge: 'High Engagement',
    icon: 'Video',
    color: 'from-red-500 to-rose-600',
    inputs: [
      { id: 'topic', label: 'Video Title / Topic', type: 'text', placeholder: 'e.g. 5 AI tools that will replace your entire marketing team in 2026' },
      { id: 'length', label: 'Target Video Length', type: 'select', options: ['Shorts / Reels (< 60s)', 'Standard Video (5-10 mins)', 'Deep Dive (15+ mins)'] },
      { id: 'cta', label: 'Desired Call-to-Action', type: 'text', placeholder: 'e.g. Subscribe, Check link in description, Download free template' }
    ]
  },
  {
    id: 'twitter',
    title: 'Twitter / X Thread Engine',
    tagline: 'Transform any idea into a punchy, highly retweetable 5-tweet thread.',
    badge: 'Viral Boost',
    icon: 'MessageSquare',
    color: 'from-cyan-400 to-blue-500',
    inputs: [
      { id: 'topic', label: 'Thread Subject', type: 'text', placeholder: 'e.g. 7 psychological triggers that make people buy software immediately' },
      { id: 'style', label: 'Thread Format', type: 'select', options: ['Listicle / Breakdown', 'Story / Case Study', 'Mistakes vs Fixes', 'Framework / Roadmap'] }
    ]
  },
  {
    id: 'seo',
    title: 'SEO Title & Meta Description Optimizer',
    tagline: 'Rank higher on Google and rank in Google AI Search Overviews.',
    badge: 'Google Rank 1',
    icon: 'Search',
    color: 'from-emerald-400 to-teal-600',
    inputs: [
      { id: 'topic', label: 'Page Topic / Main Keyword', type: 'text', placeholder: 'e.g. Free AI marketing tools for solopreneurs' },
      { id: 'intent', label: 'Search Intent', type: 'select', options: ['Informational (How-to / Guide)', 'Transactional (Tool / Software)', 'Comparative (X vs Y)', 'List / Roundup'] }
    ]
  },
  {
    id: 'email',
    title: 'Cold Email Opener & Subject Scorer',
    tagline: 'Skyrocket your open rates & land warm replies from high-value prospects.',
    badge: '80%+ Open Rate',
    icon: 'Mail',
    color: 'from-amber-400 to-orange-500',
    inputs: [
      { id: 'offer', label: 'Your Offer / Service', type: 'text', placeholder: 'e.g. Free SEO website audit that reveals 3 hidden conversion leaks' },
      { id: 'target', label: 'Target Recipient Role', type: 'text', placeholder: 'e.g. Marketing Director, CMO, Agency Owner' },
      { id: 'angle', label: 'Hook Angle', type: 'select', options: ['Curiosity / Pattern Interrupt', 'Case Study / Specific Results', 'Direct Value / Free Gift', 'Observation / Audit'] }
    ]
  }
];
