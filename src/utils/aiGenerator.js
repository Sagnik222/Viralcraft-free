/**
 * ViralCraft Free AI Generator Utility
 * 
 * 100% Powered by Real Neural Network LLMs (OpenAI / Gemini).
 * Zero paywalls, zero invalid key errors, zero static templates.
 */

export async function generateContent(toolId, inputValues) {
  const userKey = localStorage.getItem('viralcraft_gemini_key');

  // If user provided their own Gemini API key, use Gemini API directly
  if (userKey && userKey.trim().length > 0) {
    try {
      const prompt = buildLLMPrompt(toolId, inputValues);
      return await callGeminiAPI(userKey.trim(), prompt, toolId);
    } catch (err) {
      console.warn('User Gemini API key failed, falling back to free Neural LLM engine...', err);
    }
  }

  // Primary Zero-Setup Engine: Free Public Neural Network LLM API (Pollinations AI)
  try {
    return await callFreeNeuralLLM(toolId, inputValues);
  } catch (err) {
    console.error('Free Neural LLM Gateway Error:', err);
    // Secondary fallback
    return await callGeminiFallback(toolId, inputValues);
  }
}

/**
 * Free Neural Network LLM Gateway (OpenAI-powered, zero API key required)
 */
async function callFreeNeuralLLM(toolId, inputValues) {
  const topic = (inputValues.topic || inputValues.offer || 'Networking & Career Growth').trim();
  const audience = (inputValues.audience || inputValues.target || 'Creators & Professionals').trim();
  const tone = inputValues.tone || inputValues.style || inputValues.intent || inputValues.angle || 'Storytelling / Authentic';

  const systemMessage = `You are ViralCraft AI, a world-class copywriter, growth strategist, and viral content creator. 
Analyze the user's input semantically. Do NOT repeat or echo prompt lead-in words like "help me write", "suggest me some post", or "create content about". 
Generate 3 distinct, viral, high-converting content variations for the core topic.`;

  const userPrompt = `Tool: ${toolId}
User Core Topic / Prompt: "${topic}"
Target Audience: "${audience}"
Tone of Voice: "${tone}"

Format output cleanly with 3 distinct variations separated by:
--- Variation 1: Storytelling Hook ---
[Write post variation 1 here]

--- Variation 2: Actionable Framework ---
[Write post variation 2 here]

--- Variation 3: Bold Insights ---
[Write post variation 3 here]`;

  const response = await fetch('https://text.pollinations.ai/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userPrompt }
      ],
      model: 'openai',
      seed: Math.floor(Math.random() * 10000)
    })
  });

  if (!response.ok) {
    throw new Error(`Neural LLM Gateway status ${response.status}`);
  }

  const text = await response.text();
  if (!text || text.trim().length === 0) {
    throw new Error('Empty response from Neural LLM');
  }

  return parseLLMOutput(toolId, text);
}

/**
 * Direct Gemini API Gateway for BYOK Users
 */
async function callGeminiAPI(apiKey, prompt, toolId) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 1200
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API Error: ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Empty output from Gemini LLM');

  return parseLLMOutput(toolId, rawText);
}

/**
 * Secondary Fallback Gateway
 */
async function callGeminiFallback(toolId, inputValues) {
  const topic = (inputValues.topic || inputValues.offer || 'Growth').trim();
  const prompt = `Write 3 viral marketing hooks for "${topic}". Do not repeat conversational lead-in phrases. Separate with --- Variation 1 ---, --- Variation 2 ---, --- Variation 3 ---`;

  const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
  const text = await response.text();
  return parseLLMOutput(toolId, text);
}

/**
 * Builds structured prompt for Gemini
 */
function buildLLMPrompt(toolId, inputs) {
  const topic = inputs.topic || inputs.offer || 'Growth';
  const audience = inputs.audience || inputs.target || 'Professionals';
  const tone = inputs.tone || inputs.style || inputs.intent || 'Authentic';

  return `SYSTEM: You are ViralCraft AI, an elite copywriter. Generate 3 distinct viral content variations for the user topic. Do not include conversational prompt lead-ins like "help me write".
User Topic: "${topic}"
Audience: "${audience}"
Tone: "${tone}"

Format as:
--- Variation 1: Storytelling Hook ---
[Content]

--- Variation 2: Actionable Framework ---
[Content]

--- Variation 3: Bold Insights ---
[Content]`;
}

/**
 * Parses LLM text response into interactive tabs
 */
function parseLLMOutput(toolId, text) {
  // Split on variation markers
  const sections = text.split(/--- (Variation \d+:[^---]+|Tweet \d+[^---]*|Variation \d+) ---/gi).filter(s => s.trim().length > 0);

  if (sections.length >= 2) {
    const variations = [];
    for (let i = 0; i < sections.length; i += 2) {
      let title = sections[i] ? sections[i].replace(/^Variation \d+:\s*/i, '').trim() : `Variation ${Math.floor(i/2) + 1}`;
      if (!title.startsWith('🔥') && !title.startsWith('⚡') && !title.startsWith('📖')) {
        title = `🔥 ${title}`;
      }
      const content = sections[i + 1] ? sections[i + 1].trim() : '';
      if (content.length > 0) {
        variations.push({ title, content });
      }
    }
    if (variations.length > 0) return variations;
  }

  // If text is one block, split by double newlines or present clean AI response
  return [
    { title: '⚡ AI Generated Content', content: text.trim() },
    { title: '💡 Key Insights', content: `Strategy & Analysis:\n\n${text.trim()}` }
  ];
}
