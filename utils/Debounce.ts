export  function debounce(fn:Function,delay=100) {
    let timer: ReturnType<typeof setTimeout>;
    return function (...args:any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args)
        },delay)
    }
}