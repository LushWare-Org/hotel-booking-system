import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search, AlertCircle, XCircle } from 'lucide-react';
import dayjs from 'dayjs';

const BookingCalendar = ({ fromDate, toDate, setFromDate, setToDate, searchTerm, setSearchTerm, onSearch, resetSearch }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    const hasSearchTerm = searchTerm && searchTerm.trim() !== '';
    const hasBothDates = fromDate && toDate;
    const hasOneDate = (fromDate && !toDate) || (!fromDate && toDate);

    if (hasOneDate) {
      setError('Please provide both check-in and check-out dates.');
      return;
    }

    if (!hasSearchTerm && !hasBothDates) {
      setError('Please provide a room name or both check-in and check-out dates.');
      return;
    }
    onSearch(e);

    // Save to localStorage
    localStorage.setItem('fromDate', fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : '');
    localStorage.setItem('toDate', toDate ? dayjs(toDate).format('YYYY-MM-DD') : '');
    localStorage.setItem('searchTerm', searchTerm || '');

    // Redirect to Rooms page
    navigate('/rooms', {
      state: {
        fromDate: fromDate ? new Date(fromDate) : null,
        toDate: toDate ? new Date(toDate) : null,
        searchTerm: searchTerm || ''
      }
    });
  };

  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
    setSearchTerm('');
    setError('');
    localStorage.removeItem('fromDate');
    localStorage.removeItem('toDate');
    localStorage.removeItem('searchTerm');
    resetSearch && resetSearch();
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-3 sm:p-6 w-full max-w-[90vw] sm:max-w-4xl border border-white border-opacity-20 shadow-2xl mx-auto my-4 sm:my-0">
      {error && (
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-700 rounded-lg flex items-center shadow-lg text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500" />
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Check-in Date */}
        <div className="flex-1 min-w-0">
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-left text-white">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-2 sm:left-3 top-1/2 sm:top-3 transform -translate-y-1/2 sm:transform-none h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="date"
              className="pl-8 sm:pl-10 pr-2 sm:pr-3 py-2 sm:p-3 w-full bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-sm"
              value={fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : ''}
              onChange={(e) => setFromDate(e.target.value ? new Date(e.target.value) : null)}
              min={dayjs().format('YYYY-MM-DD')}
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="flex-1 min-w-0">
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-left text-white">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-2 sm:left-3 top-1/2 sm:top-3 transform -translate-y-1/2 sm:transform-none h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="date"
              className="pl-8 sm:pl-10 pr-2 sm:pr-3 py-2 sm:p-3 w-full bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-sm"
              value={toDate ? dayjs(toDate).format('YYYY-MM-DD') : ''}
              onChange={(e) => setToDate(e.target.value ? new Date(e.target.value) : null)}
              min={fromDate ? dayjs(fromDate).add(1, 'day').format('YYYY-MM-DD') : dayjs().add(1, 'day').format('YYYY-MM-DD')}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-end gap-1 sm:gap-2">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-md transition duration-300 flex items-center justify-center text-xs sm:text-sm"
          >
            <Search className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-2 sm:p-3 bg-gray-100 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-200 hover:text-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center"
            title="Reset Search"
          >
            <XCircle size={14} className="sm:h-18 sm:w-18" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingCalendar;
