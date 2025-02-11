import React from 'react';

const ExtraSection = () => {
    const carAndSafetyQuotes = [
        "Cars are not just transportation, they are a reflection of who we are.",
        "Safety is not just a feature, it's a responsibility.",
        "Drive with care, and you'll always be safe.",
        "The car you drive is a reflection of your safety and responsibility.",
        "A car is only as good as the safety measures it holds.",
        "Drive like your life depends on it, because it does.",
        "A seatbelt is a simple thing that could save your life.",
        "Your car is only as safe as the driver behind the wheel.",
        "Speeding may get you there faster, but safety will keep you alive.",
        "The road is a dangerous place; drive defensively.",
        "Safety is something we learn after the accident, not before.",
        "A good car doesn’t make a good driver, but good driving makes a safe car.",
        "The best safety feature in a car is a responsible driver.",
        "It’s better to arrive late than to never arrive at all.",
        "Safety starts with the first step you take on the road: Buckle up.",
        "A cautious driver is a safe driver.",
        "Safety doesn't happen by accident.",
        "There are no shortcuts to safety on the road.",
        "The key to safety on the road is awareness and caution.",
        "A smart driver is a safe driver.",
      ];
      
    return (
        <div className='overflow-hidden container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2'>
        {carAndSafetyQuotes.map((quote, index) => (
          <div
            key={index}
            data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            className={`quote-item mb-4 p-4 text-white rounded-xl  flex ${index % 2 === 0 ? "bg-yellow-500 border" : "bg-blue-900 "}`}
          >
            {quote}
          </div>
        ))}
      </div>
    );
};

export default ExtraSection;