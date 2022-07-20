import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { AsksModule } from './asks/asks.module';



@Module({
  imports: [AccountsModule, AsksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
