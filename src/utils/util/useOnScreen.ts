import { useState, useEffect, RefObject } from 'react';

function useOnScreen(ref: RefObject<HTMLElement>, rootMargin: string = '0px'): boolean {
    // Use a larger root margin on smaller screens
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 600;
    const actualRootMargin = isSmallScreen ? '500px' : rootMargin;

    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                rootMargin: actualRootMargin
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return isIntersecting;
}

export default useOnScreen;
