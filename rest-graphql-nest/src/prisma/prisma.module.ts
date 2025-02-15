import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Module({
  providers: [
    {
      provide: PrismaService,
      useFactory: () => {
        return PrismaService.getInstance()
      },
    },
  ],
  exports: [PrismaService]
})
export class PrismaModule { }
