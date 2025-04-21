// First we import the observable
const { Observable } = require("rxjs");


// To create the observable we need to do instantiate the class
// this class constructor takes a fallback 

// Customer
const observable = new Observable((subscriber) => {
    subscriber.next(10);
});

// next we need to create a observer
// Clerk
const observer = {
    next: (value) => { 
        console.log("Observer got a value of "+ value);
    },
    error: (err) => {
        console.log("Observer got an error of "+ err);
    },
    complete: () => {
        console.log("Observer got a complete notification");
    }
}

// Connection between Customer and clerk
observable.subscribe(observer);