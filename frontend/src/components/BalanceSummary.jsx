import { useSelector } from 'react-redux';
import {
  selectBalance,
  selectTotalIncome,
  selectTotalExpenses,
} from '../store/transactionsSlice';
import { formatCurrency } from '../utils/helpers';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

function BalanceSummary() {
  const balance = useSelector(selectBalance);
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpenses = useSelector(selectTotalExpenses);

  const isPositive = balance >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Balance Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              Total Balance
            </p>
            <p className={`text-3xl font-semibold mt-2 ${isPositive ? 'text-slate-900' : 'text-red-600'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isPositive ? 'bg-slate-100' : 'bg-red-50'}`}>
            <CurrencyDollarIcon className={`w-6 h-6 ${isPositive ? 'text-slate-600' : 'text-red-600'}`} />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            {isPositive ? 'Your balance is positive' : 'Your balance is negative'}
          </p>
        </div>
      </div>

      {/* Income Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              Total Income
            </p>
            <p className="text-3xl font-semibold mt-2 text-emerald-600">
              {formatCurrency(totalIncome)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50">
            <ArrowTrendingUpIcon className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Total money received
          </p>
        </div>
      </div>

      {/* Expenses Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              Total Expenses
            </p>
            <p className="text-3xl font-semibold mt-2 text-red-600">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-red-50">
            <ArrowTrendingDownIcon className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Total money spent
          </p>
        </div>
      </div>
    </div>
  );
}

export default BalanceSummary;
