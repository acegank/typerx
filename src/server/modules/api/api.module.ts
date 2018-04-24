import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [],
})
export class ApiModule {}
