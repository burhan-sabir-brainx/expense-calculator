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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-red-600 hover:text-red-700 font-bold uppercase tracking-wider bg-red-50 px-3 py-1.5"
          >
            Reset
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full px-4 py-3 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all text-sm font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => dispatch(setSearchQuery(''))}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Type Filters */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Type
        </label>
        <div className="flex border border-slate-200 bg-slate-50">
          {filterButtons.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => dispatch(setFilter(type))}
              className={`flex-1 py-2.5 px-3 text-xs font-bold transition-all ${
                currentFilter === type
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => dispatch(setCategoryFilter(null))}
            className={`px-4 py-2 text-xs font-bold transition-all border ${
              selectedCategory === null
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-600'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => dispatch(setCategoryFilter(cat.id))}
              className={`px-4 py-2 text-xs font-bold transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-600'
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
