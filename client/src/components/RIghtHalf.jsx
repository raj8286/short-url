import React from 'react';

const RightHalf = () => {
  return (
    <div className="flex items-center justify-center mt-4 lg:mt-0"> 
    <img 
      src="/home.png" 
      alt="Illustration of a team collaborating on a design project" 
      className="max-w-xl h-auto pl-12 motion-reduce:animate-none animate-[subtle-bounce_2.5s_ease-in-out_infinite]" 
    />
    </div>
  );
};

export default RightHalf;