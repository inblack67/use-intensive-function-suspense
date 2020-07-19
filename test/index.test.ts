import { newPool, useIntensiveFunctionSuspense } from '../src/index'

beforeAll(done => done());
afterAll(done => {
    newPool.terminate();
    done();
});

function fibonacci(num: number): number{
    if(num <= 1){
        return num;
    }
    return fibonacci(num - 2) + fibonacci(num - 1);
}

function factorial(num: number): number{
    if(num === 0){
        return 1;
    }
    return num * factorial(num - 1);
}

describe('useIntensiveFunction', () => {
    it('is defined', () => {
        expect(useIntensiveFunctionSuspense).toBeDefined();
    })

    it('calculates fibonacci', () => {
        try {
            useIntensiveFunctionSuspense(fibonacci, [5])
        } catch (promise) {
            promise.then((data: number) => {
                expect(data).toEqual(5);
            })
        }
    })

    it('calculates factorial', () => {
        try {
            useIntensiveFunctionSuspense(factorial, [5])
        } catch (promise) {
            promise.then((data: number) => {
                expect(data).toEqual(120);
            })
        }
    })
})