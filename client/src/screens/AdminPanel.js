// src/pages/AdminPanel.js
import React, { useState } from 'react';
import { Tabs } from 'antd';
import AllRooms from '../components/AllRooms';
import AddRoom from '../components/AddRoom';
import Bookings from '../components/Bookings';
import Users from '../components/Users';
import NotificationForm from '../components/NotificationForm';
import ManageNotifications from '../components/ManageNotifications';
import ContactInquiries from '../components/ContactInquiries'; 

const { TabPane } = Tabs;

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <AllRooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <AddRoom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
        <TabPane tab="Notification Manage" key="5">
          <ManageNotifications />
        </TabPane>
        <TabPane tab="Notification Form" key="6">
          <NotificationForm />
        </TabPane>
        <TabPane tab="Contact Form Inquiries" key="7">
          <ContactInquiries /> 
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
