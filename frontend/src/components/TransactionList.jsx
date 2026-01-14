import { useSelector } from 'react-redux';
import { selectFilteredTransactions } from '../store/transactionsSlice';
import TransactionItem from './TransactionItem';

function TransactionList({ onEditTransaction }) {
  const transactions = useSelector(selectFilteredTransactions);

  if (transactions.length === 0) {
    return (
      <div className="flex-center flex-col py-20 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-2">No Transactions</h3>
        <p className="text-slate-500 text-sm">Your history is empty.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          History
        </h2>
        <span className="text-xs font-bold text-slate-400 uppercase">
          {transactions.length} Records
        </span>
      </div>
      
      <div className="space-y-2">
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
