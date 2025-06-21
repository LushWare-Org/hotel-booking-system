import { useState } from 'react';
import { Plus, Minus, MessageCircle, HelpCircle, Clock, MapPin, Users, Utensils, Waves } from 'lucide-react';

const ModernFaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is the best time to visit the Maldives?",
      answer: "The best time to visit is during the dry season from November to April when you can expect clear skies, minimal rain, and optimal conditions for water activities. However, our villa offers an exceptional experience year-round with special advantages even during the green season.",
    },
    {
      question: "How do I get to the villa from Malé International Airport?",
      answer: "We provide seamless transfers from Malé International Airport via luxury speedboat (45 minutes) or seaplane (25 minutes) depending on your villa location. Our team will greet you at the airport and handle all logistics for a stress-free arrival experience.",
    },
    {
      question: "What activities are available at the villa?",
      answer: "We offer a wide range of activities including guided snorkeling and diving excursions, sunset dolphin cruises, fishing trips, water sports (kayaking, paddleboarding, jet skiing), cooking classes, yoga sessions, spa treatments, and private dining experiences on the beach or sandbank.",
    },
    {
      question: "Is the villa suitable for families with children?",
      answer: "Absolutely! We offer family-friendly villas with safety features and dedicated kids' programs. Our Kids Club provides supervised activities for children aged 4-12, and we offer babysitting services upon request. Family beach villas provide ample space and privacy for families of all sizes.",
    },
    {
      question: "What dining options are available?",
      answer: "We feature multiple dining venues including an overwater restaurant specializing in fresh seafood, an international buffet, a beach grill, and an underwater restaurant. We also offer private dining experiences in your villa, on the beach, or on a private sandbank. Most dietary requirements can be accommodated with advance notice.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg viewBox="0 0 1000 1000" className="absolute -inset-10">
          <defs>
            <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="100" fill="url(#gradient)" />
          <circle cx="800" cy="300" r="80" fill="url(#gradient)" />
          <circle cx="300" cy="700" r="60" fill="url(#gradient)" />
          <circle cx="700" cy="800" r="90" fill="url(#gradient)" />
        </svg>
      </div>

      <div className="container mx-auto px-2 sm:px-4 md:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 sm:mb-6">
            <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know before experiencing paradise at Azure Haven
          </p>
        </div>
        
        <div className="max-w-full sm:max-w-4xl mx-auto">
          <div className="grid gap-3 sm:gap-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100
                  ${openIndex === index ? 'shadow-2xl ring-2 ring-blue-500/20 transform scale-[1.01] sm:scale-[1.02]' : 'hover:transform hover:scale-[1.01]'}`}
              >
                <button
                  className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full text-left p-4 sm:p-6 md:p-8 focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-1"></div>
                      <h3 className="text-base sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 ml-2 sm:ml-4
                    ${openIndex === index 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rotate-45' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </button>
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden
                    ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
                    <div className="ml-6 sm:ml-16 border-l-4 border-gradient-to-b from-blue-500 to-cyan-500 pl-4 sm:pl-6">
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-blue-100">
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernFaqAccordion;