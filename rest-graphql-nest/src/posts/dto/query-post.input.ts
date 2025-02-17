import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"
import { PaginateInput } from "src/utils/paginate.input"

export class QueryPostInput extends PaginateInput {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  authorId: number

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  authorName: string
}