const { of } = require('rxjs');
const { map } = require("rxjs/operators")

// https://rxjs.dev/guide/operators

const { users, users2} = require('./apiData.js');

// Assembly line
const observable = of(users2, users).pipe(
    map((value) => {
        return value.data
    }),
    map((value) => {
        return value.filter(user => user.status === 'active')
    }),
    map((value) => {
        return (value.reduce(((sum, user) => sum + user.age), 0))/value.length;
    }),
    map((value) => {
        console.log(value);
        if (value < 18) throw new Error ("Average age is too young")
        else return value;
    })
)

const observer = {
    next: (value) => {
        console.log('Observer got the value of '+ value)
    },
    error: (err) => {
        console.log('Observer got an error of ' + err)
    },
    complete: () => {
        console.log('Got the complete notification')
    }
}

observable.subscribe(observer);