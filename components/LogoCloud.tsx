import React from 'react';
import Image from "next/image";
const LogoCloud = () => {
  // Array of company logos with image paths
  const companyLogos = [
    {
      name: "Salesforce",
      imgSrc: "/logos/salesforce.png",
      alt: "Salesforce logo"
    },
    {
      name: "HubSpot",
      imgSrc: "/logos/hubspot.svg",
      alt: "HubSpot logo"
    },
    {
      name: "Slack",
      imgSrc: "/logos/slack.png",
      alt: "Slack logo"
    },
    {
      name: "Zoom",
      imgSrc: "/logos/zoom.svg",
      alt: "Zoom logo"
    },
    {
      name: "Microsoft",
      imgSrc: "/logos/microsoft.png",
      alt: "Microsoft logo"
    },
    {
      name: "Adobe",
      imgSrc: "/logos/adobe.png",
      alt: "Adobe logo"
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-b border-gray-100">
      <div className="container mx-auto max-w-7xl">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-8">
          Trusted by sales teams worldwide
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companyLogos.map((company, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={company.imgSrc}
                alt={company.alt}
                className="h-8 md:h-12 w-auto object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                width={500} 
                height={300} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
