export function checkGeolocation(handler) {
    if (navigator?.geolocation) {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        const resolve = (pos) => {
            if (pos?.coords){
                handler(true);
            } else {
                handler(false);
            }
        };
        const reject = () => handler(false);
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    } else {
        handler(false);
    }
}