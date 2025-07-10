import React from 'react';

interface Props{
  title: string
  breadcrumb: string[]
  backgroundImage: string
}
const PageHeader = ({ title, breadcrumb, backgroundImage }:Props) => {
  return (
    <div
      className="relative bg-cover bg-center text-white py-20 px-6 md:min-h-[68vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: '70% 42%',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-65"></div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="md:text-[48px] font-bold mb-4 text-4xl">{title}</h1>
        <p className="text-lg flex items-center space-x-2 justify-center">
          {breadcrumb.map((item: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: number) => (
            <span key={index}>
              {index > 0 && <span className="mx-2">→</span>}
              {item}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
