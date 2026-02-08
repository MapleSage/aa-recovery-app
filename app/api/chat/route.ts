import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a compassionate and supportive recovery companion for someone working the 12 Steps of Alcoholics Anonymous. Your role is to:

1. Listen without judgment and provide emotional support
2. Share relevant wisdom from the AA Big Book and 12 & 12 when appropriate
3. Encourage the person to work with their sponsor and attend meetings
4. Help them understand and work through the 12 steps
5. Celebrate their progress and milestones
6. Remind them of key AA principles like "One day at a time", "Easy does it", and "Let go and let God"

Important guidelines:
- Never provide medical advice or suggest stopping medication
- Always encourage professional help for serious mental health concerns
- Maintain anonymity and confidentiality principles
- Be warm, understanding, and patient
- Share hope and the possibility of recovery
- Avoid being preachy or lecturing
- Keep responses conversational and supportive

Remember: You are a companion, not a sponsor. Always encourage them to work with their sponsor and the fellowship.`;

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        // Check if Azure OpenAI is configured
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const apiKey = process.env.AZURE_OPENAI_KEY;
        const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4';

        if (!endpoint || !apiKey) {
            // Return a helpful fallback response if not configured
            return NextResponse.json({
                message: getFallbackResponse(messages[messages.length - 1]?.content || '')
            });
        }

        const response = await fetch(
            `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=2024-02-15-preview`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': apiKey,
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        ...messages
                    ],
                    max_tokens: 500,
                    temperature: 0.7,
                }),
            }
        );

        if (!response.ok) {
            const error = await response.text();
            console.error('Azure OpenAI error:', error);
            return NextResponse.json({
                message: getFallbackResponse(messages[messages.length - 1]?.content || '')
            });
        }

        const data = await response.json();
        const assistantMessage = data.choices?.[0]?.message?.content ||
            "I'm here to listen. Please share what's on your mind.";

        return NextResponse.json({ message: assistantMessage });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { message: "I'm having trouble connecting right now. Please try again, or reach out to your sponsor or the fellowship." },
            { status: 500 }
        );
    }
}

function getFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('step 1') || lowerMessage.includes('powerless')) {
        return "Step 1 is about admitting we were powerless over alcohol and that our lives had become unmanageable. This is often the hardest step because it requires complete honesty. Have you been able to identify with others in the fellowship who share similar experiences? That identification is key to accepting this step.";
    }

    if (lowerMessage.includes('step 2') || lowerMessage.includes('higher power')) {
        return "Finding a Higher Power is a personal journey. Remember, the Big Book says we choose a God of our own understanding. Many people start by using the fellowship as their Higher Power. What's important is being open to the possibility that there's something greater than ourselves that can help. Have you discussed this with your sponsor?";
    }

    if (lowerMessage.includes('craving') || lowerMessage.includes('drink') || lowerMessage.includes('relapse')) {
        return "I hear you. Cravings can be intense, but they always pass. Remember H.A.L.T. - are you Hungry, Angry, Lonely, or Tired? These are common triggers. Please reach out to your sponsor or go to a meeting if you can. You don't have to go through this alone. One day at a time, one hour at a time if needed.";
    }

    if (lowerMessage.includes('sponsor')) {
        return "A sponsor relationship is one of the most valuable parts of the program. They've walked the path before you and can guide you through the steps. If you don't have a sponsor yet, try to find someone at meetings who has what you want - peace, serenity, and quality sobriety. Don't be afraid to ask.";
    }

    if (lowerMessage.includes('meeting')) {
        return "Meetings are the heart of the fellowship. They remind us we're not alone and that recovery is possible. Try to find meetings that feel like home. Some people do well with speaker meetings, others prefer step study or discussion groups. The important thing is to keep coming back.";
    }

    if (lowerMessage.includes('grateful') || lowerMessage.includes('gratitude')) {
        return "Gratitude is a powerful tool in recovery. Many members keep a daily gratitude list. Even on hard days, finding small things to be thankful for can shift our perspective. As they say, 'A grateful alcoholic will never drink.' What are you grateful for today?";
    }

    return "Thank you for sharing with me. Recovery is a journey, and every step forward counts. Remember, you're not alone in this. The fellowship is here for you. Is there a specific step or concern you'd like to talk about? Or would you like me to share some wisdom from the Big Book?";
}
