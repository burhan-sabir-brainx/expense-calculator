import { useSelector } from 'react-redux';
import { selectFilteredTransactions } from '../store/transactionsSlice';
import TransactionItem from './TransactionItem';
import { InboxIcon } from '@heroicons/react/24/outline';

function TransactionList({ onEditTransaction }) {
  const transactions = useSelector(selectFilteredTransactions);

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-12 shadow-sm text-center">
        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <InboxIcon className="w-7 h-7 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">No transactions found</h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          Get started by adding your first transaction using the form.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Transaction History
        </h2>
        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {transactions.length} {transactions.length === 1 ? 'record' : 'records'}
        </span>
      </div>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={onEditTransaction}
          />
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
