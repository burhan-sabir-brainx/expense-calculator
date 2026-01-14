import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactions } from './store/transactionsSlice';
import BalanceSummary from './components/BalanceSummary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Filters from './components/Filters';

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
    <div className="min-h-screen bg-slate-50 flex flex-col py-12">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-6">
        <div className="animate-fade-in">
          <BalanceSummary />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Left Column - Form and Filters */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in">
            <div className="card shadow-sm">
              <TransactionForm
                editingTransaction={editingTransaction}
                onCancelEdit={handleCancelEdit}
              />
            </div>
            <div className="card p-8 shadow-sm">
              <Filters />
            </div>
          </div>

          {/* Right Column - Transaction List */}
          <div className="lg:col-span-7 animate-fade-in">
            <div className="card p-8 shadow-sm min-h-[600px]">
              <TransactionList onEditTransaction={handleEditTransaction} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
