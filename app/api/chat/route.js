import { NextResponse } from 'next/server';
import CHATBOT_SYSTEM_PROMPT from '../../../constants/chatbotPrompt';


export async function POST(req) {
    const { message, history } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'OpenRouter API key not set.' }, { status: 500 });
    }

    // Determine max_tokens based on question length
    let max_tokens = 150;
    if (message.length < 40) {
        max_tokens = 60; // Short answer for simple questions
    } else if (message.length > 120) {
        max_tokens = 300; // More detail for long questions
    }

    // Build conversation context for OpenRouter
    let messagesArr = [
        { role: 'system', content: CHATBOT_SYSTEM_PROMPT }
    ];
    if (Array.isArray(history)) {
        for (const m of history) {
            if (m.from === 'user') messagesArr.push({ role: 'user', content: m.text });
            if (m.from === 'bot') messagesArr.push({ role: 'assistant', content: m.text });
        }
    }
    messagesArr.push({ role: 'user', content: message });

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'openrouter/auto',
                messages: messagesArr,
                max_tokens,
            }),
        });

        const data = await response.json();
        let botReply;
        if (data.choices?.[0]?.message?.content) {
            botReply = data.choices[0].message.content;
        } else if (data.error) {
            botReply = 'Sorry, there was an error processing your request. Please try again later.';
        } else {
            botReply = "I'm not sure how to answer that. Could you rephrase or ask something else?";
        }
        return NextResponse.json({ reply: botReply, raw: data });
    } catch (error) {
        console.error('OpenRouter API fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch from OpenRouter.' }, { status: 500 });
    }
}
