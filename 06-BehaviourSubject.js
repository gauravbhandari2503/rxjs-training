const { BehaviorSubject } = require('rxjs');

const subject = new BehaviorSubject('Greet');

subject.subscribe((value) => {
    console.log('Subscriber 1', value);
});

subject.next('Hello');


subject.subscribe((value) => {
    console.log('Subscriber 2', value);
})


