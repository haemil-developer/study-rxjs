const { Axios } = require('axios');
const { of, from, interval } = require('rxjs');
const { concatAll, delay, take, tap, map, mergeAll, reduce, bufferCount, retry, mergeMap } = require('rxjs/operators');

/**
 * 10초에 한번씩 주식 거래를 시작한다.
 * 
 * 한번의 주식 거래에서는 1000번의 API call 을 수행한다.
 * 1000번의 API call 을 할 때, 동시 요청은 10회 이하로 제한한다.
 * 10회의 요청이 끝날 때 마다 5ms 동안 휴식을 한다
 * 1000번의 요청 중에 에러가 발생하면 요청을 처음부터 다시 시작하되, 최대 2번 까지 반복한다 (재시도 역시 동시요청 10회 이하 조건에 포함 되어야한다.)
 * 
 * 주식 거래를 성공한 뒤에는 10개씩 나누어 결과를 저장하되, 주식 거래 행위에 영향을 주지 않도록 비동기로 저장한다.
 */

function startTrade(tradeNumber) {
    console.log(tradeNumber);
    return range(0, 1000).pipe(
        map(() => apiCall$().pipe(delay(5))),
        mergeAll(10),
        retry(2),
        reduce((accu, data) => {
            return tradeNumber
        })
    )
}

// 함수 뒤에 '$'가 붙으면 observable 을 반환한다는 약속
function apiCall$() {
    return from(Axios.get('https://naver.com'))
}

function saveResult$(result) {
    console.log(`🔋 data saved!`);
}

interval(10 * 1000).pipe(
    mergeMap((tradeNumber) => startTrade(tradeNumber)),
    bufferCount(10),
    mergeMap(results => saveResult$(results))
).subscribe()