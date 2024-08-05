const Rx = require('rxjs');
const { take } = require('rxjs/operators');

const stream1 = Rx.interval(1000); // 0부터 1000ms 간격으로 흘러나온다.
stream1.subscribe({
    next: data => {
        console.log(data)
    }
})

stream1.pipe(
    take(10)
).subscribe({
    next: data => {
        console.log(data)
    }
})

const stream2 = Rx.timer(3000, 1000); // 3000ms 동안 기다렸다가 1000ms 간격으로 흘러나온다.
stream2.pipe(
    take(10)
).subscribe({
    next: data => {
        console.log(data)
    }
})