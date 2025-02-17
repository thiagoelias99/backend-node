import { PartialType, PickType } from "@nestjs/swagger"
import { CreateCommentInput } from "./create-comment.input"

export class UpdateCommentInput extends PartialType(PickType(CreateCommentInput, ["content"])) { }