import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Check, DollarSign, Wifi, Home } from 'lucide-react';
import dayjs from 'dayjs';

const RoomSearch = ({ setFilteredRooms, rooms, fromDate, toDate, bookings }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [roomType, setRoomType] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Facilities list
  const facilities = [
    'Free Wi-Fi',
    'Minibar',
    'Shower WC',
    'Bathrobe',
    'In-room Digital Safe',
    'Iron and Iron Board',
    'Ocean View',
    'Private Pool',
    'Air Conditioning',
    'Flat Screen TV',
    'Spa Access',
    'Gym Access'
  ];

  // Room types
  const roomTypes = [
    { value: '', label: 'All Rooms' },
    { value: 'standard', label: 'Standard' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'suites', label: 'Suites' },
    { value: 'family', label: 'Family' },
    { value: 'accessible', label: 'Accessible' }
  ];

  // Set max price based on rooms
  useEffect(() => {
    if (rooms && Array.isArray(rooms) && rooms.length > 0) {
      const highestPrice = Math.max(...rooms.map(room => room.rentPerDay || 0));
      const roundedMaxPrice = Math.ceil(highestPrice / 100) * 100 || 1000;
      setMaxPrice(roundedMaxPrice);
      setPriceRange([0, roundedMaxPrice]);
    } else {
      setMaxPrice(1000);
      setPriceRange([0, 1000]);
    }
  }, [rooms]);

  // Filter rooms based on all criteria, including booking availability
  const handleFilter = () => {
    if (!rooms || !Array.isArray(rooms)) {
      console.log('No rooms to filter or rooms is not an array');
      setFilteredRooms([]);
      return;
    }

    console.log('Filtering rooms with:', {
      localSearchTerm,
      roomType,
      selectedFacilities,
      priceRange,
      fromDate: fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : null,
      toDate: toDate ? dayjs(toDate).format('YYYY-MM-DD') : null,
      bookingsCount: bookings?.length || 0
    });

    const filtered = rooms.filter(room => {
      try {
        // Search term filter
        const matchesSearch =
          !localSearchTerm ||
          (room.name?.toLowerCase().includes(localSearchTerm.toLowerCase())) ||
          (room.description?.toLowerCase().includes(localSearchTerm.toLowerCase()));

        // Room type filter
        const matchesType =
          !roomType ||
          (room.type && (
            (roomType === 'standard' && (
              room.type.toLowerCase().includes('standard') ||
              room.type.toLowerCase().includes('single') ||
              room.type.toLowerCase().includes('double') ||
              room.type.toLowerCase() === 'singlebedroom1' ||
              room.type.toLowerCase() === 'doublebedroom1'
            )) ||
            (roomType === 'deluxe' && room.type.toLowerCase().includes('deluxe')) ||
            (roomType === 'suites' && (
              room.type.toLowerCase().includes('suite') ||
              room.type.toLowerCase().includes('penthouse')
            )) ||
            (roomType === 'family' && room.type.toLowerCase().includes('family')) ||
            (roomType === 'accessible' && room.type.toLowerCase().includes('accessible'))
          ));

        // Price range filter
        const matchesPrice =
          (room.rentPerDay || 0) >= priceRange[0] &&
          (room.rentPerDay || 0) <= priceRange[1];

        // Facilities filter
        const matchesFacilities =
          selectedFacilities.length === 0 ||
          selectedFacilities.every(facility =>
            room.facilities && Array.isArray(room.facilities) && room.facilities.includes(facility)
          );

        // Booking availability filter
        let isAvailable = true;
        if (fromDate && toDate && Array.isArray(bookings) && bookings.length > 0) {
          const searchFrom = dayjs(fromDate);
          const searchTo = dayjs(toDate);
          isAvailable = !bookings.some(booking => {
            if (booking.roomId !== room._id) return false;
            const bookingFrom = dayjs(booking.fromDate);
            const bookingTo = dayjs(booking.toDate);
            const isBooked = bookingFrom.isBefore(searchTo) && bookingTo.isAfter(searchFrom);
            console.log(`Checking room ${room._id} (${room.name}):`, {
              bookingFrom: bookingFrom.format('YYYY-MM-DD'),
              bookingTo: bookingTo.format('YYYY-MM-DD'),
              searchFrom: searchFrom.format('YYYY-MM-DD'),
              searchTo: searchTo.format('YYYY-MM-DD'),
              isBooked
            });
            return isBooked;
          });
        }

        const roomPasses = matchesSearch && matchesType && matchesPrice && matchesFacilities && isAvailable;
        console.log(`Room ${room._id} (${room.name}) passes:`, roomPasses, {
          matchesSearch,
          matchesType,
          matchesPrice,
          matchesFacilities,
          isAvailable
        });
        return roomPasses;
      } catch (error) {
        console.error('Error filtering room:', room._id, error);
        return false;
      }
    });

    console.log('Filtered rooms:', filtered.map(room => ({ id: room._id, name: room.name })));
    setFilteredRooms(filtered);
  };

  // Reset all filters
  const handleReset = () => {
    console.log('Resetting RoomSearch filters');
    setLocalSearchTerm('');
    setRoomType('');
    setSelectedFacilities([]);
    setPriceRange([0, maxPrice]);
    setShowFilters(false);
    // Reapply filters to respect booking availability
    handleFilter();
  };

  // Toggle facility selection
  const toggleFacility = (facility) => {
    setSelectedFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  // Apply filters when filter criteria change
  useEffect(() => {
    handleFilter();
  }, [localSearchTerm, roomType, selectedFacilities, priceRange]);

  // Reapply filters when rooms or booking data change
  useEffect(() => {
    handleFilter();
  }, [rooms, fromDate, toDate, bookings]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 border-l-4 border-blue-600 w-full max-w-[90vw] sm:max-w-4xl mx-auto my-4 sm:my-0">
      <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
        {/* Search input with icon */}
        <div className="w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400 sm:h-6 sm:w-6" />
          </div>
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            placeholder="Search rooms by name or description"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
          />
        </div>

        {/* Room Type Select */}
        <div className="w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Home size={20} className="text-gray-400 sm:h-6 sm:w-6" />
          </div>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none hover:border-blue-300 text-sm"
            style={{
              backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" color=\"%236366f1\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\"></path></svg>')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center"
            }}
          >
            {roomTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm"
          >
            <Filter size={20} className="mr-2 sm:h-6 sm:w-6" />
            {showFilters ? 'Hide Filters' : 'More Filters'}
          </button>

          {/* Apply Filter Button */}
          <button
            onClick={handleFilter}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm"
          >
            <Check size={20} className="mr-2 sm:h-6 sm:w-6" />
            Apply
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:border-red-300 hover:text-red-500 text-sm"
          >
            <X size={20} className="mr-2 sm:h-6 sm:w-6" />
            Reset
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200 transition-all duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Price Range Filter */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center text-sm">
                <DollarSign size={20} className="mr-2 text-blue-600 sm:h-6 sm:w-6" />
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </h3>
              <div className="px-4">
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newMin = parseInt(e.target.value);
                    setPriceRange([newMin, Math.max(newMin, priceRange[1])]);
                  }}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer range-slider mb-4"
                />
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value);
                    setPriceRange([Math.min(priceRange[0], newMax), newMax]);
                  }}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer range-slider"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>$0</span>
                  <span>${maxPrice}</span>
                </div>
              </div>
            </div>

            {/* Facilities Filter */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center text-sm">
                <Wifi size={20} className="mr-2 text-blue-600 sm:h-6 sm:w-6" />
                Amenities & Facilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {facilities.map((facility) => (
                  <div
                    key={facility}
                    onClick={() => toggleFacility(facility)}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedFacilities.includes(facility)
                        ? 'bg-blue-50 border border-blue-300 shadow-sm'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                      selectedFacilities.includes(facility) ? 'bg-blue-500' : 'border border-gray-300'
                    }`}>
                      {selectedFacilities.includes(facility) && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <span className="text-gray-700 text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(to right, #4f46e5, #3b82f6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .range-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(to right, #4f46e5, #3b82f6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .range-slider:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default RoomSearch;