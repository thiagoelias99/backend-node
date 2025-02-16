import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreatePostInput {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  content: string
}
