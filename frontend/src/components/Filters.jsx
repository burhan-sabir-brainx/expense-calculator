import { useSelector, useDispatch } from 'react-redux';
import {
  setFilter,
  setCategoryFilter,
  setSearchQuery,
  selectCurrentFilter,
  selectSelectedCategory,
  selectSearchQuery,
  FILTER_TYPES,
  CATEGORIES,
} from '../store/transactionsSlice';
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

function Filters() {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectCurrentFilter);
  const selectedCategory = useSelector(selectSelectedCategory);
  const searchQuery = useSelector(selectSearchQuery);

  const filterButtons = [
    { type: FILTER_TYPES.ALL, label: 'All' },
    { type: FILTER_TYPES.INCOME, label: 'Income' },
    { type: FILTER_TYPES.EXPENSE, label: 'Expenses' },
  ];

  const clearFilters = () => {
    dispatch(setFilter(FILTER_TYPES.ALL));
    dispatch(setCategoryFilter(null));
    dispatch(setSearchQuery(''));
  };

  const hasActiveFilters = 
    currentFilter !== FILTER_TYPES.ALL || 
    selectedCategory !== null || 
    searchQuery !== '';

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-5 h-5 text-slate-400" />
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1"
          >
            <XMarkIcon className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative mb-5">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        />
        {searchQuery && (
          <button
            onClick={() => dispatch(setSearchQuery(''))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Type Filters */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Transaction Type
        </label>
        <div className="flex rounded-lg border border-slate-200 p-1 bg-slate-50">
          {filterButtons.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => dispatch(setFilter(type))}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                currentFilter === type
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => dispatch(setCategoryFilter(null))}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${
              selectedCategory === null
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => dispatch(setCategoryFilter(cat.id))}
              className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
