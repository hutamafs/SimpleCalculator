const numbers = [1,4,5,1,2,10,12,15,11,13,11,5];
console.log(numbers.filter(el => {return el%2 !== 0}).reduce((acc,cur) => acc+cur,0));
console.log(numbers.filter((v,i)=>numbers.indexOf(v)===i).filter(el=>el%2!==0).reduce((a,b)=>a+b));