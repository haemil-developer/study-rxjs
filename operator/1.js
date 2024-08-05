
const Rx = require('rxjs');
const { tap, filter, map, reduce } = require('rxjs/operators');

const stream = Rx.from([1, 2, 3, 4])

// tap: 데이터의 흐름에 영향을 끼치지 않고 여러번 작업 할 수 있다.
stream.pipe(
    tap(data => { 
        console.log('첫 번째 tap 출력', data) 
    }),
    tap(data => { 
        console.log('두 번째 tap 출력', data) 
    }),
    tap()
).subscribe({
    next: () => {}
})

// filter
stream.pipe(
    filter(data => data > 1),
    filter(data => data > 3)
).subscribe(console.log)

// map
stream.pipe(
    map(data => data * 2),
    map(data => data * 2)
).subscribe(console.log)

// reduce
stream.pipe(
    reduce((accu, data )=> { return accu + data }),
).subscribe(console.log)