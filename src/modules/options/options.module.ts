import { Module } from '@nestjs/common';
import { OptionsService } from 'src/service/options/options.service';
import { OptionsRepository } from 'src/db/repositories/options/repository';
import { OptionsController } from 'src/api/controllers/options/options.controller';
import { Options } from 'src/db/models/options/options';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OptionsController],
  providers: [
    OptionsService,
    OptionsRepository,
    Options,
    JwtService,
  ],
})
export class OptionsModule {}
