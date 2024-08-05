const Rx = require('rxjs');
const { mergeMap, mergeAll, take, tap, map } = require('rxjs/operators');

const stream = Rx.interval(1000).pipe(take(3), map(data =>  `택배${data+1}`))

// merge (map)
function openBox(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data, ' 상품 개봉')
            resolve(data)
        }, 5000)
    })
}

function checkBox(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data, ' 상품 검사')
            resolve(data)
        }, 5000)
    })
}

function useProduct(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data, ' 상품 사용')
            resolve(data)
        }, 5000)
    })
}

async function userTask(data) {
    await openBox(data)
    await checkBox(data)
    await useProduct(data)
}

stream.pipe(
    mergeMap((data) => Rx.from(userTask(data)))
).subscribe()

// merge (all)
const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream3 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream4 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream5 = Rx.interval(1000).pipe(take(3), tap(console.log))


const stream6 = Rx.of(stream1, stream2, stream3, stream4, stream5);

stream6.pipe(
    mergeAll(2) // stream 을 2개씩 묶에서 동시에 처리
).subscribe()