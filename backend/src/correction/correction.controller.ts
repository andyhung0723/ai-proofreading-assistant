import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { CorrectionService } from './correction.service';
import { FixTextDto } from './dto/fix-text.dto';
import { TranslateTextDto } from './dto/translate-text.dto';

@Controller('api/correction')
export class CorrectionController {
  private readonly logger = new Logger(CorrectionController.name);

  public constructor(private readonly correctionService: CorrectionService) {}

  @Post('fix')
  @HttpCode(HttpStatus.OK)
  public async fixText(@Body() dto: FixTextDto) {
    this.logger.log(
      `Received fix request for text: ${dto.text.substring(0, 50)}...`,
    );

    try {
      const result = await this.correctionService.fixText(
        dto.text,
        dto.customInstruction,
      );
      return result;
    } catch (error) {
      this.logger.error('Error fixing text', error);
      throw error;
    }
  }

  @Post('translate')
  @HttpCode(HttpStatus.OK)
  public async translateText(@Body() dto: TranslateTextDto) {
    this.logger.log(
      `Received translate request for text: ${dto.finalText.substring(0, 50)}...`,
    );

    try {
      const result = await this.correctionService.translateText(dto.finalText);
      return result;
    } catch (error) {
      this.logger.error('Error translating text', error);
      throw error;
    }
  }
}
