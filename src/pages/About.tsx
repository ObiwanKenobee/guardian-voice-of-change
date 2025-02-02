import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          We are committed to providing innovative solutions for environmental and social governance.
        </p>
        <p className="mb-4">
          Our platform helps organizations track, manage, and improve their ESG performance through
          advanced analytics and real-time monitoring.
        </p>
      </div>
    </div>
  );
};

export default About;