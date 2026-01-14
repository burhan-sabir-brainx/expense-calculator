import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTransactionAsync, updateTransactionAsync, CATEGORIES } from '../store/transactionsSlice';
import { validateTransaction } from '../utils/helpers';

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
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          {isEditing ? 'Edit Transaction' : 'Add Transaction'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transaction Type Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Type
          </label>
          <div className="flex border border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => setIsExpense(true)}
              className={`flex-1 py-3 px-4 text-sm font-bold transition-all ${
                isExpense
                  ? 'bg-white text-red-600 shadow-sm border border-slate-200'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setIsExpense(false)}
              className={`flex-1 py-3 px-4 text-sm font-bold transition-all ${
                !isExpense
                  ? 'bg-white text-emerald-600 shadow-sm border border-slate-200'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Income
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
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
            placeholder="Description"
            className={`w-full px-4 py-3 border text-slate-900 font-medium placeholder:text-slate-300 transition-all ${
              errors.title 
                ? 'border-red-200 focus:ring-2 focus:ring-red-50 focus:border-red-400' 
                : 'border-slate-200 focus:ring-2 focus:ring-slate-100 focus:border-slate-400'
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-xs font-bold text-red-500 uppercase">{errors.title}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Amount Input */}
          <div className="space-y-2">
            <label htmlFor="amount" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Amount
            </label>
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
              className={`w-full px-4 py-3 border text-slate-900 font-bold tabular-nums transition-all ${
                errors.amount 
                  ? 'border-red-200 focus:ring-2 focus:ring-red-50 focus:border-red-400' 
                  : 'border-slate-200 focus:ring-2 focus:ring-slate-100 focus:border-slate-400'
              }`}
            />
            {errors.amount && (
              <p className="mt-1 text-xs font-bold text-red-500 uppercase">{errors.amount}</p>
            )}
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 bg-white text-slate-900 font-medium transition-all focus:ring-2 focus:ring-slate-100 focus:border-slate-400 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 font-bold text-white transition-all ${
              isExpense
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isEditing ? 'Update Transaction' : 'Add Transaction'}
          </button>
          
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 border border-slate-200 text-slate-500 font-bold text-xs uppercase hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
