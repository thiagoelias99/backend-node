import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private static instance: PrismaService

  private constructor() {
    super({
      log: ['query'],
      errorFormat: 'pretty',
      datasourceUrl: process.env.DATABASE_URL,
    })
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService()
    }
    return PrismaService.instance
  }

  async onModuleInit() {
    await this.$connect()
  }
}
