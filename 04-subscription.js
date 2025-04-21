const { Observable } = require('rxjs');


const observable = new Observable((subscriber) => {
    let count = 1; 
    const intervalId = setInterval(() => {
        subscriber.next(`Value : ${count}`);
        count++; 
    }, 1000);

    // Cleanup function 
    return () => {
        console.log('Unsubscribed');
        clearInterval(intervalId);
    } 
})


const subscription = observable.subscribe(console.log);

// setTimeout(() => {
//     subscription.unsubscribe();
// }, 5000)
