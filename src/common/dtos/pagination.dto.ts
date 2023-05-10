import { Type } from 'class-transformer';
import { IsNumber, Min, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  offset?: number;
}
