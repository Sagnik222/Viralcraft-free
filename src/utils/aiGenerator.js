/**
 * ViralCraft Free AI Generator Utility
 * 
 * Supports two execution modes:
 * 1. BYOK (Bring Your Own Key): Directly calls Gemini API if key exists in localStorage.
 * 2. Instant Local Smart AI Engine: Generates tailored, viral marketing structures client-side instantly.
 */

export async function generateContent(toolId, inputValues) {
  const apiKey = localStorage.getItem('viralcraft_gemini_key');

  if (apiKey && apiKey.trim().length > 0) {
    try {
      return await generateWithGeminiAPI(apiKey, toolId, inputValues);
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart local generator:', err);
      // Fallback to local engine on API error
      return generateWithLocalEngine(toolId, inputValues);
    }
  }

  // Default to intelligent local generation engine (Instant & 100% Free)
  // Simulate natural typing delay for smooth UX
  await new Promise(resolve => setTimeout(resolve, 800));
  return generateWithLocalEngine(toolId, inputValues);
}

async function generateWithGeminiAPI(apiKey, toolId, inputValues) {
  const prompt = buildPrompt(toolId, inputValues);
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
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
      return `Act as a world-class LinkedIn ghostwriter with 100M+ views.
Topic: ${inputs.topic || 'Building in public'}
Audience: ${inputs.audience || 'Founders & Marketers'}
Tone: ${inputs.tone || 'Storytelling'}

Generate 3 distinct, viral LinkedIn post variations with high-converting hooks.
Format output into clear sections marked with "--- Variation 1 ---", "--- Variation 2 ---", "--- Variation 3 ---". Use short punchy lines, line breaks, and clear takeaways.`;

    case 'youtube':
      return `Act as a top YouTube creator strategist.
Video Title/Topic: ${inputs.topic || 'AI Tools'}
Length: ${inputs.length || 'Standard Video (5-10 mins)'}
CTA: ${inputs.cta || 'Subscribe'}

Generate a structured video outline including:
1. 3 Killer 5-Second Hooks
2. Story Arc & Timestamps (0:00 - Intro, 1:30 - Core Value, 5:00 - The Secret Hack, 7:30 - CTA)
3. Full Video Description with timestamps & keywords for YouTube SEO.`;

    case 'twitter':
      return `Act as a viral Twitter/X thread writer.
Topic: ${inputs.topic || 'Productivity'}
Style: ${inputs.style || 'Listicle / Breakdown'}

Write an engaging 5-tweet thread. Each tweet should be separated by "--- Tweet [N] ---". Make Tweet 1 a powerful hook that stops the scroll.`;

    case 'seo':
      return `Act as a senior SEO Specialist ranking #1 on Google.
Keyword/Topic: ${inputs.topic || 'Free AI Tools'}
Intent: ${inputs.intent || 'Informational'}

Provide:
1. 3 High-CTR Title Tags (under 60 chars)
2. 3 Compelling Meta Descriptions (under 155 chars)
3. Top 5 H2 Heading Ideas for Google AI Overviews ranking.`;

    case 'email':
      return `Act as a high-converting Cold Email Copywriter.
Offer: ${inputs.offer || 'Free audit'}
Target Role: ${inputs.target || 'CMO / Founder'}
Angle: ${inputs.angle || 'Curiosity'}

Provide:
1. 5 High-Open Subject Lines (Scored 0-100)
2. A 3-sentence personalized Cold Email Body
3. A low-friction Call-to-Action.`;

    default:
      return `Generate marketing content for ${inputs.topic || 'business'}.`;
  }
}

function parseGeminiOutput(toolId, text) {
  return [
    { title: 'AI Variation 1 (Gemini 1.5 Flash)', content: text },
    { title: 'Alternative Angle', content: `💡 Pro Tip for this output:\nTry testing this angle with your specific target audience for maximum engagement!\n\n${text.substring(0, 300)}...` }
  ];
}

function generateWithLocalEngine(toolId, inputs) {
  const topic = inputs.topic || 'Building a leverage-driven software tool';
  const audience = inputs.audience || 'Founders, Creators, & Solopreneurs';

  switch (toolId) {
    case 'linkedin':
      return [
        {
          title: '🔥 The Storytelling Hook (Highest Reach)',
          content: `I made a decision 6 months ago that changed everything.

Everyone told me: "You can't launch a 100% free product and compete with $50/mo SaaS giants."

They were wrong.

Here is what happened when we removed all paywalls for ${topic}:

1️⃣ Zero friction = 10x organic word-of-mouth
2️⃣ Google Search & AI Overviews indexed us in 48 hours
3️⃣ Community trust skyrocketed because we solved a real pain point

The lesson?

Stop building paywalls before you build value. Give away the product, win the trust, and monetize the ecosystem.

Repost ♻️ if you agree that software should be accessible to everyone.`
        },
        {
          title: '⚡ The Bold / Counter-Intuitive Hook',
          content: `99% of people are doing ${topic} completely wrong.

Here is the exact framework top 1% creators use for ${audience}:

→ Step 1: Hook them with a specific transformation, not a vague promise.
→ Step 2: Deliver 80% of the value in the first 3 lines.
→ Step 3: Keep line lengths under 8 words for mobile readability.
→ Step 4: End with an open question, not a sales pitch.

Which step are you currently missing in your workflow? Let me know below 👇`
        },
        {
          title: '📊 The Data & Framework Angle',
          content: `The 4-part playbook for ${topic}:

1. The Hook: "How to get [X Result] without [Y Pain]"
2. The Credibility: Show real proof, raw metrics, or verified case studies.
3. The Breakdown: 3 actionable steps anyone can execute today.
4. The CTA: Save this post for later.

Target Audience: ${audience}
Saved by 400+ creators this week. Bookmark this for your next post.`
        }
      ];

    case 'youtube':
      return [
        {
          title: '🎬 Full Script Breakdown & Timestamps',
          content: `📌 VIDEO TITLE: ${topic} (The 2026 Guide)

⏱️ 0:00 - THE 5-SECOND HOOK:
"If you are still struggling with ${topic}, stop everything you are doing right now. In this video, I am revealing the exact system that top creators use to scale 10x faster."

⏱️ 0:30 - THE PROBLEM SETUP:
"Most people fail at this because they overcomplicate the setup. They buy expensive tools they don't need."

⏱️ 2:00 - THE CORE 3-STEP METHOD:
1. Step 1: Automate the repetitive groundwork.
2. Step 2: Use intelligent templates to output 80% of the draft.
3. Step 3: Polish in 5 minutes and publish.

⏱️ 7:00 - OUTRO & CALL TO ACTION:
"If this saved you time, hit subscribe and grab the free template link in the description below!"`
        },
        {
          title: '📝 SEO Optimized YouTube Description',
          content: `In this video, we break down everything you need to know about ${topic}.

🔗 REFERRED TOOLS & RESOURCES:
• Try ElevenLabs for instant AI voiceovers: https://elevenlabs.io/?via=viralcraft
• Edit videos 10x faster with Descript: https://www.descript.com/?via=viralcraft
• Organize your content calendar with Notion: https://affiliate.notion.so/viralcraft

TIMESTAMPS:
0:00 Intro & High-Retention Hook
1:15 The Secret Shortcut
4:30 Step-by-Step Live Demo
8:00 Final Verdict & Free Checklist

#Marketing #ContentCreation #Automation #ViralTools`
        }
      ];

    case 'twitter':
      return [
        {
          title: '🐦 5-Tweet Viral Thread',
          content: `1/5 Most people spend weeks trying to figure out ${topic}.

Here is the 2-minute breakdown that will put you ahead of 95% of creators: 🧵👇

---

2/5 The biggest mistake people make:

They focus on vanity metrics instead of core leverage.

If your audience (${audience}) doesn't get immediate value in 3 seconds, they scroll past.

---

3/5 Here is the framework that changes the game:

1. Simplicity over complexity.
2. Frictionless delivery.
3. High-utility outputs.

Rule of thumb: Make the product 100% free and build trust first.

---

4/5 The results speak for themselves:
• 10x faster search indexing on Google
• Massive organic word-of-mouth
• Higher conversion on native partner tools

---

5/5 That's a wrap!

If you found this thread valuable:
1. Follow @ViralCraftApp for daily breakdown threads.
2. RT the first tweet below to share it with your network!`
        }
      ];

    case 'seo':
      return [
        {
          title: '🎯 Google Search & AI Overviews Package',
          content: `🔍 TARGET KEYWORD / TOPIC: ${topic}

📌 HIGH-CTR TITLE TAGS (Under 60 Characters):
1. ${topic} (2026 Free Suite & Instant Tools)
2. Free ${topic}: No Credit Card Required [100% Free]
3. How to Master ${topic} in 5 Minutes (Step-by-Step)

📝 META DESCRIPTIONS (Google Snippet Ready - Under 155 Chars):
1. "Discover the #1 free tool for ${topic}. Generate viral hooks, video scripts, and SEO content instantly with zero paywalls. Try it now!"
2. "Looking for free ${topic}? Access our 100% free suite built for creators and marketers. No credit card required, ever."

💡 HIGH-RANKING H2 HEADINGS FOR GOOGLE AI OVERVIEWS:
• What is ${topic} and why does it matter in 2026?
• Step-by-Step Guide to Automating ${topic}
• Top 5 Free Tools vs Paid Alternatives`
        }
      ];

    case 'email':
      return [
        {
          title: '📧 High-Open Cold Email Package',
          content: `🎯 TARGET: ${inputs.target || 'CMO / Marketing Director'}
💡 OFFER: ${inputs.offer || 'Free audit'}

🔥 SUBJECT LINES & OPEN RATE PREDICTIONS:
1. Quick question about ${topic} [Score: 94/100]
2. Loved your recent post + quick idea for ${inputs.target || 'your team'} [Score: 91/100]
3. 2 conversion leaks I noticed on your landing page [Score: 96/100]

✉️ COLD EMAIL BODY TEMPLATE:

Hi {{First_Name}},

Notice you are scaling marketing for {{Company_Name}} and thought of this idea.

We built a 100% free tool that solves ${topic} in under 60 seconds without requiring any credit card or software setup.

Would it be insane if I sent over a 45-second loom video showing how your team can test it today?

Best,
[Your Name]
ViralCraft Free Suite`
        }
      ];

    default:
      return [{ title: 'Output', content: 'Generated content ready.' }];
  }
}
