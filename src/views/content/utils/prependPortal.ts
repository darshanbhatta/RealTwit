import { ReactNode, ReactPortal, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const WithPrependPortal = (component: ReactNode, container: Element): ReactPortal => {
    const portalContainer = document.createElement('div');

    useEffect(() => {
        container.insertBefore(portalContainer, container.firstChild);
        return () => {
            try {
                container.removeChild(portalContainer);
            } catch (err) {
                console.error(err);
            }
        };
    }, [container, portalContainer]);

    return createPortal(component, portalContainer);
};
