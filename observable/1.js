const Rx = require('rxjs');
console.log(Rx);

const deliveries = ['delivery1', 'delivery2', 'delivery3'];

const stream = Rx.from(deliveries);

// Array 로 부터 만들기
stream.subscribe({
    next: (data) => {
        // 다음 데이터가 오면 이 데이터를 받아서 어떤 행동을 할 것인가?
        console.log(data);
    },
    complete: () => {
        console.log('completed');
    },
    error: () => {}
});

// Promise 로 부터 만들기
function makePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('delivery')
        }, 3000);
    })
}

Rx.from(makePromise()).subscribe({
    next: (data) => {
        console.log(data);
    }
})

// 싱글 여러 데이터로 부터 만들기
Rx.of('delivery1', '두번째 택배', '세번째 택배').subscribe({
    next: (data) => {
        console.log(data);
    }
})