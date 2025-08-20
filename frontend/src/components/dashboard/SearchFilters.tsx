import React from 'react';
import { Search, Filter } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../../types';

interface SearchFiltersProps {
  searchQuery: string;
  filters: SearchFiltersType;
  onSearchChange: (query: string) => void;
  onFiltersChange: (filters: SearchFiltersType) => void;
}

/**
 * Search input and filters component
 */
const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  filters,
  onSearchChange,
  onFiltersChange
}) => {
  const handleFilterChange = (key: keyof SearchFiltersType, value: string | boolean) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Поиск вакансий..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Город</option>
            <option value="moscow">Москва</option>
            <option value="spb">Санкт-Петербург</option>
            <option value="novosibirsk">Новосибирск</option>
          </select>
          
          <select
            value={filters.salary}
            onChange={(e) => handleFilterChange('salary', e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Зарплата</option>
            <option value="100-150">100-150k</option>
            <option value="150-250">150-250k</option>
            <option value="250+">250k+</option>
          </select>
          
          <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Фильтры</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;