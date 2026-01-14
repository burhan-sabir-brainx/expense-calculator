import { useSelector } from 'react-redux';
import {
  selectBalance,
  selectTotalIncome,
  selectTotalExpenses,
} from '../store/transactionsSlice';
import { formatCurrency } from '../utils/helpers';

function BalanceSummary() {
  const balance = useSelector(selectBalance);
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpenses = useSelector(selectTotalExpenses);

  const isPositive = balance >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Total Balance Card */}
      <div className="card p-8 shadow-sm">
        <div>
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Balance</span>
          </div>
          <p className={`text-4xl font-bold tracking-tight ${isPositive ? 'text-slate-900' : 'text-red-600'}`}>
            {formatCurrency(balance)}
          </p>
          <div className="mt-6">
            <p className="text-xs font-medium text-slate-500">
              {isPositive ? 'Balance is positive' : 'Balance is negative'}
            </p>
          </div>
        </div>
      </div>

      {/* Income Card */}
      <div className="card p-8 shadow-sm">
        <div>
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Income</span>
          </div>
          <p className="text-4xl font-bold tracking-tight text-emerald-600">
            {formatCurrency(totalIncome)}
          </p>
          <div className="mt-6">
            <p className="text-xs font-medium text-slate-500">Total money received</p>
          </div>
        </div>
      </div>

      {/* Expenses Card */}
      <div className="card p-8 shadow-sm">
        <div>
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Spent</span>
          </div>
          <p className="text-4xl font-bold tracking-tight text-red-600">
            {formatCurrency(totalExpenses)}
          </p>
          <div className="mt-6">
            <p className="text-xs font-medium text-slate-500">Total money spent</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceSummary;
