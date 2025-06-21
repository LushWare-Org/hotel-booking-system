import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, message, Popconfirm, Space, Switch } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
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
      const { data } = await axios.get('http://localhost:8000/api/users/all');
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
      await axios.delete(`http://localhost:8000/api/users/${userId}`);
      message.success('User deleted successfully');
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error(error);
      message.error('Failed to delete user');
    }
  };

  const handleToggleAdminStatus = async (userId, currentStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/users/${userId}/admin`, {
        isAdmin: !currentStatus,
      });
      message.success('Admin status updated successfully');
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error(error);
      message.error('Failed to update admin status');
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
      render: (isAdmin, record) => (
        <Space>
          <Tag color={isAdmin ? 'green' : 'volcano'}>
            {isAdmin ? 'Yes' : 'No'}
          </Tag>
          <Popconfirm
            title={`Are you sure you want to ${
              isAdmin ? 'revoke admin rights' : 'grant admin rights'
            } for this user?`}
            onConfirm={() => handleToggleAdminStatus(record._id, isAdmin)}
            okText="Yes"
            cancelText="No"
          >
            <Switch checked={isAdmin} />
          </Popconfirm>
        </Space>
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
          <Button
            style={{ backgroundColor: 'white', color: 'red', border: '1px solid red' }}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];


  return (
    <div style={{ padding: '0px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold', fontFamily: 'Playfair Display' }}>Users</h1>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
      <Space
        style={{
          marginBottom: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button type="primary" onClick={fetchUsers} icon={<ReloadOutlined />}>
          Reload Users
        </Button>
      </Space>
    </div>
  );
};

export default Users;
