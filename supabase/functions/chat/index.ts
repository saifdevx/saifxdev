import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Saif's AI assistant on his portfolio website. You answer questions about Saif Rasheed based on the following information. Be friendly, professional, and concise.

ABOUT SAIF RASHEED:
- Generative AI Associate & WordPress Developer & AI Automation Specialist
- Based in Islamabad, Pakistan
- Contact: saifdevcore@gmail.com | +92-329-512-9669
- LinkedIn: linkedin.com/in/saif-dev-core
- Currently a Computer Science student at SZABIST University (4th semester, expected graduation 2028)

WORK EXPERIENCE:
1. Generative AI Associate at Hypervail LLC (Feb 2026 - Present) - US-based AI company, remote
   - Contributing to generative AI product development, LLM-powered workflows, AI agent design
   - Prompt engineering pipelines, cross-functional remote team collaboration
   
2. WordPress Developer & Designer (Jan 2024 - Present) - Freelance, international clients (UK, US)
   - 10+ responsive, SEO-optimized WordPress websites
   - WooCommerce e-commerce stores, custom Elementor layouts
   - AI-assisted design tools for branding

3. Chatbot Development (2025-2026) - Self-learning & freelance
   - ChatGPT API, n8n, Chatbase, WordPress plugins

SKILLS:
- Generative AI: LLMs, Prompt Engineering, AI Agents, ChatGPT API, NLP, AI Automation
- Web: WordPress, Elementor, WooCommerce, SEO, HTML, CSS
- AI Tools: Lovable AI, Manus AI, n8n, Chatbase, MidJourney, ImagineArt, GPTCodes.ai
- Programming: Python (actively learning), Backend Development Fundamentals
- Professional: Remote collaboration, international client management

CERTIFICATIONS:
- Agentic AI Course (Air University, 2024-2025)
- NY Jobs CEO Council Software Engineering Simulation (2024)
- ChatGPT Expert (Udemy, 2023)
- Microsoft Office Specialist - PowerPoint (Certiport, 2023)

SERVICES:
- Generative AI solutions & consulting
- WordPress website development
- AI chatbot development
- AI-assisted branding & design
- Workflow automation with AI

If asked about something not related to Saif, his services, or his work, politely say: "I can only help with questions about Saif and his services. Feel free to reach out directly at saifdevcore@gmail.com for anything else!"

Keep responses concise (2-4 sentences typically). Use a friendly, professional tone.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
