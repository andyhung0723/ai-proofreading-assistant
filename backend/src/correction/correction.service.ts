import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AnthropicService } from '../anthropic/anthropic.service';

@Injectable()
export class CorrectionService {
  private readonly logger = new Logger(CorrectionService.name);

  public constructor(private readonly anthropicService: AnthropicService) {}

  public async fixText(
    text: string,
    customInstruction?: string,
  ): Promise<{ originalText: string; correctedText: string }> {
    this.logger.log(`Fixing text: ${text.substring(0, 50)}...`);

    const systemPrompt = this._buildFixTextSystemPrompt(customInstruction);
    const userMessage = `請校正以下文本：\n\n${text}`;

    const correctedText = await this.anthropicService.createMessage({
      systemPrompt,
      userMessage,
      maxTokens: 2048,
    });

    return {
      originalText: text,
      correctedText: correctedText.trim(),
    };
  }

  public async translateText(
    finalText: string,
  ): Promise<{ translatedText: string }> {
    this.logger.log(`Translating text: ${finalText.substring(0, 50)}...`);

    const systemPrompt = this._buildTranslateSystemPrompt();
    const userMessage = `請將以下中文翻譯成英文：\n\n${finalText}`;

    const translatedText = await this.anthropicService.createMessage({
      systemPrompt,
      userMessage,
      maxTokens: 2048,
    });

    return {
      translatedText: translatedText.trim(),
    };
  }

  private _buildFixTextSystemPrompt(customInstruction?: string): string {
    const promptPath = join(__dirname, 'prompts', 'fix-text-system.prompt.md');
    let prompt = readFileSync(promptPath, 'utf-8');

    if (customInstruction) {
      prompt += `\n\n## 使用者自訂指示\n${customInstruction}`;
    }

    return prompt;
  }

  private _buildTranslateSystemPrompt(): string {
    const promptPath = join(__dirname, 'prompts', 'translate-system.prompt.md');
    const prompt = readFileSync(promptPath, 'utf-8');

    return prompt;
  }
}
