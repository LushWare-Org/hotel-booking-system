import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const LiveChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi! What is your name?', sender: 'bot' },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [showFAQ, setShowFAQ] = useState(false);

  const faqList = [
    { question: 'What are your working hours?', answer: 'Our working hours are 9 AM to 6 PM, Monday to Friday.' },
    { question: 'How can I book a room?', answer: 'You can book a room through our website or by calling our reception.' },
    { question: 'Do you offer airport transfers?', answer: 'Yes, we offer airport transfer services. Please contact our concierge for more details.' },
    { question: 'What amenities do you provide?', answer: 'We provide free Wi-Fi, a spa, a fitness center, and a restaurant with a view.' },
    { question: 'Is there parking available?', answer: 'Yes, we offer free parking for all guests.' },
  ];

  const handleSendMessage = () => {
    if (userMessage.trim() === '') return;

    const newMessages = [...messages, { text: userMessage, sender: 'user' }];
    setMessages(newMessages);
    setUserMessage('');

    if (userName === '') {
      setUserName(userMessage);
      const botGreeting = `Hi ${userMessage}, Thank you for getting in touch! How can I assist you today?`;
      setMessages(prevMessages => [...prevMessages, { text: botGreeting, sender: 'bot' }]);

      setTimeout(() => {
        setShowFAQ(true); // Show FAQ suggestions
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "Here are some frequently asked questions:", sender: 'bot' }
        ]);
      }, 500);
    } else {
      setTimeout(() => {
        const botResponse = 'I will help you with that shortly!';
        setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      }, 1000);
    }
  };

  const handleFAQClick = (faq) => {
    const newMessages = [
      ...messages,
      { text: `You asked: ${faq.question}`, sender: 'user' },
      { text: faq.answer, sender: 'bot' }, 
    ];

    setMessages(newMessages);

    // After showing the answer, hide FAQ
    setShowFAQ(false);

    setTimeout(() => {
      const botFollowUp = "Is there anything else I can assist you with?";
      setMessages(prevMessages => [...prevMessages, { text: botFollowUp, sender: 'bot' }]);
    }, 500);
  };

  const handleRest = () => {
    setMessages([{ text: 'Hi! What is your name?', sender: 'bot' }]);
    setUserMessage('');
    setUserName('');
    setShowFAQ(false);
  };

  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <div
        onClick={toggleChatWindow}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#25d366',
          borderRadius: '50%',
          padding: '20px',
          cursor: 'pointer',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          zIndex: '9999',
        }}
      >
        <ChatIcon style={{ color: 'white', fontSize: '30px' }} />
      </div>

      {isChatOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '80px',
            right: '30px',
            width: '300px',
            height: '450px', 
            backgroundColor: '#fff',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: '10000',
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Dancing Script', fontSize: '18px' }}>Live Chat</Typography>
            <Button onClick={toggleChatWindow} style={{ padding: '0', minWidth: 'auto', fontSize: '18px' }}>X</Button>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flexGrow: '1',
              overflowY: 'auto',
              padding: '10px 0',
              marginTop: '10px',
              borderBottom: '1px solid #ddd',
              marginBottom: '10px',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  textAlign: message.sender === 'bot' ? 'left' : 'right',
                  marginBottom: '15px',
                }}
              >
                <Typography
                  sx={{
                    display: 'inline-block',
                    backgroundColor: message.sender === 'bot' ? '#f0f0f0' : '#25d366',
                    color: message.sender === 'bot' ? '#000' : '#fff',
                    padding: '10px 15px',
                    borderRadius: '12px',
                    maxWidth: '80%',
                    fontSize: '16px',
                    lineHeight: '1.5',
                  }}
                >
                  {message.text}
                </Typography>
              </div>
            ))}
            {showFAQ && (
              <Box sx={{ marginTop: '20px' }}>
                <List>
                  {faqList.map((faq, index) => (
                    <ListItem button key={index} onClick={() => handleFAQClick(faq)}>
                      <ListItemText primary={faq.question} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>

          {/* Chat Input */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Type a message..."
              fullWidth
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              style={{ marginRight: '10px', fontSize: '14px', width: 'calc(100% - 50px)' }} // Reduced size
              InputProps={{
                style: {
                  fontSize: '14px',
                  padding: '10px',
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              sx={{
                backgroundColor: '#25d366',
                fontSize: '16px',
                padding: '10px 15px',
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#128c7e',
                },
              }}
            >
              Send
            </Button>
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Button
              variant="text"
              color="secondary"
              onClick={handleRest}
              sx={{
                fontSize: '14px',
                color: '#ff6347',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                marginRight: '5px', 
              }}
            >
              Rest Chat
            </Button>

            <Button
              variant="text"
              color="secondary"
              onClick={() => setShowFAQ(!showFAQ)}
              sx={{ fontSize: '14px' }}
            >
              {showFAQ ? 'Hide FAQs' : 'Show FAQs'}
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default LiveChat;
