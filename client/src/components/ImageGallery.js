import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import ClickablePicture from './ClickablePicture';
import imageGallery from './imageGalleryData';

const ImageGallery = () => {
  const navigate = useNavigate(); 

  const handleClick = (id) => {
    navigate(`/rooms/${id}`); // Navigate to the room details page using the MongoDB _id
  };

  return (
    <div style={{ backgroundColor: 'white', width: '100%', minHeight: '90vh', padding: '0px 0' }}>
      <Grid container spacing={3}>
        {imageGallery.map((item, index) => (
          <Grid item xs={4} key={index}>
            <ClickablePicture
              imageUrl={item.imageUrl}
              title={item.title}
              sentence1={item.sentence1}
              onClick={() => handleClick(item._id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ImageGallery;
