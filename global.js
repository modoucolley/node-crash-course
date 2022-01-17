
console.log(global);

global.setTimeout(() => {
    console.log("In the timeout");
}, 3000);

setTimeout(() => {
    console.log("In the timeout");
    clearInterval(interval);
}, 3000);

const interval = setInterval(()=>{
    console.log("In the Interval");
}, 1000)

console.log(__dirname);
console.log(__filename);