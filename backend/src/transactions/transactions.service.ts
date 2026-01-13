import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [];

  findAll(): Transaction[] {
    return this.transactions;
  }

  findOne(id: string): Transaction {
    const transaction = this.transactions.find((t) => t.id === id);
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID "${id}" not found`);
    }
    return transaction;
  }

  create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }

  update(id: string, updatedTransaction: Partial<Transaction>): Transaction {
    const index = this.transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Transaction with ID "${id}" not found`);
    }
    this.transactions[index] = { ...this.transactions[index], ...updatedTransaction };
    return this.transactions[index];
  }

  delete(id: string): void {
    const index = this.transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Transaction with ID "${id}" not found`);
    }
    this.transactions.splice(index, 1);
  }
}

