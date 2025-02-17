import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateCommentInput {
  @ApiProperty()
  @IsNumber()
  postId: number

  @ApiProperty()
  @IsString()
  content: string
}