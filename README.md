## use-intensive-function-suspense

- That hassle free hook which takes care of all that busy waiting we have to do while our CPU is doing intensive calculations like recursion.

- **use-intensive-function-suspense** plays along with **React Suspense** and under the hood with cache management packages

- workerpool package is also used which returns a promise until the function is executed. Which is exaclty what suspense needs to render the fallback.

```js
workerpool, lru-cache, immer, md5 etc.
```

- Until the the function is executed, the promise is thrown by the **use-intensive-function-suspense** which will by caught by suspense and then suspense will render fallback, which can by any Loading component of your choice, until the promise actual resolves and the result arrives. After the promise is resolved, suspense will then render the component.
Also, it has been made sure that it doesn't make the same function call again and again. For this, data is stored in cache.

### Installation

```sh
yarn add use-intensive-function-suspense

or

npm i use-intensive-function-suspense

```

### Usage

```js

import React, { Suspense } from 'react';
import useItensiveFunction from 'use-intensive-function-suspense';

function fib(num){
    if(num <= 1){
        return num;
    }
    return fib(num - 1) + fib(num - 2);
}

const Fibonacci = ({ num }) => {

    /**
        * @param {Function} fib
        * @param {Array} [args] 
    */

    // the args has to be in array as the workerpool demands them so.
    const result = useItensiveFunction(fib, [num]);

    return (
        <div>
            <h4>
            Fibonacci For {num} = {'    '} 
             <strong className='red-text'>{result}</strong>
            </h4>
        </div>
    )
}

const Calculations = () => {

    return (
        <div className="container center">
            <Suspense fallback={<LazyPreloader />}>
                <Fibonacci num={10} />
            </Suspense>
            <Suspense fallback={<LazyPreloader />}>
                <Fibonacci num={20} />
            </Suspense>
            <Suspense fallback={<LazyPreloader />}>
                <Fibonacci num={30} />
            </Suspense>
        </div>
    )
}

```

### Repository

[Explore](https://github.com/inblack67/use-intensive-function-suspense)

### About The Author

[Website](https://inblack67.netlify.app)

[Github](https://github.com/inblack67)

