import React from 'react';
import { Container, Typography, Button, Grid,Box } from '@mui/material';
import ImageGallery from '../components/ImageGallery';
import Footer from '../components/Footer';
/*import ExpandMoreIcon from '@mui/icons-material/ExpandMore';*/
import FAQAccordion from './FAQAccordion';
import ImageGal from '../components/ImageGal';
import LiveChat from '../components/LiveChat';

<LiveChat/>
const HomeScreen = () => {

  
  return (
    
    <div style={{ backgroundColor: '#f5f5f5', padding: '50px 0' }}>
       <LiveChat />
      <Container><br></br>
        <Typography variant="h3" component="div" sx={{ color: '#333', marginBottom: '30px', fontFamily: 'Dancing Script', textAlign:'center'}}>
        Experience the Essence of The Luxury
        </Typography><br></br>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="text.secondary" marginBottom={3} align="justify" fontFamily='Domine' fontSize={17}>
              "The Luxury" is not just a hotel; it's an experience of refined elegance, unparalleled comfort, and exceptional service. Nestled in the heart of Colombo, The Luxury stands as a beacon of sophistication, offering guests a haven of tranquility amidst the bustling cityscape. At The Luxury, we pride ourselves on curating unforgettable experiences for our guests, ensuring that every moment spent with us is nothing short of extraordinary. From the moment you step through our doors, you'll be greeted by a warm and welcoming atmosphere, where every detail is meticulously designed to exceed your expectations. Our luxurious accommodations redefine the meaning of comfort, featuring plush furnishings, state-of-the-art amenities, and breathtaking views of the surrounding landscape. Whether you're seeking a cozy retreat for a romantic getaway or a spacious suite for a family vacation, our range of rooms and suites cater to every traveler's needs. Indulge your senses with our world-class dining options, where culinary masterpieces await to tantalize your taste buds. From gourmet cuisine crafted from the finest local ingredients to innovative cocktails served in chic lounges, our diverse dining venues promise an unforgettable gastronomic journey.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="text.secondary" marginBottom={3} align="justify" fontFamily='Domine' fontSize={17}>
              For those in search of relaxation and rejuvenation, our spa and wellness facilities provide a sanctuary for restorative treatments and holistic therapies. Unwind with a blissful massage, take a dip in our sparkling pool, or invigorate your senses with a yoga session overlooking panoramic vistas. In addition to our exceptional accommodations and amenities, The Luxury offers personalized concierge services to cater to your every need, whether it's arranging exclusive excursions, booking tickets to local attractions, or organizing special events. Experience the epitome of luxury hospitality at The Luxury, where every moment is crafted with care to ensure a truly unforgettable stay. Welcome to a world where luxury knows no bounds, and every desire is fulfilled with grace and sophistication. Our hotel prides itself on offering a diverse range of dining experiences, from gourmet cuisine crafted with locally sourced ingredients to chic lounges serving expertly curated cocktails. Whether you're indulging in al fresco dining with breathtaking views or savoring farm-to-table freshness, every bite is a testament to our commitment to excellence. With personalized service and attention to detail, we ensure that every meal is a memorable celebration of flavors and textures, leaving you craving for more.
            </Typography>
          </Grid>
        </Grid>
        <br />
        <br />
        
      </Container>
      <Box bgcolor="#ffffff" padding="40px" mt="30px" minWidth='100vw'>
        <Container>
          <Typography variant="h3" component="div" sx={{ color: '#333', marginBottom: '30px', fontFamily: 'Dancing Script', textAlign:'center' }}>
            Our Rooms
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom={3} align="justify" fontFamily='Domine' fontSize={17}>
            Experience unmatched comfort and luxury during your stay at The Luxury Hotel, where our range of rooms caters to every traveler's needs. From cozy retreats ideal for romantic getaways to spacious suites perfect for family vacations, each room is meticulously designed to offer a haven of tranquility amidst the bustling cityscape. Indulge in plush furnishings, state-of-the-art amenities, and breathtaking views of the surrounding landscape, ensuring a restful and rejuvenating stay. Whether you're seeking a serene escape or an adventure-filled retreat, our variety of rooms provide the perfect backdrop for an unforgettable experience, where every moment is crafted with care to ensure your utmost satisfaction.
          </Typography>
          <br />
          <ImageGallery />
        </Container><br/><br/>
      </Box>
      <br />
      <br />
      <br />
      
      <Container>
        <Typography variant="h3" component="div" sx={{ color: '#333', marginBottom: '30px', fontFamily: 'Dancing Script' , textAlign:'center'}}>
          Learn More About The Luxury Hotel
        </Typography>
        <Typography variant="body1" color="text.secondary" marginBottom={3} align="justify" fontFamily='Domine' fontSize={17}>
          Experience unmatched comfort and luxury during your stay at The Luxury Hotel, where our range of rooms caters to every traveler's needs. From cozy retreats ideal for romantic getaways to spacious suites perfect for family vacations, each room is meticulously designed to offer a haven of tranquility amidst the bustling cityscape. Indulge in plush furnishings, state-of-the-art amenities, and breathtaking views of the surrounding landscape, ensuring a restful and rejuvenating stay. Whether you're seeking a serene escape or an adventure-filled retreat, our variety of rooms provide the perfect backdrop for an unforgettable experience, where every moment is crafted with care to ensure your utmost satisfaction.
        </Typography>
        <Button>Learn More</Button>
        <ImageGal/>
        <br />
        <br />
      </Container>
      <FAQAccordion />
      <Footer />
    </div>
  );
};

export default HomeScreen;