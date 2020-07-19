import produce from 'immer'
import lru from 'lru-cache'
import md5 from 'md5'
import workerpool from 'workerpool'

const cache = new lru(50);
const newPool: any = new (workerpool.pool as any)();

const useIntensiveFunctionSuspense = (func: (arg: any) => any, args: [any]) => {
    const key = `${func.name}.${md5(JSON.stringify(args))}`;
    
    
    const value: any = cache.get(key) || { status: 'new', data: null }

    if(value.status === 'resolved'){
        return value.data;
    }

    cache.set(key, value);

    const promise = newPool.exec(func, args);

    promise.then((data: any) => {
        cache.set(key, produce(value, (draft: any) => {
            draft.status = 'resolved';
            draft.data = data;
        }));
    })

    throw promise; // will be caught by suspense
}

export { newPool, useIntensiveFunctionSuspense };