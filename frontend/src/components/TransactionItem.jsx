import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransactionAsync, CATEGORIES } from '../store/transactionsSlice';
import { formatCurrency, formatDate, formatTime } from '../utils/helpers';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

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
      className={`group relative bg-white rounded-lg border p-4 transition-all hover:shadow-md ${
        isIncome ? 'border-l-4 border-l-emerald-500 border-slate-200' : 'border-l-4 border-l-red-500 border-slate-200'
      }`}
    >
      {/* Delete Confirmation Overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center gap-3 z-10">
          <span className="text-sm text-slate-600">Delete this transaction?</span>
          <button
            onClick={handleDelete}
            className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-200"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Category Icon */}
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
            isIncome ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {categoryData.name.charAt(0)}
        </div>

        {/* Transaction Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-slate-900 truncate">{title}</h3>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {categoryData.name}
            </span>
            <span className="text-xs text-slate-400">
              {formatDate(createdAt)} at {formatTime(createdAt)}
            </span>
          </div>
        </div>

        {/* Amount */}
        <div
          className={`text-lg font-semibold tabular-nums ${
            isIncome ? 'text-emerald-600' : 'text-red-600'
          }`}
        >
          {isIncome ? '+' : '-'}{formatCurrency(Math.abs(amount))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            title="Edit"
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600"
            title="Delete"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
