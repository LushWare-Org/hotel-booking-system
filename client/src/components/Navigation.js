import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Tabs, Tab, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.min.css';



const AnimatedText = ({ children }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const props = useSpring({
    opacity: visible ? 1 : 0,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(1.5)' }
  });

  return <animated.div style={props}>{children}</animated.div>;
};



const HomeTabContent = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', position: 'relative', minHeight: '98vh' }}>
    <AnimatedText>
      <Typography variant="h1" component="div" style={{ textAlign: 'center' }} fontFamily={'Playfair Display'}>
      The Luxury Stay Awaits You
      </Typography>
    </AnimatedText>
  </div>
);


const RoomsTabContent = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'Black', position: 'relative', minHeight: '98vh' }}>
    <AnimatedText>
      <Typography variant="h1" component="div" style={{ textAlign: 'center' }} marginTop={11} fontFamily={'Playfair Display'}>
        Our Rooms
      </Typography>
      
    </AnimatedText>
  </div>
);

const FacilitiesTabContent = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', position: 'relative', minHeight: '98vh' }}>
    <AnimatedText>
      <Typography variant="h1" component="div" style={{ textAlign: 'center' }} marginTop={11} fontFamily={'Playfair Display'}>
        Facilities what we offer
      </Typography>
    </AnimatedText>
    
  </div>
  
);

const ContactTabContent = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', position: 'relative', minHeight: '98vh' }}>
    <AnimatedText>
      <Typography variant="h1" component="div" style={{ textAlign: 'center' }} marginTop={11} fontFamily={'Playfair Display'}>
        Contact us
      </Typography>
    </AnimatedText>
  </div>
);

const LoginTabContent = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', position: 'relative', minHeight: '98vh' }}>
    <AnimatedText>
      <Typography variant="h1" component="div" style={{ textAlign: 'center' }} marginTop={11} fontFamily={'Playfair Display'}>
        Login with us
      </Typography>
    </AnimatedText>
  </div>
);

const RegisterTabContent = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', position: 'relative', minHeight: '98vh' }}>
    <AnimatedText>
      <Typography variant="h1" component="div" style={{ textAlign: 'center' }} marginTop={11} fontFamily={'Playfair Display'}>
        Register with us
      </Typography>
    </AnimatedText>
  </div>
);

const AccountTabContent = () => {

  const [user, setUser] = useState();

  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    setUser(currentUser);
  }, []);

  return (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', position: 'relative', minHeight: '98vh' }}>
    <AnimatedText>
      {user && user.isAdmin && 
        <Typography variant="h1" component="div" style={{ textAlign: 'center' }} marginTop={11} fontFamily={'Playfair Display'}>
          Admin Dashboard
        </Typography>
      }
      {user && !user.isAdmin && 
        <Typography variant="h1" component="div" style={{ textAlign: 'center' }} marginTop={11} fontFamily={'Playfair Display'}>
          My Account
        </Typography>
      }
    </AnimatedText>
  </div>
  )
}

const HomeTab = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    
    <div style={{ position: 'absolute', bottom: '30px', margin: '0 auto', textAlign: 'center', color: 'white' }}>
      <Typography variant="h5" component="div" style={{ display: 'inline-block', marginRight: '50px', fontFamily: 'Playfair Display' }}>Book Your Stay Now!</Typography>
      <Button variant="contained" color="primary" component={Link} to="/rooms" >Book Now</Button><br></br>
    </div>
  </div>
);




const Navigation = () => {
  const [navBackground, setNavBackground] = useState('transparent');
  const [value, setValue] = useState(0);
  /*const [currentImageIndex, setCurrentImageIndex] = useState(0);*/

  const [user, setUser] = useState();

  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    setUser(currentUser);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const navbarHeight = 80; 

      if (scrollPosition > navbarHeight) {
        setNavBackground('black');
      } else {
        setNavBackground('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);

    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

/*  useEffect(() => {
    const images = [
      'room1.png', 
      'room2.png',
      // Add more images if needed
    ];

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);
*/
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  }

  // Background image styles for each tab
  const backgroundStyles = {
    0: {
      backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Fb.jpg?alt=media&token=8cd785be-e300-498d-8593-7bdd00698924)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '98vh',
      opacity: '0.9'
    },
    1: {
      backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Froom3.png?alt=media&token=910b9e2a-54b5-436a-8c8c-1fba99b19a3d)`, 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '98vh',
      opacity: '0.9'
    },
    2: {
      backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2FSwimming.png?alt=media&token=a8b2c994-cf8e-429c-b874-fd01b633a44e)`, 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '98vh',
      opacity: '0.9'
    },
    3: {
      backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Froom2.png?alt=media&token=641287f2-762c-4217-8a2f-281a8253b180)`, 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '98vh',
      opacity: '0.9'
    },
    4: {
      backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Flogin.jpg?alt=media&token=a810ff0a-6305-4be3-8a40-d0abbb0b8875)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '98vh',
      opacity: '0.9'
    },
    5: {
      backgroundImage: user ? `url(https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2FSpa.png?alt=media&token=f0e89146-dbfe-4a98-9eae-a1243bfb8de3)` 
                                  : `url(https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Froom6.png?alt=media&token=1bf0b63d-e3f3-4341-8890-1549e07835db)`, 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '98vh',
      opacity: '0.9'
    },
   6: {
    backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Flogin.jpg?alt=media&token=a810ff0a-6305-4be3-8a40-d0abbb0b8875)`, 
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '98vh',
    opacity: '0.8'
  },
  7: {
    backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/hotel-booking-system-35f4a.appspot.com/o/Public%20Folder%2Froom1.png?alt=media&token=89633f0a-554e-4481-b71a-5b54415d658a)`, 
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '98vh',
    opacity: '0.8'
  },
};

/*const AnimatedText = ({ children }) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return <animated.div style={props}>{children}</animated.div>;
};*/

  return (
    <div>
      <AppBar position="fixed" style={{ backgroundColor: navBackground, boxShadow: 'none', height: '100px', font: 'Playfair Display' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-around', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Tabs value={value} onChange={handleChange} textColor="white" style={{ marginLeft: '0px', marginRight:'110px'}} >
              <Tab label="Home" component={Link} to="/" />
              <Tab label="Rooms" component={Link} to="/rooms" />
              <Tab label="Facilities" component={Link} to="/facilities" />
              <Tab label="Contact" component={Link} to="/contact" />
              <Typography variant="h4" component="div" sx={{ color: 'white' }} marginRight={20} marginLeft={20} fontFamily={'Playfair Display'}>
                THE HOTEL LUXURY
              </Typography>
              {!user && <Tab label="Login" component={Link} to="/login" />}
              {!user && <Tab label="Register" component={Link} to="/register" />}
              {user && !user.isAdmin && <Tab label="Account" component={Link} to="/account" />}
              {user && user.isAdmin && <Tab label="Admin Panel" component={Link} to="/admin" />}
              {user && <Tab label="Logout" onClick={handleLogout} />}
            </Tabs>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ ...backgroundStyles[value], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative' }}>
        {value === 0 && <HomeTabContent />}
        {value === 0 && <HomeTab />}
        {value === 1 && <RoomsTabContent />}
        {value === 2 && <FacilitiesTabContent />}
        {value === 3 && <ContactTabContent />}
        {value === 4 && <HomeTabContent />}
        {value === 5 && !user && <LoginTabContent />}
        {value === 5 && user && <AccountTabContent />}
        {value === 6 && <RegisterTabContent />}
      </div>
    </div> 
  );
};

export default Navigation;
