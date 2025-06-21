import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Dialog, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Carousel } from 'react-responsive-carousel';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import dayjs from 'dayjs';
import { 
  Search, Wifi, Coffee, Droplet, ShowerHead, Shirt, Lock, Phone, Star, Map, Tv, Wind, Dumbbell
} from 'lucide-react';
import BookingCalendar from './Bookingcalender';
import RoomSearch from './RoomSearch';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchFilteredRooms, setSearchFilteredRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [calendarSearchTerm, setCalendarSearchTerm] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // Facility icons 
  const facilityIcons = {
    "Free Wi-Fi": <Wifi className="text-blue-500 h-5 w-5 sm:h-6 sm:w-6" />,
    "Minibar": <Coffee className="text-amber-700 h-5 w-5 sm:h-6 sm:w-6" />,
    "Shower WC": <ShowerHead className="text-blue-400 h-5 w-5 sm:h-6 sm:w-6" />,
    "Bathrobe": <Shirt className="text-gray-500 h-5 w-5 sm:h-6 sm:w-6" />,
    "In-room Digital Safe": <Lock className="text-gray-700 h-5 w-5 sm:h-6 sm:w-6" />,
    "Iron and Iron Board": <Shirt className="text-gray-500 h-5 w-5 sm:h-6 sm:w-6" />,
    "Ocean View": <Map className="text-indigo-500 h-5 w-5 sm:h-6 sm:w-6" />,
    "Private Pool": <Droplet className="text-cyan-500 h-5 w-5 sm:h-6 sm:w-6" />,
    "Air Conditioning": <Wind className="text-blue-300 h-5 w-5 sm:h-6 sm:w-6" />,
    "Flat Screen TV": <Tv className="text-gray-600 h-5 w-5 sm:h-6 sm:w-6" />,
    "Spa Access": <Star className="text-pink-500 h-5 w-5 sm:h-6 sm:w-6" />,
    "Gym Access": <Dumbbell className="text-yellow-600 h-5 w-5 sm:h-6 sm:w-6" />
  };

  const baseRoomCategories = [
    { id: 'all', name: 'All Rooms' },
    { id: 'standard', name: 'Standard' },
    { id: 'deluxe', name: 'Deluxe' },
    { id: 'suites', name: 'Suites' },
    { id: 'family', name: 'Family' },
    { id: 'accessible', name: 'Accessible' }
  ];

  const [roomCategories, setRoomCategories] = useState(baseRoomCategories);

  // Initialize search data 
  useEffect(() => {
    localStorage.removeItem('fromDate');
    localStorage.removeItem('toDate');
    localStorage.removeItem('searchTerm');

    if (location.state && (location.state.fromDate || location.state.toDate || location.state.searchTerm)) {
      const stateFromDate = location.state.fromDate;
      const stateToDate = location.state.toDate;
      const stateSearchTerm = location.state.searchTerm;

      // Always convert to dayjs for date pickers
      const newFromDate = stateFromDate ? dayjs(stateFromDate) : null;
      const newToDate = stateToDate ? dayjs(stateToDate) : null;
      const newSearchTerm = stateSearchTerm || '';

      console.log('Initializing search data from location.state:', { newFromDate, newToDate, newSearchTerm });

      setFromDate(newFromDate);
      setToDate(newToDate);
      setCalendarSearchTerm(newSearchTerm);

      if (newSearchTerm || (newFromDate && newToDate)) {
        setRoomCategories([
          ...baseRoomCategories,
          { id: 'available', name: 'Available Rooms' }
        ]);
        setActiveTab('available');
      }
    } else {
      console.log('No valid location.state, clearing search data');
      setFromDate(null);
      setToDate(null);
      setCalendarSearchTerm('');
      setActiveTab('all');
      setRoomCategories(baseRoomCategories);
    }
  }, [location.key]);

  const handleDateRangeSelect = (from, to) => {
    setFromDate(from ? dayjs(from) : null);
    setToDate(to ? dayjs(to) : null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fetch rooms and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        let roomsUrl = 'http://localhost:8000/api/rooms';
        if (fromDate && toDate) {
          roomsUrl += `?fromDate=${dayjs(fromDate).format('YYYY-MM-DD')}&toDate=${dayjs(toDate).format('YYYY-MM-DD')}`;
        }
        console.log('Fetching rooms from:', roomsUrl);
        const roomsResponse = await axios.get(roomsUrl);
        console.log('Rooms API response:', roomsResponse.data);
        if (!Array.isArray(roomsResponse.data)) {
          console.error('Rooms API returned non-array data:', roomsResponse.data);
          setRooms([]);
          setFilteredRooms([]);
          setSearchFilteredRooms([]);
          return;
        }

        let availableRooms = roomsResponse.data;

        if (fromDate && toDate) {
          try {
            const bookingsUrl = 'http://localhost:8000/api/bookings';
            console.log('Fetching bookings from:', bookingsUrl);
            const bookingsResponse = await axios.get(bookingsUrl, {
              params: {
                fromDate: dayjs(fromDate).format('YYYY-MM-DD'),
                toDate: dayjs(toDate).format('YYYY-MM-DD')
              }
            });
            console.log('Bookings API response:', bookingsResponse.data);
            setBookings(bookingsResponse.data);

            const bookedRoomIds = bookingsResponse.data
              .filter(booking => {
                const bookingFrom = dayjs(booking.fromDate);
                const bookingTo = dayjs(booking.toDate);
                const searchFrom = dayjs(fromDate);
                const searchTo = dayjs(toDate);
                return (
                  bookingFrom.isBefore(searchTo) && bookingTo.isAfter(searchFrom)
                );
              })
              .map(booking => booking.roomId);

            console.log('Booked room IDs:', bookedRoomIds);
            availableRooms = roomsResponse.data.filter(room => !bookedRoomIds.includes(room._id));
            console.log('Available rooms after booking filter:', availableRooms.map(room => ({ id: room._id, name: room.name })));
          } catch (bookingError) {
            console.warn('Error fetching bookings, assuming API filters rooms:', bookingError.response?.data || bookingError.message);
          }
        }

        setRooms(availableRooms);
        setFilteredRooms(availableRooms);
        setSearchFilteredRooms(availableRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error.response?.data || error.message);
        setRooms([]);
        setFilteredRooms([]);
        setSearchFilteredRooms([]);
        setBookings([]);
      }
    };
    fetchData();
  }, [fromDate, toDate]);

  useEffect(() => {
    console.log('searchFilteredRooms updated:', searchFilteredRooms.map(room => ({ id: room._id, name: room.name })));
    filterByCategory(activeTab);
  }, [searchFilteredRooms]);

  const resetSearch = () => {
    console.log('Resetting search');
    setFromDate(null);
    setToDate(null);
    setCalendarSearchTerm('');
    setActiveTab('all');
    setRoomCategories(baseRoomCategories);
    setFilteredRooms(rooms);
    setSearchFilteredRooms(rooms);
    localStorage.removeItem('fromDate');
    localStorage.removeItem('toDate');
    localStorage.removeItem('searchTerm');
    navigate('/rooms', { replace: true, state: {} });
  };

  const handleRoomClick = (room) => {
    console.log('Room clicked:', room);
    setSelectedRoom(room);
    setCurrentImageIndex(0);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    console.log('Closing dialog');
    setOpenDialog(false);
  };

  // In the DialogActions Book Now button, ensure fromDate and toDate are dayjs objects and not null before proceeding
  const handleOpenPaymentDialog = () => {
    console.log('Opening payment dialog for:', selectedRoom);
    if (selectedRoom && fromDate && toDate && dayjs.isDayjs(fromDate) && dayjs.isDayjs(toDate)) {
      localStorage.setItem('fromDate', fromDate.format('YYYY-MM-DD'));
      localStorage.setItem('toDate', toDate.format('YYYY-MM-DD'));
      navigate(`/rooms/payment/${selectedRoom._id}`, {
        state: {
          fromDate: fromDate.toDate(),
          toDate: toDate.toDate(),
        },
      });
    } else {
      alert('Please select check-in and check-out dates before booking.');
    }
  };

  const filterByCategory = (category) => {
    setActiveTab(category);
    console.log('Filtering by category:', category);
    if (category === 'all' || category === 'available') {
      setFilteredRooms(searchFilteredRooms);
    } else {
      const filtered = searchFilteredRooms.filter(room =>
        room.type && (
          (category === 'standard' && (
            room.type.toLowerCase().includes('standard') ||
            room.type.toLowerCase().includes('single') ||
            room.type.toLowerCase().includes('double') ||
            room.type.toLowerCase() === 'singlebedroom1' ||
            room.type.toLowerCase() === 'doublebedroom1'
          )) ||
          (category === 'deluxe' && room.type.toLowerCase().includes('deluxe')) ||
          (category === 'suites' && (
            room.type.toLowerCase().includes('suite') ||
            room.type.toLowerCase().includes('penthouse')
          )) ||
          (category === 'family' && room.type.toLowerCase().includes('family')) ||
          (category === 'accessible' && room.type.toLowerCase().includes('accessible'))
        )
      );
      console.log('Filtered rooms in filterByCategory:', filtered.map(room => ({ id: room._id, name: room.name, type: room.type })));
      setFilteredRooms(filtered);
    }
  };

  const nextImage = () => {
    if (selectedRoom && selectedRoom.imageUrls) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedRoom.imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedRoom && selectedRoom.imageUrls) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedRoom.imageUrls.length - 1 : prevIndex - 1
      );
    }
  };

  // Log props passed to RoomSearch
  console.log('Props passed to RoomSearch:', {
    roomsCount: rooms.length,
    fromDate: fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : null,
    toDate: toDate ? dayjs(toDate).format('YYYY-MM-DD') : null,
    bookingsCount: bookings.length
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div
        className="relative h-[720px] bg-cover bg-fixed bg-center overflow-hidden"
        style={{
          backgroundImage: "url('https://i.postimg.cc/76pCMfrN/pexels-asadphoto-2245290.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10 px-6 max-w-4xl mx-auto transform transition-all duration-700 hover:scale-105">
            <div className="relative mb-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg">
                Luxury Accommodations
              </h1>
              <div className="h-1 w-24 bg-blue-400 mx-auto"></div>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
              Experience unparalleled comfort and elegance in our meticulously designed sanctuaries of relaxation
            </p>
          </div>
        </div>
      </div>

      {/* Search Components */}
      <div className="relative z-20 max-w-4xl mx-auto -mt-64 sm:-mt-60 px-4 sm:px-0">
        <div className="bg-transparent rounded-xl text-white shadow-xl p-4 sm:p-6 transition-all duration-300">
          <BookingCalendar
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            searchTerm={calendarSearchTerm}
            setSearchTerm={setCalendarSearchTerm}
            onSearch={() => setActiveTab('available')}
            resetSearch={resetSearch}
            onDateRangeSelect={handleDateRangeSelect}
          />
        </div>
        <RoomSearch
          setFilteredRooms={setSearchFilteredRooms}
          rooms={rooms}
          fromDate={fromDate}
          toDate={toDate}
          bookings={bookings}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto pt-4 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-7xl text-blue-100 opacity-70 font-serif">❝</span>
            <h2 className="font-serif text-5xl font-bold mb-3 text-gray-800 relative">
              Find Your Perfect Stay
            </h2>
          </div>
          {filteredRooms.length > 0 ? (
            <Typography variant="h6" className="text-gray-600 mt-2 text-sm sm:text-base">
              {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'} {activeTab === 'available' ? 'available' : 'found'}
              {activeTab === 'available' && fromDate && toDate ? ` for ${dayjs(fromDate).format('MMM D, YYYY')} to ${dayjs(toDate).format('MMM D, YYYY')}` : ''}
            </Typography>
          ) : (
            <Typography variant="h6" className="text-gray-600 mt-2 text-sm sm:text-base">
              No rooms {activeTab === 'available' ? 'available' : 'found'}
              {activeTab === 'available' && fromDate && toDate ? ` for ${dayjs(fromDate).format('MMM D, YYYY')} to ${dayjs(toDate).format('MMM D, YYYY')}` : ''}
            </Typography>
          )}
        </div>

        {/* Room Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <div className="flex space-x-2 mx-auto bg-blue-50 p-1 rounded-full">
            {roomCategories.map(category => (
              <button
                key={category.id}
                onClick={() => filterByCategory(category.id)}
                className={`py-2 px-6 rounded-full whitespace-nowrap transition-all duration-300 text-sm sm:text-base ${
                  activeTab === category.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-transparent text-gray-700 hover:bg-blue-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards */}
        <Grid container spacing={4}>
          {Array.isArray(filteredRooms) && filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <Grid item key={room._id} xs={12} sm={6} md={4}>
                <div
                  className="room-card max-w-[90vw] mx-auto"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'left',
                    boxSizing: 'border-box',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    paddingBottom: '2vh',
                    backgroundColor: '#fff',
                    width: '100%',
                    height: '100%',
                    margin: '0',
                  }}
                  onClick={() => handleRoomClick(room)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0px 8px 12px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <Carousel
                    showThumbs={false}
                    infiniteLoop
                    useKeyboardArrows
                    autoPlay
                    showStatus={false}
                    showIndicators={true}
                    style={{ width: '100%', height: '38%' }}
                    className="room-carousel"
                  >
                    {room.imageUrls && Array.isArray(room.imageUrls) && room.imageUrls.length > 0 ? (
                      room.imageUrls.map((image, index) => (
                        <div key={index}>
                          <img
                            src={image}
                            alt={`${room.name || 'Room'} ${index}`}
                            style={{
                              width: '100%',
                              height: '30vh',
                              objectFit: 'cover',
                            }}
                            className="room-image"
                            onError={(e) => (e.target.src = 'https://via.placeholder.com/800x500')}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center w-full h-48 sm:h-[30vh] bg-gray-100">
                        <p className="text-gray-500 text-sm">No images available</p>
                      </div>
                    )}
                  </Carousel>
                  <p
                    style={{
                      position: 'relative',
                      top: '-28vh',
                      left: '1.5vw',
                      zIndex: '1',
                      backgroundColor: 'rgba(0, 0, 50, 0.8)',
                      color: '#fff',
                      width: 'fit-content',
                      padding: '4px 8px',
                    }}
                    className="room-type"
                  >
                    {room.type || 'Unknown'}
                  </p>
                  <div style={{ height: '55%', padding: '1vh 1vw' }} className="room-content">
                    <h3
                      style={{
                        margin: '0px 0vw 1vh 0vw',
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                        color: '#333',
                      }}
                      className="room-name"
                    >
                      {room.name || 'Unnamed Room'}
                    </h3>
                    <p
                      style={{
                        margin: '0 1vw 0 0vw',
                        textAlign: 'left',
                        fontSize: '0.9rem',
                        color: '#555',
                      }}
                      className="room-description"
                    >
                      {room.description || 'No description available'}
                    </p>
                    <div style={{ backgroundColor: '#0A369D', height: '5px', width: '20%', margin: '1vh 0 1vh 0' }}></div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: '0.6vw',
                        alignItems: 'center',
                        overflowX: 'auto',
                        width: '100%',
                        height: '30%',
                      }}
                      className="room-facilities"
                    >
                      {room.facilities && Array.isArray(room.facilities) && room.facilities.length > 0 ? (
                        room.facilities.map((facility, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minWidth: '5vw',
                              maxWidth: '6vw',
                              flexShrink: 0,
                            }}
                            className="facility-item"
                          >
                            {facilityIcons[facility] || <Shirt className="text-gray-500 h-5 w-5 sm:h-6 sm:w-6" />}
                            <span style={{ fontSize: '0.8rem', marginTop: '4px', textAlign: 'center' }} className="facility-text">
                              {facility}
                            </span>
                          </div>
                        ))
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: '#555' }} className="no-facilities">
                          No facilities listed
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left', marginTop: '1vh' }} className="room-footer">
                      <div>
                        <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.5)', marginBottom: '0' }} className="price-label">
                          Starting From
                        </p>
                        <p
                          style={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: 'black',
                          }}
                          className="room-price"
                        >
                          ${room.rentPerDay || 'N/A'}
                          <span style={{ fontSize: '20px', color: 'rgba(0,0,0,0.5)' }} className="price-unit">/night</span>
                        </p>
                      </div>
                      <button
                        style={{
                          backgroundColor: '#0A369D',
                          color: '#fff',
                          padding: '5px 15px',
                          margin: '2vh 0 0 0',
                          height: '40px',
                          borderRadius: '5px',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        className="book-now"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </Grid>
            ))
          ) : (
            <div className="w-full text-center py-10">
              <div className="bg-blue-50 rounded-lg p-8 max-w-md mx-auto">
                <Search className="mx-auto mb-4 text-blue-500 h-12 w-12" />
                <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">
                  No rooms {activeTab === 'available' ? 'available' : 'found'}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {activeTab === 'available' && fromDate && toDate
                    ? `No rooms available for ${dayjs(fromDate).format('MMM D, YYYY')} to ${dayjs(toDate).format('MMM D, YYYY')}`
                    : `No rooms ${activeTab === 'available' ? 'available' : 'found'} for the selected category.`}
                  . Try adjusting your search criteria or check back later.
                </p>
              </div>
            </div>
          )}
        </Grid>
      </div>

      {/* Room Detail Modal */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            minHeight: '79vh',
            borderRadius: '10px',
            maxWidth: '900px', // Desktop max width
          },
        }}
      >
        {selectedRoom && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="room-detail-modal">
              <div style={{ position: 'relative', width: '100%' }}>
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  useKeyboardArrows
                  autoPlay
                  renderArrowPrev={(onClickHandler, hasPrev) =>
                    hasPrev && (
                      <div
                        onClick={onClickHandler}
                        style={{
                          position: 'absolute',
                          left: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          zIndex: 10,
                        }}
                      >
                        <KeyboardArrowLeft style={{ fontSize: '40px', color: '#fff' }} />
                      </div>
                    )
                  }
                  renderArrowNext={(onClickHandler, hasNext) =>
                    hasNext && (
                      <div
                        onClick={onClickHandler}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          zIndex: 10,
                        }}
                      >
                        <KeyboardArrowRight style={{ fontSize: '40px', color: '#fff' }} />
                      </div>
                    )
                  }
                >
                  {selectedRoom.imageUrls && Array.isArray(selectedRoom.imageUrls) && selectedRoom.imageUrls.length > 0 ? (
                    selectedRoom.imageUrls.map((url, index) => (
                      <div key={index}>
                        <img
                          src={url}
                          alt={`${selectedRoom.name || 'Room'}`}
                          style={{
                            width: '100%',
                            height: '350px',
                            objectFit: 'cover',
                          }}
                          onError={(e) => (e.target.src = 'https://via.placeholder.com/800x500')}
                        />
                      </div>
                    ))
                  ) : (
                    <div style={{ width: '100%', height: '350px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p>No images available</p>
                    </div>
                  )}
                </Carousel>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: '10px 20px',
                    zIndex: 5,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      color: '#fff',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {selectedRoom.name || 'Unnamed Room'}
                  </Typography>
                </div>
              </div>
              <DialogContent style={{ padding: '20px' }}>
                <Typography
                  variant="body1"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#2b2a78', marginBottom: '20px', textAlign: 'center' }}
                >
                  {selectedRoom.description || 'No description available'}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2} style={{ padding: '0 1vw' }}>
                  <Typography
                    variant="body1"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#2b2a78' }}
                  >
                    Max Count: {selectedRoom.maxCount || 'N/A'}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#2b2a78', display: 'flex', alignItems: 'center' }}
                  >
                    <Phone className="mr-2 text-[#2b2a78]" size={20} />
                    {selectedRoom.phoneNumber || 'Contact available'}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#2b2a78' }}
                  >
                    <span style={{ fontWeight: 'bold', fontSize: '25px' }}>${selectedRoom.rentPerDay || 'N/A'}</span>/night
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={2}
                  alignItems="center"
                  style={{
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    margin: '0 1vw 1vh 1vw',
                  }}
                >
                  {Array.isArray(selectedRoom.facilities) && selectedRoom.facilities.length > 0 ? (
                    selectedRoom.facilities.map((facility, index) => (
                      <Box key={index} display="flex" alignItems="center" style={{ margin: '5px 10px' }}>
                        {facilityIcons[facility] || <Shirt className="text-gray-500 h-5 w-5" />}
                        <Typography
                          variant="body2"
                          style={{
                            marginLeft: '8px',
                            fontWeight: 'bold',
                            fontFamily: 'Playfair Display, serif',
                            color: '#6B4F4F',
                          }}
                        >
                          {facility}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        color: '#6B4F4F',
                      }}
                    >
                      No facilities listed
                    </Typography>
                  )}
                </Box>
              </DialogContent>
              <DialogActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: '20px' }}>
                <Box display="flex" flexDirection="row" gap={2} mb={2} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                  <DatePicker
                    label="Check-in Date"
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                    minDate={dayjs()}
                    slotProps={{
                      textField: { size: 'small', fullWidth: true },
                    }}
                    sx={{ flex: 1 }}
                  />
                  <DatePicker
                    label="Check-out Date"
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    minDate={fromDate ? dayjs(fromDate).add(1, 'day') : dayjs()}
                    slotProps={{
                      textField: { size: 'small', fullWidth: true },
                    }}
                    sx={{ flex: 1 }}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
                  <Button
                    onClick={handleCloseDialog}
                    style={{
                      border: '1px solid red',
                      color: '#633434',
                      padding: '5px 10px',
                      borderRadius: '8px',
                      flex: 1,
                      margin: '0 5px',
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    style={{
                      backgroundColor: '#1E3A8A',
                      color: '#fff',
                      padding: '5px 10px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      flex: 1,
                      margin: '0 5px',
                    }}
                    onClick={handleOpenPaymentDialog}
                  >
                    Book Now
                  </Button>
                </Box>
              </DialogActions>
            </div>
          </LocalizationProvider>
        )}
      </Dialog><br/><br/>

      <style jsx>{`
        .room-detail-modal {
          /* Desktop styles remain unchanged */
        }

        @media (max-width: 600px) {
          .room-detail-modal {
            padding: 10px;
          }

          .room-detail-modal .carousel {
            height: 200px !important;
          }

          .room-detail-modal .carousel img {
            height: 200px !important;
            object-fit: cover;
          }

          .room-detail-modal .MuiTypography-body1 {
            font-size: 0.9rem !important;
            line-height: 1.4;
            margin-bottom: 12px !important;
          }

          .room-detail-modal .MuiBox-root {
            padding: 8px !important;
            margin: 0 0.5vw 0.5vh 0.5vw !important;
          }

          .room-detail-modal .MuiBox-root .MuiTypography-body2 {
            font-size: 0.8rem !important;
          }

          .room-detail-modal .MuiDialogContent-root {
            padding: 10px !important;
          }

          .room-detail-modal .MuiDialogActions-root {
            padding: 10px !important;
          }

          .room-detail-modal .MuiButton-root {
            font-size: 0.85rem !important;
            padding: 8px 16px !important;
            margin: 5px 0 !important;
          }

          .room-detail-modal .MuiSvgIcon-root {
            font-size: 30px !important;
          }

          .room-detail-modal .MuiTypography-root[style*="font-size: 20px"] {
            font-size: 16px !important;
          }

          .room-detail-modal .MuiTypography-root[style*="font-size: 25px"] {
            font-size: 20px !important;
          }
        }

        @media (max-width: 640px) {
          .room-card {
            max-width: 90vw;
            margin: 0 auto;
            padding-bottom: 16px;
          }
          .room-carousel .room-image {
            height: 192px !important;
          }
          .room-type {
            font-size: 0.75rem !important;
            padding: 4px 8px !important;
            top: -180px !important;
            left: 8px !important;
          }
          .room-content {
            padding: 16px !important;
            height: auto !important;
          }
          .room-name {
            font-size: 1.125rem !important;
          }
          .room-description {
            font-size: 0.875rem !important;
            line-height: 1.25rem;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .room-facilities {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
            overflow-x: visible !important;
            height: auto !important;
          }
          .facility-item {
            min-width: auto !important;
            max-width: none !important;
          }
          .facility-text {
            font-size: 0.875rem !important;
            text-align: center;
          }
          .no-facilities {
            font-size: 0.875rem !important;
            grid-column: span 2 !important;
          }
          .room-footer {
            align-items: center !important;
            margin-top: 16px !important;
          }
          .price-label {
            font-size: 0.75rem !important;
          }
          .room-price {
            font-size: 1.5rem !important;
          }
          .price-unit {
            font-size: 1rem !important;
          }
          .book-now {
            padding: 8px 16px !important;
            font-size: 0.875rem !important;
            height: auto !important;
            line-height: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Rooms;