import { BadRequestException } from "@nestjs/common"

export class EmailInUseException extends BadRequestException {
  constructor(email: string) {
    super("Error while validating data. Try again later.")
    console.error(`Email ${email} is already in use.`)
  }
}

export class InvalidCredentialsException extends BadRequestException {
  constructor() {
    super("Invalid credentials")
  }
}