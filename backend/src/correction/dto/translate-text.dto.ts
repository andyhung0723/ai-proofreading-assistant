import { IsString, MaxLength } from 'class-validator';

export class TranslateTextDto {
  @IsString()
  @MaxLength(1000, { message: '文本長度不能超過 1000 字' })
  finalText: string;
}
