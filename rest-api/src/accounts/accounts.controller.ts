import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AccountModel } from './accounts.interface';
import { AccountsModule } from './accounts.module';
import { AccountsService } from './accounts.service';


@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

@Get()
public findAll(): Array<AccountModel> {
  return this.accountsService.findAll();
}
@Get(':id')
public findOne(@Param('id', ParseIntPipe) id: number): AccountModel {
  return this.accountsService.findOne(id);
}
@Post()
public create(@Body() account: AccountModel): AccountModel {
  return this.accountsService.create(account);
}
@Delete(':id')
public delete(@Param('id', ParseIntPipe) id: number): void {  
  this.accountsService.delete(id);
}
}
