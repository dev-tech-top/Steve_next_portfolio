import { useEffect } from 'react';

const CalendlyWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.type = 'text/javascript';
        document.body.appendChild(script);
    }, []);

    return (
        <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/stevebayard226/30min"
            style={{ width: '100%', height: '100%', minWidth: 0, overflow: 'hidden', flex: 1 }}
        />
    );
};

export default CalendlyWidget;