import React from 'react';

const Divider: React.FC = () => {
  return (
    <div className="w-full max-w-xs mx-auto my-12 flex items-center justify-center text-[#a1887f]" aria-hidden="true">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="px-4 font-dancing text-3xl">*</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default Divider;
