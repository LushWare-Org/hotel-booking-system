import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Slider,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Button,
} from '@mui/material';

const RoomSearch = ({ setFilteredRooms, rooms }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roomType, setRoomType] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const roomTypes = ["Single", "Double", "Suite", "Deluxe", "Penthouse", "Family", "Standard", "Accessible"]; 
  const allFacilities = [
    "Free Wi-Fi",
    "Minibar",
    "Shower WC",
    "Bathrobe",
    "In-room Digital Safe",
    "Iron and Iron Board",
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterRooms(value, roomType, selectedFacilities, priceRange);
  };

  const handleRoomTypeChange = (e) => {
    const value = e.target.value;
    setRoomType(value);
    filterRooms(searchTerm, value, selectedFacilities, priceRange);
  };

  const handleFacilitiesChange = (facility) => {
    const updatedFacilities = selectedFacilities.includes(facility)
      ? selectedFacilities.filter((f) => f !== facility)
      : [...selectedFacilities, facility];

    setSelectedFacilities(updatedFacilities);
    filterRooms(searchTerm, roomType, updatedFacilities, priceRange);
  };

  const handlePriceRangeChange = (e, newValue) => {
    setPriceRange(newValue);
    filterRooms(searchTerm, roomType, selectedFacilities, newValue);
  };

  const filterRooms = (term, type, facilities, price) => {
    let filtered = rooms;

    // Filter by search term
    if (term) {
      filtered = filtered.filter(
        (room) =>
          room.name.toLowerCase().includes(term.toLowerCase()) ||
          room.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Filter by room type
    if (type) {
      filtered = filtered.filter((room) => room.type === type);
    }

    // Filter by facilities
    if (facilities.length > 0) {
      filtered = filtered.filter(
        (room) =>
          Array.isArray(room.facilities) &&
          facilities.every((facility) => room.facilities.includes(facility))
      );
    }

    // Filter by price range
    if (price) {
      filtered = filtered.filter(
        (room) => room.rentPerDay >= price[0] && room.rentPerDay <= price[1]
      );
    }

    setFilteredRooms(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setRoomType("");
    setSelectedFacilities([]);
    setPriceRange([0, 1000]);
    setFilteredRooms(rooms); 
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search rooms..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />

      {/* Room Type filter */}
      <FormControl fullWidth style={{ marginBottom: "10px" }}>
        <InputLabel>Room Type</InputLabel>
        <Select value={roomType} onChange={handleRoomTypeChange} label="Room Type">
          <MenuItem value="">Any</MenuItem>
          {roomTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Facilities filter */}
      <div style={{ marginBottom: "10px" }}>
        <Typography variant="h6">Facilities</Typography>
        {allFacilities.map((facility) => (
          <FormControlLabel
            key={facility}
            control={
              <Checkbox
                checked={selectedFacilities.includes(facility)}
                onChange={() => handleFacilitiesChange(facility)}
              />
            }
            label={facility}
          />
        ))}
      </div>

      {/* Price Range filter */}
      <div style={{ marginBottom: "10px" }}>
        <Typography variant="h6">Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `$${value}`}
          min={0}
          max={1000}
        />
      </div>

      <Button
        variant="contained"
        color="secondary"
        onClick={resetFilters}
        style={{ marginTop: "10px" }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default RoomSearch;
