import { Module } from '@nestjs/common';
import { AutorisationService } from './autorisation.service';
import { AutorisationController } from './autorisation.controller';

@Module({
  controllers: [AutorisationController],
  providers: [AutorisationService],
})
export class AutorisationModule {}
