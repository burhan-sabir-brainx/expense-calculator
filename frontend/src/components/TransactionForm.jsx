import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTransactionAsync, updateTransactionAsync, CATEGORIES } from '../store/transactionsSlice';
import { validateTransaction } from '../utils/helpers';
import { PlusIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

function TransactionForm({ editingTransaction, onCancelEdit }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('other');
  const [isExpense, setIsExpense] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!editingTransaction;

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(Math.abs(editingTransaction.amount).toString());
      setCategory(editingTransaction.category);
      setIsExpense(editingTransaction.type === 'expense');
    }
  }, [editingTransaction]);

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory('other');
    setIsExpense(true);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalAmount = isExpense ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));
    
    const validation = validateTransaction({ title, amount });
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditing) {
        await dispatch(
          updateTransactionAsync({
            id: editingTransaction.id,
            title: title.trim(),
            amount: finalAmount,
            category,
          })
        ).unwrap();
        onCancelEdit();
      } else {
        await dispatch(
          addTransactionAsync({
            title: title.trim(),
            amount: finalAmount,
            category,
          })
        ).unwrap();
      }

      resetForm();
    } catch (error) {
      console.error('Failed to save transaction:', error);
      alert('Failed to save transaction. Is the backend running?');
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleCancel = () => {
    resetForm();
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm mb-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        {isEditing ? 'Edit Transaction' : 'Add Transaction'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Transaction Type Toggle */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Transaction Type
          </label>
          <div className="flex rounded-lg border border-slate-200 p-1 bg-slate-50">
            <button
              type="button"
              onClick={() => setIsExpense(true)}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                isExpense
                  ? 'bg-white text-red-600 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setIsExpense(false)}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                !isExpense
                  ? 'bg-white text-emerald-600 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Income
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: null });
            }}
            placeholder="Enter transaction description"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.title 
                ? 'border-red-300 focus:ring-2 focus:ring-red-100 focus:border-red-400' 
                : 'border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400'
            }`}
          />
          {errors.title && (
            <p className="mt-1.5 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) setErrors({ ...errors, amount: null });
              }}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`w-full pl-8 pr-4 py-2.5 rounded-lg border ${
                errors.amount 
                  ? 'border-red-300 focus:ring-2 focus:ring-red-100 focus:border-red-400' 
                  : 'border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400'
              }`}
            />
          </div>
          {errors.amount && (
            <p className="mt-1.5 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>

        {/* Category Select */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-2">
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-2.5 px-4 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <XMarkIcon className="w-4 h-4" />
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-white flex items-center justify-center gap-2 ${
              isExpense
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isEditing ? (
              <>
                <CheckIcon className="w-4 h-4" />
                Update
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4" />
                Add {isExpense ? 'Expense' : 'Income'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
