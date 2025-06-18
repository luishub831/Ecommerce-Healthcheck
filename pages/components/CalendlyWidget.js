import { useEffect } from 'react';

const CalendlyWidget = () => {
  useEffect(() => {
    // Load the Calendly script once on client side
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up if component unmounts
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/kevin-moenco/gjennomgang-cro-rapport?hide_event_type_details=1&hide_gdpr_banner=1"
      style={{ minWidth: '320px', height: '660px' }} // Calendly requires height
    ></div>
  );
};

export default CalendlyWidget;
