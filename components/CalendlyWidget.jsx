import { useEffect } from 'react';

const CalendlyWidget = ({ onLoad }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.type = 'text/javascript';
        script.onload = () => { if (onLoad) onLoad(); };
        document.body.appendChild(script);
        // If Calendly already loaded, call onLoad immediately
        if (window.Calendly) {
            onLoad && onLoad();
        }
    }, [onLoad]);

    return (
        <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/stevebayard226/30min"
            style={{ width: '100%', height: '100%', minWidth: 0, overflow: 'hidden', flex: 1 }}
        />
    );
};

export default CalendlyWidget;