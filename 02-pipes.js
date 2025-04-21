const { Observable } = require('rxjs');
const { map } = require("rxjs/operators")

const { users} = require('./apiData.js');
// Assembly line
const observable = new Observable((subscriber) => {
    subscriber.next(users);
}).pipe(
    map((value) => {
        console.log("1) Got data from observable", value)
        return value.data
    }),
    map((value) => {
        console.log("2) Got data from first operator", value)
        return value.filter(user => user.status === 'active')
    }),
    map((value) => {
        console.log("3) Got data from second operator", value)
        return (value.reduce(((sum, user) => sum + user.age), 0))/value.length;
    }),
    map((value) => {
        console.log("4) Got data from third operator", value)
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
        console.log('work done')
    }
}

observable.subscribe(observer);