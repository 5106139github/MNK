import React from 'react';import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { events } from '../data/events';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState(false);

  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleBooking = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBooking(true);
    setTimeout(() => {
      event.availableSeats -= 1;
      setBooking(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold">Date</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Category</h3>
            <p>{event.category}</p>
          </div>
          <div>
            <h3 className="font-semibold">Price</h3>
            <p>${event.price}</p>
          </div>
          <div>
            <h3 className="font-semibold">Available Seats</h3>
            <p>{event.availableSeats}</p>
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={event.availableSeats === 0 || booking}
          className={`w-full py-3 px-6 rounded-lg ${
            event.availableSeats === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold`}
        >
          {booking
            ? 'Booking...'
            : event.availableSeats === 0
            ? 'Sold Out'
            : 'Book Ticket'}
        </button>
      </div>
    </div>
  );
}

export default EventDetails;