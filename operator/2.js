const Rx = require('rxjs');
const { concatMap, concatAll, take, tap } = require('rxjs/operators');

const stream = Rx.from(['택배1', '택배2', '택배3'])

// concat (map)
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
    concatMap((data) => Rx.from(userTask(data)))
).subscribe()

// concat (all)
const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log))

const stream3 = Rx.of(stream1, stream2)
// stream3.subscribe(console.log)
stream3.pipe(
    concatAll()
).subscribe()