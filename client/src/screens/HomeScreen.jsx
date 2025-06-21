import { useState, useEffect, useRef } from 'react';
import {  Star, Menu, X, ArrowRight, ArrowLeft, Info, ShoppingBag,ChevronRight, Users, MapPin, Play, Award, Globe} from 'lucide-react';
import BookingCalendar from './Bookingcalender';
import FAQAccordion from './FAQAccordion';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function Homepage(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [activeRoomTab, setActiveRoomTab] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const heroImages = [
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?q=80&w=2063&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
  };

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
    setSearchTerm('');
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London, UK",
      text: "The most breathtaking villa experience I've ever had. The views of the ocean from our overwater villa were unparalleled, and the staff anticipated our every need.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
    },
    {
      name: "David Chen",
      location: "Singapore",
      text: "Exceptional service from start to finish. The private pool and direct ocean access made our honeymoon unforgettable. We even saw dolphins from our deck!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
    },
    {
      name: "Emma Roberts",
      location: "Sydney, Australia",
      text: "Paradise found! The underwater villa was a once-in-a-lifetime experience that exceeded all expectations. Falling asleep watching fish swim by is magical.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop"
    }
  ];

  const experiences = [
    {
      title: "Sunset Dolphin Cruise",
      description: "Sail into the sunset alongside playful dolphins in their natural habitat.",
      image: "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?q=80&w=1921&auto=format&fit=crop"
    },
    {
      title: "Private Sandbank Picnic",
      description: "Enjoy a gourmet meal on your own private sandbank surrounded by turquoise waters.",
      image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Underwater Exploration",
      description: "Discover vibrant coral reefs and marine life with guided snorkeling or diving tours.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Traditional Fishing Experience",
      description: "Learn traditional Maldivian fishing techniques during a sunset expedition.",
      image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const specialOffers = [
    {
      title: "Honeymoon Package",
      description: "7 nights in an Overwater Villa with romantic dinner, couples spa treatment, and sunset cruise.",
      discount: "Save 20%",
      validUntil: "Dec 20, 2024",
      image: "https://images.unsplash.com/photo-1551018612-9715965c6742?q=80&w=1854&auto=format&fit=crop"
    },
    {
      title: "Early Bird Special",
      description: "Book 90 days in advance and receive complimentary airport transfers and a bottle of champagne.",
      discount: "Save 15%",
      validUntil: "For all 2024 stays",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Extended Stay Offer",
      description: "Stay 7 nights, pay for 5. Includes daily breakfast and one complimentary excursion.",
      discount: "2 Free Nights",
      validUntil: "Oct 31, 2024",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1949&auto=format&fit=crop"
    }
  ];

  const amenities = [
    "Private infinity pools",
    "24/7 butler service",
    "Underwater spa treatments",
    "Gourmet dining options",
    "Complimentary water sports",
    "Sunset dolphin cruises"
  ];

  const roomTypes = [
    {
      name: "Overwater Villa",
      images: [
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?q=80&w=2063&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop"
      ],
      size: "150",
      guests: "2",
      price: "$950",
      description: "Our signature overwater villas offer direct lagoon access, a private infinity pool, and breathtaking ocean views from every room.",
      amenities: ["Private infinity pool", "Glass floor panels", "Direct ocean access", "Sun deck with loungers", "Outdoor rain shower", "King-size bed"]
    },
    {
      name: "Beach Villa",
      images: [
        "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1578922794704-7bdd46f5c7eb?q=80&w=2071&auto=format&fit=crop"
      ],
      size: "180",
      guests: "3",
      price: "$1150",
      description: "Nestled among tropical vegetation with direct beach access, these spacious villas feature a private garden and plunge pool.",
      amenities: ["Private beach access", "Garden plunge pool", "Outdoor bathtub", "Beachfront terrace", "Tropical garden shower", "King-size bed"]
    },
    {
      name: "Presidential Suite",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=1925&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=2073&auto=format&fit=crop"
      ],
      size: "300",
      guests: "4",
      price: "$2500",
      description: "Our most exclusive accommodation offering unparalleled luxury with two bedrooms, expansive living areas, and a private infinity pool.",
      amenities: ["Panoramic ocean views", "Two-bedroom suite", "Private chef available", "Expansive sundeck", "Personal butler service", "Private dining area"]
    }
  ];

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden bg-white">

     {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black">
          {heroImages.map((img, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <img src={img} alt="Maldives Villa" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <button 
          onClick={prevSlide}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-white z-10 transition duration-300"
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-white z-10 transition duration-300"
          aria-label="Next slide"
        >
          <ArrowRight className="h-6 w-6" />
        </button>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <div className="animate-fadeIn max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-10 drop-shadow-lg">
              Luxury Redefined in <span className="text-blue-300">Paradise</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto drop-shadow-md">
              Experience the epitome of Maldivian luxury in our exclusive overwater and underwater villas
            </p>
          </div>
        </div>

        {/* Booking Calendar - Above Slide Indicators */}
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-4">
          <BookingCalendar
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            resetSearch={handleReset}
          />
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-3 w-12 rounded-full transition-all duration-300 drop-shadow-sm ${
                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

       <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-12">
              <div className="inline-flex items-center px-4 py-2  text-blue-800 rounded-full text-sm font-medium">
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                Discover Your Dream{' '}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                  Luxury
                </span>
              </h2>
              
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                Nestled in the heart of the Maldives, <span className="font-semibold text-blue-900">Azure Haven</span> is a sanctuary of unparalleled luxury and natural beauty. Our exclusive collection of overwater, beach, and underwater villas offers the perfect backdrop for your tropical getaway.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                Experience pristine white sand beaches, crystal-clear turquoise waters, and world-class hospitality that transforms every moment into an unforgettable memory.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Luxury Villas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-1">15</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">98%</div>
                <div className="text-sm text-gray-600">Guest Satisfaction</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => {
                navigate('/rooms');
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }, 100);
              }}
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
            >
              Explore Our Villas
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          </div>

          {/* Image Side */}
          <div className="relative flex flex-col items-center gap-4 lg:block mt-12 lg:mt-0">
            <div className="relative group w-full max-w-xs lg:max-w-none">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1540202404-1b927e27fa8b?q=80&w=2063&auto=format&fit=crop"
                    alt="Luxury Maldives Villa"
                    className="w-full h-64 sm:h-80 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <span className="font-bold text-gray-800">15+</span>
                  <span className="text-gray-600 text-sm">Rooms</span>
                </div>
              </div>
            </div>
            {/* Secondary Image */}
            <div className="absolute top-8 -left-12 w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
              <img 
                src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2074&auto=format&fit=crop"
                alt="Underwater Villa"
                className="w-full h-full object-cover"
              />
            </div>
            {/* For mobile, show the secondary image below the main image, in the same style */}
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-4 border-white mt-4 sm:hidden">
              <img 
                src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2074&auto=format&fit=crop"
                alt="Underwater Villa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
  

      {/* Villa Showcase */}
      <section className="py-28 " id="villas">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Luxury Villas &{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
              Suites
            </span>
          </h2>
             <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Choose from our collection of exquisite accommodations, each offering unique experiences and world-class amenities.
          </p>
          </div>
          
           {/* Room Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {roomTypes.map((room, index) => (
            <button
              key={index}
              onClick={() => setActiveRoomTab(index)}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeRoomTab === index 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg border border-blue-100'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>
          
          {/* Room Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-96 lg:h-auto">
                <img 
                  src={roomTypes[activeRoomTab].images[0]} 
                  alt={roomTypes[activeRoomTab].name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{roomTypes[activeRoomTab].name}</h3>
                    <p className="text-blue-200">From {roomTypes[activeRoomTab].price} per night</p>
                  </div>
                  <button 
                onClick={() => {
                  navigate('/rooms');
                  setTimeout(() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }, 100);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition duration-300"
              >
                Book Now
              </button>
                  </div>
                </div>
              </div>
              
              {/* Room Details */}
              <div className="p-8">
                <div className="flex flex-wrap gap-8 mb-8">
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                    <span className="text-gray-700 font-medium">{roomTypes[activeRoomTab].size} m²</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-6 w-6 text-blue-600 mr-3" />
                    <span className="text-gray-700 font-medium">Up to {roomTypes[activeRoomTab].guests} guests</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  {roomTypes[activeRoomTab].description}
                </p>
                
                <h4 className="font-semibold text-xl mb- X6">Villa Amenities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {roomTypes[activeRoomTab].amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition duration-300">
                    View Details
                  </button>
                  <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-medium transition duration-300">
                    Virtual Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-blue-900 text-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Unforgettable Experiences</h2>
      <div className="w-20 h-1 bg-blue-400 mx-auto mb-6"></div>
      <p className="text-blue-100 max-w-3xl mx-auto text-lg">
        Create memories that last a lifetime with our curated collection of uniquely Maldivian experiences.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {experiences.map((exp, index) => (
        <div 
          key={index} 
          className="group relative rounded-2xl overflow-hidden h-80 shadow-xl"
        >
          <img 
            src={exp.image} 
            alt={exp.title} 
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="text-2xl font-bold mb-3">{exp.title}</h3>
            <p className="text-blue-100 mb-4">{exp.description}</p>
            <button 
              onClick={() => window.location.href = '/facilities'}
              className="bg-white text-blue-900 hover:bg-blue-100 font-medium py-2 px-6 rounded-full transition duration-300 flex items-center"
            >
              Discover
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <h3 className="text-3xl font-bold mb-8">Exclusive Amenities & Services</h3>
        <p className="text-blue-100 text-lg mb-8 leading-relaxed">
          At Azure Haven, we believe in creating a seamless luxury experience. From the moment you arrive until your departure, our dedicated team ensures every detail is perfect.
        </p>
        
        <div className="grid grid-cols-2 gap-6 mb-8">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-400 mr-3"></div>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
        
        <button className="bg-white text-blue-900 hover:bg-blue-100 font-medium rounded-full px-8 py-3 transition duration-300">
          Explore All Services
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <img src="https://i.postimg.cc/59S52Dxz/shifaaz-shamoon-Qwh-QR-k-F0-AQ-unsplash.jpg" alt="Maldives Experience" className="rounded-lg object-cover w-full h-50 transform translate-y-8" />
        <img src="https://i.postimg.cc/fLgyWkbN/pexels-asadphoto-3320516.jpg" alt="Maldives Experience" className="rounded-lg object-cover w-full h-50 transform translate-y-1" />
        <img src="https://i.postimg.cc/4x3QWY3B/rayyu-maldives-y-WFF1xk-ULew-unsplash.jpg" alt="Maldives Experience" className="rounded-lg object-cover w-full h-102" />
        <img src="https://i.postimg.cc/dt69R2Jh/ahmed-yaaniu-05-A3-Cz-Imkhw-unsplash.jpg" alt="Maldives Experience" className="rounded-lg object-cover w-full h-90" />
      </div>
    </div>
  </div>
</section>

      {/* Special Offers Section */}
      <section id="offers" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Exclusive Offers</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Take advantage of our limited-time special packages designed to elevate your Maldives experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialOffers.map((offer, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-lg">
                    {offer.discount}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Valid until: {offer.validUntil}</span>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition duration-300">
                      View Offer
                      <ChevronRight className="ml-1 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-300 flex items-center mx-auto">
              <ShoppingBag className="mr-2 h-5 w-5" />
              View All Offers
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Guest Experiences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 relative">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                <div className="pt-12">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Parallax Section */}
      <section 
        className="relative py-32  bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-white text-4xl font-bold mb-6">Experience the Wonder of Maldives</h2>
            <p className="text-white/90 text-lg mb-8">
              Immerse yourself in the pristine beauty of turquoise waters, white sandy beaches, and vibrant marine life.
              Create memories that will last a lifetime.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition transform hover:scale-105">
              Discover Our Story
            </button>
          </div>
        </div>
      </section>

      <FAQAccordion/>


    </div>
  )
}