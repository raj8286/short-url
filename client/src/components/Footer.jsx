const Footer = () => {
  return (
    <footer className=" w-full mt-12 ">
      <p className="text-lg md:text-xl text-center text-gray-600 mb-6 ">
        The world's top tech companies are yet to rely on ShortURL service to shorten their URLs.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-16 gap-y-6">
        <img 
          src="/logos/company3.png" 
          alt="" 
          className="h-8 md:h-9 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity scale-115" 
          loading="lazy" 
        />

        <img 
          src="/logos/company1.png" 
          alt="" 
          className="h-8 md:h-9 w-auto mr-2 object-contain opacity-80 hover:opacity-100 transition-opacity scale-155" 
          loading="lazy" 
        />

        <img 
          src="/logos/company2.png" 
          alt="" 
          className="h-8 md:h-9 w-auto\ object-contain opacity-80 hover:opacity-100 transition-opacity scale-155" 
          loading="lazy" 
        />
        
        <img 
          src="/logos/company5.png" 
          alt="" 
          className="h-8 md:h-9 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity scale-125" 
          loading="lazy" 
        />

        <img 
          src="/logos/company6.png" 
          alt="" 
          className="h-8 md:h-9 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity scale-145" 
          loading="lazy" 
        />
        
        <img 
          src="/logos/company4.png" 
          alt="" 
          className="h-8 md:h-9 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity scale-155" 
          loading="lazy" 
        />
      </div>
    </footer>
  );
};

export default Footer;