
import axios from 'axios';
const OAuth = require('oauth').OAuth2;

export function capitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function addNumbers(a: number, b: number): number {
    return a + b;
}

export function getCurrentYear() {
    const date = new Date();
    const year = date.getFullYear();
    return year;
}

export function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

export async function goTo(ref: any) {
    if (isMobile()) {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        setTimeout(() => {
            if (ref.current) {
                ref.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    }
}

export function emailVerified(email: string): boolean {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    else {
        return true;
    }
}

export function makeWebServiceCall(url: string, method: string, data: any): Promise<any> {
    // Implement your web service call logic here
    // You can use libraries like axios or fetch to make the actual HTTP request
    // Return a promise that resolves with the response data
    return new Promise((resolve, reject) => {
        // Make the web service call
        // Example using axios:
        axios({
            method: method,
            url: url,
            data: data
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function authorizeWithOAuth(provider: string, clientId: string): Promise<string> {
    // Implement your OAuth authorization logic here
    // You can use libraries like OAuth.js or Auth0.js to handle the authorization flow
    // Return a promise that resolves with the access token
    return new Promise((resolve, reject) => {
        // Perform the OAuth authorization
        // Example using OAuth.js:
        const oauth = new OAuth({
            provider: provider,
            clientId: clientId
        });
        oauth.authorize((accessToken: string) => {
            resolve(accessToken);
        }, (error: any) => {
            reject(error);
        });
    });
}

export function debouncer(func: (...args: any[]) => any, delay: number): (...args: any[]) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export function throttler(fn: (...args: any[]) => any, delay: number): (...args: any[]) => void {
    let inThrottle: boolean,
        lastFn: ReturnType<typeof setTimeout>,
        lastDelay: number;

    return function (this: any) {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            fn.apply(context, [args]);
            lastDelay = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function () {
                if (Date.now() - lastDelay >= delay) {
                    fn.apply(context, [args]);
                    lastDelay = Date.now();
                }
            }, Math.max(0, delay - (Date.now() - lastDelay)));
        }
    };
};


export const isMobile = () => {
    return typeof window !== 'undefined' && window.matchMedia("(max-width: 1100px)").matches;
}

export const priceAfterDiscount = (originalPrice: number, discountPercentage: number): number => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return Math.round(originalPrice - discountAmount);
}