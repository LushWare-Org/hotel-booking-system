import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Instagram, Facebook, Twitter, Globe, ArrowRight, CheckCircle } from 'lucide-react';

export default function MaldivesContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
      }, 3000);
    } catch (error) {
      alert('Failed to send inquiry. Please try again.');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      primary: "+960 664 2211",
      secondary: "+960 664 2212",
      description: "Available 24/7 for reservations and assistance"
    },
    {
      icon: Mail,
      title: "Email",
      primary: "reservations@azurehaven.mv",
      secondary: "info@azurehaven.mv",
      description: "We respond within 2 hours"
    },
    {
      icon: MapPin,
      title: "Location",
      primary: "Baa Atoll, Maldives",
      secondary: "GPS: 5.2815° N, 73.0169° E",
      description: "30-minute seaplane transfer from Malé"
    },
    {
      icon: Clock,
      title: "Reception Hours",
      primary: "24/7 Concierge Service",
      secondary: "Check-in: 2:00 PM | Check-out: 12:00 PM",
      description: "Our team is always here to help"
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'reservation', label: 'Reservations' },
    { value: 'wedding', label: 'Weddings & Events' },
    { value: 'dining', label: 'Dining Experiences' },
    { value: 'spa', label: 'Spa & Wellness' },
    { value: 'activities', label: 'Activities & Excursions' }
  ];

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Hero Section  */}
      <section className="relative h-[720px]">
        <div className="absolute inset-0">
          <img 
            src="https://i.postimg.cc/R08HJdkw/eefromthesky-Yy-CIzt-YO3-O0-unsplash.jpg"
            alt="Maldives Villa Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>

        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-10">
              Get in <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Ready to experience paradise? Our dedicated team is here to craft your perfect Maldivian escape
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => scrollToSection('contact-info')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </button>
              <button 
                onClick={() => scrollToSection('contact-form')}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-800 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section id="contact-info" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Multiple Ways to{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Choose your preferred method of communication. We're available around the clock to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{info.title}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{info.primary}</p>
                  <p className="text-gray-600 text-sm mb-4">{info.secondary}</p>
                  <p className="text-gray-500 text-sm">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section  */}
      <section id="contact-form" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 lg:p-12">
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-4">Send us a Message</h3>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 2 hours during business hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h4>
                  <p className="text-green-600">Thank you for contacting us. We'll respond to your inquiry shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Inquiry Type</label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white resize-none"
                      placeholder="Tell us about your dream vacation..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Additional Information */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-6">Why Choose Azure Haven?</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">24/7 Personalized Service</h4>
                      <p className="text-gray-600">Our dedicated concierge team is available around the clock to ensure your every need is met.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                      <Globe className="h-4 w-4 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Exclusive Experiences</h4>
                      <p className="text-gray-600">From private sandbank picnics to underwater dining, we create memories that last a lifetime.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Seamless Planning</h4>
                      <p className="text-gray-600">From arrival to departure, we handle every detail so you can focus on making memories.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h4 className="text-xl font-bold mb-6">Follow Our Journey</h4>
                <p className="text-gray-600 mb-6">Stay connected with us on social media for the latest updates, special offers, and stunning Maldives moments.</p>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-300">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-colors duration-300">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-400 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors duration-300">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-bold mb-4">Find Us in Paradise</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Located in the pristine Baa Atoll, Azure Haven is easily accessible via seaplane transfer from Malé International Airport.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-video bg-blue-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                <p className="text-xl font-semibold text-gray-700 mb-2"> Map</p>
                <p className="text-gray-500">Baa Atoll, Maldives</p>
                <p className="text-sm text-gray-400 mt-2">GPS: 5.2815° N, 73.0169° E</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}