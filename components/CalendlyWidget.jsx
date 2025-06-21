import { useEffect, useRef } from 'react';

const CalendlyWidget = ({ onLoad }) => {
    const widgetRef = useRef(null);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.type = 'text/javascript';
        script.onload = () => {
            if (onLoad) onLoad();
        };
        document.body.appendChild(script);
        // If Calendly already loaded, call onLoad immediately
        if (window.Calendly) {
            onLoad && onLoad();
        }
    }, [onLoad]);

    // Listen for Calendly widget iframe load
    useEffect(() => {
        if (!onLoad) return;
        const checkIframe = () => {
            const iframe = widgetRef.current?.querySelector('iframe');
            if (iframe) {
                iframe.addEventListener('load', onLoad, { once: true });
            } else {
                setTimeout(checkIframe, 50);
            }
        };
        checkIframe();
        return () => {
            const iframe = widgetRef.current?.querySelector('iframe');
            if (iframe) iframe.removeEventListener('load', onLoad);
        };
    }, [onLoad]);

    return (
        <div
            ref={widgetRef}
            className="calendly-inline-widget"
            data-url="https://calendly.com/stevebayard226/30min"
            style={{ width: '100%', height: '100%', minWidth: 0, overflow: 'hidden', flex: 1 }}
        />
    );
};

export default CalendlyWidget;