import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, message, Popconfirm, Space } from 'antd';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/users/all');
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      message.error('Failed to load users');
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      message.success('User deleted successfully');
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error(error);
      message.error('Failed to delete user');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Is Admin',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      render: (isAdmin) => (
        <Tag color={isAdmin ? 'green' : 'volcano'}>
          {isAdmin ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => handleDeleteUser(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button style={{ backgroundColor: 'blueviolet', color: 'white' }}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>

      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
      <Space style={{ 
        marginBottom: 8,
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center',
        
        }}>
        <Button type="primary" onClick={fetchUsers}>
          Reload Users
        </Button>
      </Space>
    </div>
  );
};

export default Users;
