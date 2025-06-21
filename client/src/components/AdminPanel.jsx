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
    <div>
      {/* Hero Section */}
      <div
        style={{
          background: '#1a237e',
          height: '38vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: '600',
            margin: '0',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Admin Panel
        </h1>
      </div>

      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        background: 'linear-gradient(to bottom, #f0f2f5, #dfe7ec)',
        fontFamily: 'Arial, sans-serif',
        marginTop: '40px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '80vw',
          background: '#fff',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          tabBarStyle={{
            background: '#e8f0fc',
            fontWeight: 'bold',
            fontSize: '20px',
            padding: '0 10vw',
            height: '8vh',
            margin: '0',
          }}
          style={{
            width: '100%',
          }}
        >
          <TabPane tab="Bookings" key="1"  >
            <div style={{ padding: '0px'}}>  
              <Bookings />
            </div>
          </TabPane>
          <TabPane tab="Rooms" key="2">
            <div style={{ padding: '20px' }}>
              <AllRooms />
            </div>
          </TabPane>
          <TabPane tab="Add Room" key="3">
            <div style={{ padding: '20px' }}>
              <AddRoom />
            </div>
          </TabPane>
          <TabPane tab="Users" key="4">
            <div style={{ padding: '20px' }}>
              <Users />
            </div>
          </TabPane>
          <TabPane tab="Notification Manage" key="5">
            <div style={{ padding: '20px' }}>
              <ManageNotifications />
            </div>
          </TabPane>
          <TabPane tab="Notification Form" key="6">
            <div style={{ padding: '20px' }}>
              <NotificationForm />
            </div>
          </TabPane>
          <TabPane tab="Contact Form Inquiries" key="7">
            <div style={{ padding: '20px' }}>
              <ContactInquiries />
            </div>
          </TabPane>
        </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
