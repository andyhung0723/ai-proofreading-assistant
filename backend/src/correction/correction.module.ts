import { Module } from '@nestjs/common';
import { AnthropicModule } from '../anthropic/anthropic.module';
import { CorrectionController } from './correction.controller';
import { CorrectionService } from './correction.service';

@Module({
  imports: [AnthropicModule],
  controllers: [CorrectionController],
  providers: [CorrectionService],
})
export class CorrectionModule {}
