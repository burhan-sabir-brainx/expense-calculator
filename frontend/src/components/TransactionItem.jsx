import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransactionAsync, CATEGORIES } from '../store/transactionsSlice';
import { formatCurrency, formatDate, formatTime } from '../utils/helpers';

function TransactionItem({ transaction, onEdit }) {
  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { id, title, amount, category, type, createdAt } = transaction;
  
  const isIncome = type === 'income';
  const categoryData = CATEGORIES.find((c) => c.id === category) || CATEGORIES[CATEGORIES.length - 1];

  const handleDelete = async () => {
    try {
      await dispatch(deleteTransactionAsync(id)).unwrap();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      alert('Failed to delete transaction. Is the backend running?');
    }
  };


  return (
    <div
      className={`relative bg-white border border-slate-200 p-4 transition-all hover:bg-slate-50 ${
        isIncome ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-red-500'
      }`}
    >
      {/* Delete Confirmation Overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-white/95 flex items-center justify-center gap-4 z-20 px-6">
          <p className="text-sm font-bold text-slate-700">Delete?</p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Transaction Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-slate-900 truncate tracking-tight">{title}</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 border border-slate-200">
              {categoryData.name}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">
              {formatDate(createdAt)}
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="text-right px-4">
          <p
            className={`text-lg font-bold tabular-nums tracking-tight ${
              isIncome ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {isIncome ? '+' : '-'}{formatCurrency(Math.abs(amount))}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(transaction)}
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-slate-200 hover:bg-slate-900 hover:text-white transition-all"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-slate-200 hover:bg-red-600 hover:text-white transition-all text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
