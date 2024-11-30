import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Select, message as antdMessage, Checkbox, Table } from 'antd';

const { Option } = Select;

const NotificationForm = () => {
  const [type, setType] = useState('email');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sendToAll, setSendToAll] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await axios.get('/api/users/all'); 
      setUsers(response.data); 
    } catch (error) {
      console.error('Error fetching users:', error);
      antdMessage.error('Failed to fetch registered users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const sendNotification = async () => {
    const recipients =
      type === 'email'
        ? sendToAll
          ? users.map((user) => user.email)
          : selectedUsers
        : [phoneNumber];

    const payload = { type, recipients, subject, message };

    try {
      const response = await axios.post('/api/notifications/send-to-users', payload);
      if (response.data.success) {
        antdMessage.success('Notification sent successfully');
        resetForm();
      } else {
        antdMessage.error(response.data.message || 'Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error.response || error); 
      antdMessage.error('Failed to send notification');
    }
  };

  const resetForm = () => {
    setType('email');
    setSelectedUsers([]);
    setSubject('');
    setMessage('');
    setSendToAll(false);
    setPhoneNumber('');
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
      title: 'Select',
      key: 'select',
      render: (text, record) => (
        <Checkbox
          checked={selectedUsers.includes(record.email)}
          onChange={(e) => {
            const newSelectedUsers = e.target.checked
              ? [...selectedUsers, record.email]
              : selectedUsers.filter((email) => email !== record.email);
            setSelectedUsers(newSelectedUsers);
          }}
          disabled={sendToAll || type === 'sms'}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Send Notification</h2>
      <Select
        value={type}
        onChange={(value) => setType(value)}
        style={{ width: '100%', marginBottom: '10px' }}
      >
        <Option value="email">Email</Option>
        <Option value="sms">SMS</Option>
      </Select>
      {type === 'email' && (
        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
      )}
      <Input.TextArea
        rows={4}
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      {type === 'sms' && (
        <Input
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
      )}
      {type === 'email' && (
        <Checkbox
          checked={sendToAll}
          onChange={(e) => setSendToAll(e.target.checked)}
          style={{ marginBottom: '10px' }}
        >
          Send to All Users
        </Checkbox>
      )}
      {type === 'email' && (
        <Table
          dataSource={users}
          columns={columns}
          rowKey="email"
          loading={loadingUsers}
          pagination={{ pageSize: 5 }}
          style={{ marginBottom: '10px' }}
        />
      )}
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button
          type="primary"
          onClick={sendNotification}
          disabled={
            !message || (type === 'sms' && !phoneNumber) || (type === 'email' && !sendToAll && selectedUsers.length === 0)
          }
        >
          Send Notification
        </Button>
        <Button onClick={resetForm} danger>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default NotificationForm;
