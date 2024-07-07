
import axios from 'axios';
const OAuth = require('oauth').OAuth2;
import useMediaQuery from '@mui/material/useMediaQuery';

export function capitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function addNumbers(a: number, b: number): number {
    return a + b;
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

export function isMobileDevice(): boolean {
    return useMediaQuery('(max-width: 767px)');
}

export function isTabletDevice(): boolean {
    return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function isDesktopDevice(): boolean {
    return useMediaQuery('(min-width: 1024px)');
}

export function debouncer(value: any, delay: number): any {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            value.apply(this, args);
        }, delay);
    };
}

export function throttler(fn: any, delay: number): any {
    let inThrottle: boolean,
        lastFn: ReturnType<typeof setTimeout>,
        lastDelay: number;

    return function (this: any) {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastDelay = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.now() - lastDelay >= delay) {
                    fn.apply(context, args);
                    lastDelay = Date.now();
                }
            }, Math.max(0, delay - (Date.now() - lastDelay)));
        }
    };
};