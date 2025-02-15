import { PickType } from "@nestjs/swagger"
import { CreateUserInput } from "src/users/dto/create-user.input"

export class AuthLoginInput extends PickType(CreateUserInput, ["email", "password"]) { }