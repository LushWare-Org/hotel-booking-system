const express = require('express');
const router = express.Router();
const Room = require('../models/Room'); 

// Search and filter endpoint
router.get('/search', async (req, res) => {
    try {
        const { type, features, minPrice, maxPrice, query } = req.query;

        const filter = {};

        // Search by query (e.g., room name or description)
        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } }, 
                { description: { $regex: query, $options: 'i' } },
            ];
        }

        // Filter by room type
        if (type) {
            filter.type = type;
        }

        // Filter by facilities
        if (features) {
            const featureList = features.split(',');
            filter.facilities = { $all: featureList }; // Ensure all selected features match
        }

        // Filter by price range (use 'rentPerDay' instead of 'price')
        if (minPrice || maxPrice) {
            filter.rentPerDay = {}; // Adjusted field name
            if (minPrice) filter.rentPerDay.$gte = Number(minPrice);
            if (maxPrice) filter.rentPerDay.$lte = Number(maxPrice);
        }

        // Fetch rooms based on the filter
        const rooms = await Room.find(filter);
        res.json(rooms);
    } catch (error) {
        console.error('Error during search and filter:', error);
        res.status(500).json({ message: 'Error during search and filter', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Failed to retrieve rooms' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        console.error('Error fetching room:', error);
        res.status(500).json({ error: 'Failed to retrieve room' });
    }
});

// Create a new room (Admin only)
router.post('/', async (req, res) => {
    const { name, maxCount, rentPerDay, phoneNumber, type, description, facilities, imageUrls } = req.body;

    console.log('Received data:', {
        name,
        maxCount,
        rentPerDay,
        phoneNumber,
        type,
        description,
        facilities,
        imageUrls,
    });

    try {
        const newRoom = new Room({
            name,
            maxCount,
            rentPerDay,
            phoneNumber,
            type,
            description,
            facilities,
            imageUrls, 
            currentBookings: [], 
        });
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (error) {
        console.error('Error saving room:', error);
        res.status(500).json({ message: 'Failed to save room', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        room.name = req.body.name || room.name;
        room.maxCount = req.body.maxCount || room.maxCount;
        room.rentPerDay = req.body.rentPerDay || room.rentPerDay;
        room.phoneNumber = req.body.phoneNumber || room.phoneNumber;
        room.type = req.body.type || room.type;
        room.description = req.body.description || room.description;
        room.facilities = req.body.facilities || room.facilities;

        if (req.body.imageUrls) {
            room.imageUrls = req.body.imageUrls; // Update with new image URLs
        }

        const updatedRoom = await room.save();
        res.json(updatedRoom);
    } catch (error) {
        console.error('Error updating room:', error);
        res.status(500).json({ message: 'Failed to update room', error: error.message });
    }
});

// Delete a room (Admin only)
router.delete('/:id', async (req, res) => {
    try {
        const roomId = req.params.id;
        const deletedRoom = await Room.findByIdAndDelete(roomId);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ message: 'Failed to delete room', error });
    }
});

module.exports = router;
