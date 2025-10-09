import React from 'react';
import LeftHalf from '../components/LeftHalf.jsx';
import RightHalf from '../components/RIghtHalf.jsx';
import Footer from '../components/Footer.jsx';

const LandingPage = () => {
  return (
      <div className="min-h-[calc(99vh-6rem)] bg-gray-300 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-6">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-center">
          <LeftHalf />
          <RightHalf />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;