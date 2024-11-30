import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ClickablePicture = ({ imageUrl, title, sentence1, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const pictureStyle = {
    transition: 'transform 0.3s ease-in-out',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    cursor: 'pointer',
  };

  return (
    <Card
      style={pictureStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <img src={imageUrl} alt={title} style={{ width: '100%', height: 'auto' }} />
      <CardContent>
        <Typography variant="h6" align="center">
          {title}
        </Typography>
        <Typography variant="body2" align="center" style={{ whiteSpace: 'pre-line' }}>
          {sentence1}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClickablePicture;
