const { Subject } = require("rxjs");

// create a subject
const subject = new Subject();

subject.subscribe(value => {
    console.log('Subscriber 1', value)
})

subject.next('hello');

subject.subscribe(value => {
    console.log('Subscriber 2', value)
})

subject.next('world');

// Subscriber 1 gets both 'Hello' and 'World'.

// Subscriber 2 does not get 'Hello' because it subscribed after 'Hello' was already sent.

// Subscriber 2 only starts receiving values after it subscribed.