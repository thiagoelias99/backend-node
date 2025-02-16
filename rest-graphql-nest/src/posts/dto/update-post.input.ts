import { OmitType, PartialType } from "@nestjs/swagger"
import { CreatePostInput } from "./create-post.input"

export class UpdatePostInput extends PartialType(CreatePostInput) { }