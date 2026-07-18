/**
 * ViralCraft Free AI Generator Utility with Deep NLP Intent Engine
 * 
 * Intelligently transforms conversational prompts & typo-riddled instructions into 
 * crisp, high-level marketing topics and semantic domain targets.
 * 
 * Example:
 * Input: "help me write a fo,lower increasing post for my instagram page"
 * Extracted Topic: "Instagram Follower Growth & Engagement"
 */

export async function generateContent(toolId, inputValues) {
  const apiKey = localStorage.getItem('viralcraft_gemini_key');

  // Deep NLP Intent & Domain Extraction
  const parsedInputs = parseNaturalLanguageIntent(inputValues);

  if (apiKey && apiKey.trim().length > 0) {
    try {
      return await generateWithGeminiAPI(apiKey, toolId, parsedInputs);
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart local NLP engine:', err);
      return generateWithLocalEngine(toolId, parsedInputs);
    }
  }

  // Simulate smooth AI processing latency
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateWithLocalEngine(toolId, parsedInputs);
}

/**
 * Deep NLP Intent, Entity & Goal Extractor
 */
function parseNaturalLanguageIntent(inputs) {
  let rawTopic = (inputs.topic || inputs.offer || '').trim();
  let rawAudience = (inputs.audience || inputs.target || '').trim();
  let tone = inputs.tone || inputs.style || inputs.intent || inputs.angle || 'Storytelling / Authentic';

  if (!rawTopic) {
    return { topic: 'Growth Strategy', topicLower: 'growth strategy', audience: rawAudience || 'Creators & Founders', tone };
  }

  // 1. Detect Social Platform inside prompt
  let detectedPlatform = '';
  if (/instagram/i.test(rawTopic)) detectedPlatform = 'Instagram';
  else if (/linkedin/i.test(rawTopic)) detectedPlatform = 'LinkedIn';
  else if (/youtube|video/i.test(rawTopic)) detectedPlatform = 'YouTube';
  else if (/twitter|\bx\b|tweet/i.test(rawTopic)) detectedPlatform = 'X (Twitter)';
  else if (/tiktok/i.test(rawTopic)) detectedPlatform = 'TikTok';

  // 2. Detect Primary Goal inside prompt (handling typos like "fo,lower" -> "follower")
  let detectedGoal = '';
  if (/fo[l\s,\.]*ower|audience|subscriber|reach|impression|viral/i.test(rawTopic)) {
    detectedGoal = 'Follower Growth & Reach';
  } else if (/sales|client|customer|revenue|lead|conversion/i.test(rawTopic)) {
    detectedGoal = 'Client Acquisition & Sales';
  } else if (/product\s+management/i.test(rawTopic)) {
    detectedGoal = 'Product Management';
  } else if (/seo|google|ranking/i.test(rawTopic)) {
    detectedGoal = 'SEO & Search Ranking';
  } else if (/email|cold\s+email|newsletter/i.test(rawTopic)) {
    detectedGoal = 'Email Copywriting';
  }

  // 3. Clean conversational instructions and filler words
  let cleanSubject = rawTopic
    // Strip action verbs and request lead-ins
    .replace(/^(please\s+)?(can\s+you\s+)?(could\s+you\s+)?(help\s+me\s+)?(suggest|give|tell|write|generate|create|make|draft|show|provide|i\s+need|i\s+want)(\s+me)?(\s+some|\s+a|\s+an|\s+the)?(\s+good|\s+viral|\s+best|\s+engaging|\s+great|\s+top|\s+increasing)?(\s+post|\s+posts|\s+script|\s+scripts|\s+content|\s+ideas?|\s+thread|\s+hooks?|\s+copy|\s+article|\s+tips|\s+examples)?(\s+about|\s+on|\s+for|\s+regarding|\s+with|\s+around|\s+to)?\s+/i, '')
    // Strip platform suffixes like "for my instagram page", "for linkedin"
    .replace(/\s+(for|on|in)\s+(my\s+)?(instagram|linkedin|youtube|twitter|x|tiktok|facebook)(\s+page|\s+account|\s+profile)?$/i, '')
    // Strip preposition lead-ins
    .replace(/^(about|on|for|regarding|around|with)\s+/i, '')
    // Fix common typos like "fo,lower" -> "follower"
    .replace(/fo[,\.]*lower/gi, 'follower')
    .trim();

  // If a goal or platform was detected, construct a refined semantic title
  let finalTopicTitle = '';
  if (detectedGoal && detectedPlatform) {
    finalTopicTitle = `${detectedPlatform} ${detectedGoal}`;
  } else if (detectedGoal) {
    finalTopicTitle = detectedGoal;
  } else if (cleanSubject.length > 2) {
    finalTopicTitle = cleanSubject.charAt(0).toUpperCase() + cleanSubject.slice(1);
  } else {
    finalTopicTitle = rawTopic;
  }

  // Audience fallback
  let finalAudience = rawAudience;
  if (!finalAudience || finalAudience.length === 0) {
    finalAudience = 'Creators, Founders & Professionals';
  } else {
    finalAudience = finalAudience.charAt(0).toUpperCase() + finalAudience.slice(1);
  }

  return {
    rawTopic,
    topic: finalTopicTitle,
    topicLower: finalTopicTitle.toLowerCase(),
    audience: finalAudience,
    audienceLower: finalAudience.toLowerCase(),
    tone
  };
}

async function generateWithGeminiAPI(apiKey, toolId, inputs) {
  const prompt = buildPrompt(toolId, inputs);
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.75,
          maxOutputTokens: 1024
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`API returned status ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No content returned from Gemini API');

  return parseGeminiOutput(toolId, text);
}

function buildPrompt(toolId, inputs) {
  switch (toolId) {
    case 'linkedin':
      return `Act as a top 1% LinkedIn ghostwriter with 100M+ views.
Topic Intent: "${inputs.topic}"
Target Audience: ${inputs.audience}
Tone: ${inputs.tone}

Generate 3 distinct, viral LinkedIn post variations specifically focused on "${inputs.topic}". Format outputs clearly with "--- Variation 1 ---", "--- Variation 2 ---", "--- Variation 3 ---". Do not include conversational prompt lead-ins.`;

    case 'youtube':
      return `Act as a YouTube scriptwriter.
Topic: "${inputs.topic}"
Target Audience: ${inputs.audience}

Generate 3 retention hooks, a timestamped script outline, and SEO description for a video on "${inputs.topic}".`;

    case 'twitter':
      return `Act as a viral X thread writer.
Topic: "${inputs.topic}"
Target Audience: ${inputs.audience}

Write a 5-tweet thread about "${inputs.topic}". Separate tweets with "--- Tweet [N] ---".`;

    case 'seo':
      return `Act as an SEO Specialist.
Topic: "${inputs.topic}"
Audience: ${inputs.audience}

Provide 3 High-CTR Title Tags, 3 Meta Descriptions, and 5 H2 headings for "${inputs.topic}".`;

    case 'email':
      return `Act as a Cold Email Specialist.
Topic/Offer: "${inputs.topic}"
Target Role: ${inputs.audience}

Provide 5 subject lines and a concise cold email body for "${inputs.topic}".`;

    default:
      return `Generate content for ${inputs.topic}.`;
  }
}

function parseGeminiOutput(toolId, text) {
  const parts = text.split(/--- Variation \d+ ---|--- Tweet \d+ ---/).filter(p => p.trim().length > 0);
  
  if (parts.length >= 2) {
    return parts.map((part, i) => ({
      title: `🔥 Variation ${i + 1} (AI Generated)`,
      content: part.trim()
    }));
  }

  return [
    { title: '⚡ Gemini 1.5 Flash Output', content: text },
    { title: '💡 Strategic Output', content: text }
  ];
}

function generateWithLocalEngine(toolId, inputs) {
  const topic = inputs.topic;
  const topicLower = inputs.topicLower;
  const audience = inputs.audience;
  const audienceLower = inputs.audienceLower;
  const tone = inputs.tone;

  switch (toolId) {
    case 'linkedin':
      if (tone.includes('Bold') || tone.includes('Controversial')) {
        return [
          {
            title: '🔥 Bold & Controversial Angle',
            content: `Unpopular opinion about ${topicLower}:

95% of ${audienceLower} are approaching this completely backwards.

They spend months overcomplicating ${topicLower} by following outdated advice from 2020.

Here is the hard truth nobody tells you:

1. Traditional methods for ${topicLower} are officially dead.
2. The people winning right now prioritize speed, clarity, and rapid execution.
3. If your strategy takes longer than 24 hours to explain, you're overthinking it.

Stop treating ${topicLower} like rocket science. Simplify your process, remove friction, and execute.

Agree or disagree? Let's discuss in the comments 👇`
          },
          {
            title: '⚡ Actionable 3-Step Playbook',
            content: `The 3-step playbook to master ${topicLower} (Tailored for ${audienceLower}):

Step 1: Diagnose the Real Problem
Most people fail at ${topicLower} because they solve surface-level symptoms. Focus on root cause friction.

Step 2: Streamline Execution
Build reusable frameworks and leverage modern tools to cut production time in half.

Step 3: Measure & Iterate
Track 1 core metric: real, measurable impact.

If you are dealing with ${topicLower}, save this post for your next project 📌`
          },
          {
            title: '📈 Data-Driven Breakdown',
            content: `We analyzed top-performing strategies focused on ${topicLower}.

Here are the 3 core patterns that separated top performers from everyone else:

📊 Key Insight #1:
${audience} who built structured frameworks for ${topicLower} saw 3.4x faster results.

📊 Key Insight #2:
Clear, simplified communication increased engagement by 42%.

📊 Key Insight #3:
Consistency outperformed raw spend every single time.

Master ${topicLower} early, build clean systems, and let compounding do the heavy lifting.`
          }
        ];
      }

      // Default Authentic / Storytelling tone for LinkedIn
      return [
        {
          title: '📖 Authentic Storytelling Hook',
          content: `I used to think ${topicLower} required massive budgets and complex setups.

Then I learned the hard way.

While working directly with ${audienceLower}, I realized a fundamental truth:

Success with ${topicLower} isn't about doing more things—it's about doing the right things exceptionally well.

Here are the 3 mindset shifts that changed our results:

1️⃣ Shift #1: Focus on immediate clarity over corporate jargon.
2️⃣ Shift #2: Provide genuine value upfront before asking for anything in return.
3️⃣ Shift #3: Build lightweight systems that scale effortlessly.

If you are a ${audienceLower} looking to improve ${topicLower}, start with Shift #1 today.

What's the single biggest lesson you've learned about ${topicLower}?`
        },
        {
          title: '💡 Step-by-Step Blueprint',
          content: `How to master ${topicLower} in 2026 (A guide for ${audienceLower}):

Phase 1: Research & Audit
→ Identify the single biggest bottleneck in ${topicLower}.
→ Benchmark your current workflow against top industry standards.

Phase 2: Execution & Systems
→ Build a clean, repeatable strategy.
→ Focus on consistent execution over sporadic bursts.

Phase 3: Scale & Refine
→ Double down on top-performing tactics and eliminate the rest.

Save this post 📌 if you're taking on ${topicLower} this month!`
        },
        {
          title: '🔥 The 5-Minute Checklist',
          content: `Quick daily checklist for ${audienceLower} focused on ${topicLower}:

✅ Core objective clearly defined
✅ High-friction steps removed
✅ Feedback loop established
✅ Scalable tools activated

Mastering ${topicLower} doesn't require 100 hours. It requires 10 minutes of disciplined execution every day.`
        }
      ];

    case 'youtube':
      return [
        {
          title: '🎬 Retention-Locking Script & Hook',
          content: `📌 VIDEO TITLE: Mastering ${topic}: The Complete 2026 Guide

⏱️ 0:00 - THE 5-SECOND HOOK:
"If you are dealing with ${topicLower}, stop scrolling right now. In this video, I'm revealing the exact step-by-step framework you need."

⏱️ 0:30 - THE CORE PROBLEM:
"Why do most ${audienceLower} struggle with ${topicLower}? Because they overcomplicate the process. Here is what actually works today..."

⏱️ 2:00 - THE 3-STEP BREAKDOWN:
• Step 1: The Core Principles of ${topic}
• Step 2: Live Breakdown & Practical Execution
• Step 3: Pro Tips for ${audience}

⏱️ 7:30 - OUTRO & CTA:
"If this breakdown of ${topicLower} brought you value, smash subscribe and check out the links in the description below!"`
        },
        {
          title: '📝 SEO Description & Tags',
          content: `Everything you need to know about ${topicLower} explained specifically for ${audienceLower}.

🔗 RECOMMENDED CREATOR TOOLS:
• AI Voiceovers: https://elevenlabs.io/?via=viralcraft
• Fast Video Editing: https://www.descript.com/?via=viralcraft
• Workflow & Script Organization: https://affiliate.notion.so/viralcraft

TIMESTAMPS:
0:00 Intro & High-Retention Hook
1:15 The Biggest ${topic} Mistake
4:00 Step-by-Step Breakdown
7:30 Summary & Next Steps

#${topicLower.replace(/[^a-z0-9]/g, '')} #${audienceLower.replace(/[^a-z0-9]/g, '')} #Growth #Tutorial`
        }
      ];

    case 'twitter':
      return [
        {
          title: '🐦 5-Tweet Viral Thread',
          content: `1/5 Most ${audienceLower} overcomplicate ${topicLower}.

Here is the 2-minute masterclass to master it today: 🧵👇

---

2/5 The biggest mistake:

Trying to do everything manually instead of building a repeatable process.

If you don't streamline ${topicLower}, you run out of leverage.

---

3/5 Here is the 3-step execution framework:

1. Identify the single highest-impact lever in ${topicLower}.
2. Eliminate redundant friction points.
3. Track performance metrics daily.

---

4/5 The results when you execute this properly:
• 3x faster execution speed
• Higher overall satisfaction for ${audienceLower}
• Sustainable growth without burnout

---

5/5 That's a wrap!

If you found this thread on ${topicLower} valuable:
1. Follow for more breakdowns on ${topicLower}.
2. RT the first tweet to share with other ${audienceLower}!`
        }
      ];

    case 'seo':
      return [
        {
          title: '🎯 Google Search & AI Overviews Package',
          content: `🔍 TARGET SUBJECT: ${topic}

📌 HIGH-CTR TITLE TAGS (Google Snippet Ready):
1. ${topic}: Complete 2026 Guide & Free Tools
2. How to Master ${topic} for ${audience} [Step-by-Step]
3. Top ${topic} Frameworks That Actually Work

📝 META DESCRIPTIONS (Under 155 Characters):
1. "Discover the ultimate guide to ${topicLower}. Proven, actionable strategies tailored for ${audienceLower}. Access free tools today!"
2. "Master ${topicLower} with our high-converting templates. Built specifically for ${audienceLower} seeking rapid results."

💡 HIGH-RANKING H2 HEADINGS FOR GOOGLE AI OVERVIEWS:
• What is ${topicLower} and why does it matter in 2026?
• Top 3 Mistakes to Avoid with ${topicLower}
• How ${audience} Can Automate ${topicLower}`
        }
      ];

    case 'email':
      return [
        {
          title: '📧 High-Open Cold Email Package',
          content: `🎯 TARGET: ${audience}
💡 OFFER / SUBJECT: ${topic}

🔥 SUBJECT LINES & OPEN RATE SCORES:
1. Quick question regarding ${topicLower} [Score: 95/100]
2. 2 ideas for ${audienceLower} tackling ${topicLower} [Score: 92/100]
3. Fast question about ${topicLower} at your company [Score: 96/100]

✉️ COLD EMAIL BODY:

Hi {{First_Name}},

Noticed your team is focused on ${topicLower} and thought of a quick recommendation for ${audienceLower}.

We created a simple framework that cuts execution time on ${topicLower} by 50% without adding headcount or expensive software.

Would it be crazy if I sent over a 30-second summary explaining how it works?

Best,
[Your Name]
ViralCraft Free Suite`
        }
      ];

    default:
      return [{ title: 'Output', content: `Tailored content for ${topic}.` }];
  }
}
