import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { isWithinInterval, format } from 'date-fns';
import { Box, Typography } from '@mui/material';

const HotelBookingCalendar = () => {
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

  // Already booked date ranges
  const bookedDates = [
    { start: new Date(2024, 9, 10), end: new Date(2024, 9, 15) }, // Booked from Oct 10 - Oct 15, 2024
    { start: new Date(2024, 9, 18), end: new Date(2024, 9, 22) }, // Booked from Oct 18 - Oct 22, 2024
  ];

  // Check if a date is within a booked range
  const isBooked = (date) => {
    return bookedDates.some((range) =>
      isWithinInterval(date, { start: range.start, end: range.end })
    );
  };

  // Disable booked dates
  const shouldDisableDate = (date) => isBooked(date);

  // Custom render for day to show booked dates in red
  const renderDay = (date, selectedDateRange, DayComponentProps) => {
    const isBookedDay = isBooked(date);

    return (
      <Box
        sx={{
          backgroundColor: isBookedDay ? 'red' : 'transparent',
          color: isBookedDay ? 'white' : 'inherit',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography {...DayComponentProps}>
          {format(date, 'd')}
        </Typography>
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangeCalendar']}>
        <DateRangeCalendar
        value={selectedDateRange}
        onChange={(newValue) => setSelectedDateRange(newValue)}
        shouldDisableDate={shouldDisableDate}
        renderDay={renderDay}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default HotelBookingCalendar;
