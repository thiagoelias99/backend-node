import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class PaginateInput {
  @ApiProperty({ default: "10", required: false })
  @IsString()
  @IsOptional()
  limit: number

  @ApiProperty({ default: "1", required: false })
  @IsString()
  @IsOptional()
  page: number
}