import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactions } from './store/transactionsSlice';
import BalanceSummary from './components/BalanceSummary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Filters from './components/Filters';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

function App() {
  const dispatch = useDispatch();
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Expense Tracker</h1>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Balance Summary */}
        <BalanceSummary />

        {/* Two Column Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form and Filters */}
          <div className="lg:col-span-1 space-y-6">
            <TransactionForm
              editingTransaction={editingTransaction}
              onCancelEdit={handleCancelEdit}
            />
            <Filters />
          </div>

          {/* Right Column - Transaction List */}
          <div className="lg:col-span-2">
            <TransactionList onEditTransaction={handleEditTransaction} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
            <p>Expense Tracker - Personal Finance Management</p>
            <p>Data stored in NestJS backend</p>

          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
