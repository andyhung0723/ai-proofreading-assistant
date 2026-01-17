import { IsString, MaxLength, IsOptional } from 'class-validator';

export class FixTextDto {
  @IsString()
  @MaxLength(1000, { message: '文本長度不能超過 1000 字' })
  text: string;

  @IsOptional()
  @IsString()
  customInstruction?: string;
}
