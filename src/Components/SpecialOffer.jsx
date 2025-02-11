import React from 'react';
import AOS from 'aos';

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Get 15% off for weekend rentals!",
      description: "Book a car for the weekend and enjoy 15% off on the rental price.",
      buttonText: "Learn More",
    },
    {
      id: 2,
      title: "Luxury cars at $99/day this holiday season!",
      description: "Drive in style with our luxury cars, now at just $99 per day.",
      buttonText: "Book Now",
    },
    {
      id: 3,
      title: "Free upgrade on all premium bookings!",
      description: "Book a premium car today and get a free upgrade to a luxury model.",
      buttonText: "Learn More",
    },
  ];

  return (
    <section className="container mx-auto p-12">
      <h2 className="text-3xl font-extrabold mb-6 text-center">Special Offers</h2>
      <div className=" overflow-hidden space-y-3">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className="bg-blue-500 p-6 rounded-md shadow-md transition-all transform hover:scale-105 hover:translate-y-2 hover:shadow-lg duration-200"
            data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
          >
            <h3 className="text-2xl font-bold text-white mb-4">{offer.title}</h3>
            <p className="text-white mb-4">{offer.description}</p>
            <button className="bg-yellow-400 text-black py-2 px-4 rounded-full hover:bg-yellow-500">
              {offer.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
