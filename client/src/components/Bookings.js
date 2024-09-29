import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'Room',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: 'From Date',
    dataIndex: 'from_date',
    key: 'from_date',
  },
  {
    title: 'To Date',
    dataIndex: 'to_date',
    key: 'to_date',
  },
  {
    title: 'Total Days',
    dataIndex: 'total_days',
    key: 'total_days',
  },
  {
    title: 'Total Amount',
    dataIndex: 'total_amount',
    key: 'total_amount',
  },
  {
    title: 'Transaction ID',
    dataIndex: 'transaction_id',
    key: 'transaction_id',
  },
  {
    title: 'Status', 
    dataIndex: 'status', 
    key: 'status',
    render: (status) => {
      const color = status === 'Cancelled' ? 'red' : 'green';
      return <Tag color={color}>{status}</Tag>;
    },
  },
];

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/book/all');
        setBookings(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <Table columns={columns} dataSource={bookings} loading={loading} />
    </div>
  );
};

export default Bookings;
