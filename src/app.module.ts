import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './log/log.module';
import { CorbeilleModule } from './corbeille/corbeille.module';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AutorisationModule } from './autorisation/autorisation.module';
import * as Joi from '@hapi/joi';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';



@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      MYSQL_HOST:Joi.string().required(),
      MYSQL_PORT:Joi.number().required(),
      MYSQL_USER:Joi.string().required(),
      MYSQL_PASSWORD: Joi.string().required(),
      MYSQL_DATABASE:Joi.string().required(),
      SERVER_PORT:Joi.number().required()
    })
  }),LogModule,
   CorbeilleModule, 
   UtilisateursModule, 
   DatabaseModule, AutorisationModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass:LoggingInterceptor
    }
  ],
})
export class AppModule {}
