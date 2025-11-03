/**
 * OpenRouter API Service
 * https://openrouter.ai/docs
 */

interface OpenRouterMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface OpenRouterResponse {
    choices: Array<{
        message: {
            content: string;
            role: string;
        };
    }>;
    model: string;
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

const getApiKey = (): string => {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
        throw new Error('VITE_OPENROUTER_API_KEY not configured in .env');
    }
    return apiKey;
};

/**
 * Generate image using OpenRouter (models like DALL-E 3, Stable Diffusion XL)
 */
export const generateImageViaOpenRouter = async (
    prompt: string,
    model: string = 'openai/dall-e-3'
): Promise<string> => {
    const apiKey = getApiKey();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'ZENON_e_ART_h AI STUDIO'
        },
        body: JSON.stringify({
            model,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            // DALL-E specific parameters
            ...(model.includes('dall-e') && {
                n: 1,
                size: '1024x1024',
                quality: 'standard'
            })
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenRouter API error');
    }

    const data: OpenRouterResponse = await response.json();

    // Extract image URL from response
    const imageUrl = data.choices[0]?.message?.content;
    if (!imageUrl) {
        throw new Error('No image URL in response');
    }

    return imageUrl;
};

/**
 * Chat with AI models via OpenRouter
 */
export const chatWithOpenRouter = async (
    messages: OpenRouterMessage[],
    model: string = 'anthropic/claude-3.5-sonnet'
): Promise<string> => {
    const apiKey = getApiKey();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'ZENON_e_ART_h AI STUDIO'
        },
        body: JSON.stringify({
            model,
            messages
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenRouter API error');
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0]?.message?.content || '';
};

/**
 * Get available models from OpenRouter
 */
export const getOpenRouterModels = async () => {
    const response = await fetch('https://openrouter.ai/api/v1/models');

    if (!response.ok) {
        throw new Error('Failed to fetch OpenRouter models');
    }

    return response.json();
};
