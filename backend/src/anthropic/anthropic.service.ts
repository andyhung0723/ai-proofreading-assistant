import Anthropic from '@anthropic-ai/sdk';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AnthropicService {
  private readonly logger = new Logger(AnthropicService.name);
  private readonly client: Anthropic;

  public constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ANTHROPIC_API_KEY');

    if (!apiKey) {
      this.logger.error('ANTHROPIC_API_KEY is not configured');
      throw new Error('ANTHROPIC_API_KEY is required');
    }

    this.client = new Anthropic({
      apiKey,
    });
  }

  public async createMessage(params: {
    systemPrompt: string;
    userMessage: string;
    maxTokens?: number;
  }): Promise<string> {
    try {
      const { systemPrompt, userMessage, maxTokens = 2048 } = params;
      const model = this.configService.get<string>('ANTHROPIC_MODEL');

      this.logger.debug(
        `Creating message with user input: ${userMessage.substring(0, 100)}...`,
      );

      const response = await this.client.messages.create({
        model: model,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      });

      if (response.content[0].type === 'text') {
        return response.content[0].text;
      }

      throw new Error('Unexpected response type from Anthropic API');
    } catch (error) {
      this.logger.error('Error calling Anthropic API', error);
      throw new Error(`Failed to call Anthropic API: ${error.message}`);
    }
  }
}
