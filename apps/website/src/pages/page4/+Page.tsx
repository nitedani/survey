import React, { useState, useEffect } from 'react'; 
import { Menu, ChevronLeft, ChevronRight, X } from 'lucide-react';

const Logo = () => (
  <img src="/api/placeholder/120/60" alt="Logo" />
);

const PitchDeckTemplate = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cards = [
    {
      title: "Revolutionary Tech Solution",
      content: "We're transforming the industry with our innovative approach to solving complex problems.",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      title: "Market Opportunity", 
      content: "Tapping into a $50B market with a projected 15% annual growth rate.",
      color: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      title: "Our Unique Approach",
      content: "Combining cutting-edge AI with intuitive design for unparalleled user experience.", 
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    },
    {
      title: "Traction and Growth",
      content: "500k active users, $2M ARR, with a consistent 20% month-over-month growth.",
      color: "bg-gradient-to-r from-purple-500 to-purple-600", 
    },
    {
      title: "Expert Team",
      content: "Led by industry veterans with over 50 years of combined experience in tech and innovation.",
      color: "bg-gradient-to-r from-red-500 to-red-600",
    },
    {  
      title: "Financial Projections",
      content: "Forecasting $10M ARR by EOY 2025 with a clear path to profitability.",
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    },
    {
      title: "Investment Opportunity",  
      content: "Seeking $5M in Series A funding to scale operations and capture market share.",
      color: "bg-gradient-to-r from-pink-500 to-pink-600",
    }
  ];

  const handleScroll = event => {
    if (event.deltaY > 0) {
      setCurrentCard(prev => Math.min(prev + 1, cards.length - 1));
    } else {
      setCurrentCard(prev => Math.max(prev - 1, 0)); 
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);  
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <Logo />
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
            onClick={() => setCurrentCard(prev => Math.max(prev - 1, 0))}
            disabled={currentCard === 0}
          >
            <ChevronLeft className={currentCard === 0 ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          <span>{currentCard + 1} / {cards.length}</span>
          <button
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
            onClick={() => setCurrentCard(prev => Math.min(prev + 1, cards.length - 1))}
            disabled={currentCard === cards.length - 1}  
          >
            <ChevronRight className={currentCard === cards.length - 1 ? 'text-gray-300' : 'text-gray-600'} /> 
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 focus:outline-none"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      <div className="flex flex-grow">
        <div className={`${isMenuOpen ? 'absolute' : 'hidden'} md:relative md:block z-20 w-60 bg-white shadow-lg md:shadow-none overflow-y-auto`}>
          <nav>
            <ul className="space-y-2 p-4">
              {cards.map((card, index) => (
                <li
                  key={index} 
                  className={`cursor-pointer py-2 px-4 rounded-md ${
                    currentCard === index 
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setCurrentCard(index);
                    setIsMenuOpen(false);
                  }}
                >
                  {card.title}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="w-full p-8 md:p-16">
          <div 
            key={currentCard}
            className={`w-full h-full rounded-2xl shadow-2xl p-12 text-white flex flex-col justify-center transition-colors duration-500 ${cards[currentCard].color}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">{cards[currentCard].title}</h2>
            <p className="text-2xl md:text-3xl text-center">{cards[currentCard].content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeckTemplate;