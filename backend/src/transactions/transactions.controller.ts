import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(): Transaction[] {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Transaction {
    return this.transactionsService.findOne(id);
  }

  @Post()
  create(@Body() transaction: Transaction): Transaction {
    return this.transactionsService.create(transaction);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedTransaction: Partial<Transaction>): Transaction {
    return this.transactionsService.update(id, updatedTransaction);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.transactionsService.delete(id);
  }
}

