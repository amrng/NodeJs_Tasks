console.log("--------- Q.1 ----------");
// 1- Create a function that takes the age in years and returns the age in days.

function ageInYears(age) {
  console.log(`You have ${age * 365} days`);
}
ageInYears(28);

console.log("--------- Q.2 ----------");
// 2- Create a function that takes an array of numbers and returns the smallest number in the set.

nums = [10, 500, 210, 2, 90, 7];
let min = nums[0];

function minNumber(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < min) {
      min = nums[i];
    }
  }
}
minNumber(nums);
console.log(min);
console.log("--------- Q.3 ----------");
/*3- Create a function that takes any non-negative number as an array and return
it with its digits in descending order. Descending order is when you sort from highest to lowest.*/

function sortArray(positeveArr) {
  let positeveArray = [];
  for (let num of positeveArr) {
    if (num > 0) {
      positeveArray.push(num);
    }
  }
  for (let i = 0; i < positeveArray.length; i++) {
    for (let j = 0; j < positeveArray.length; j++) {
      if (positeveArray[j] < positeveArray[j + 1]) {
        let swap = positeveArray[j];
        positeveArray[j] = positeveArray[j + 1];
        positeveArray[j + 1] = swap;
      }
    }
  }
  return positeveArray;
}
console.log(sortArray([20, -100, -300, 100, 50, -30, 200]));

console.log("--------- Q.4 ----------");
// 4- Create a function that takes an array of numbers and returns the average of this numbers.
let avgArr = [10, 20, 30, 40, 50];
function average(avgArr) {
  let sum = 0;
  for (let num of avgArr) {
    sum += num;
  }
  return (avg = sum / avgArr.length);
}
average(avgArr);
console.log(avg);

console.log("--------- Q.5 ----------");
/*5- what is the output of 
Console.log( []  == [] )
Console.log( {} == {} )
And explain your answer
*/
console.log(`The output will be false because in the heap every array or object has his own refrense
so here we checking now if the refrences are equals`);

console.log("--------- Q.6 ----------");
/* 6- what is the output of this code with explaination:

function main() {
    console.log("A");
    setTimeout(function print() {
        console.log("B");
    }, 0);
    console.log("C");
   }
    main();
*/
console.log(
  `The output will be (A then C then B)
That happen because the setTimeout function will join the webAPI
and then queue however the inputted timeouts inserted`
);

console.log("--------- Q.7 ----------");
/*7- what is the output of this code with explaination
    var num = 8;
    var num = 10;
    console.log(num);
*/
console.log(`The output will be 10
That happen because the var num is declared before the console.log,
why 10 ?
because the we re-assigned the num to be equal to 10`);

console.log("--------- Q.8 ----------");
/*8- what is the output of this code with explaination
    function sayHi() {
        console.log(name);
        console.log(age);
        var name = 'Ayush';
        let age = 21;
    }
    sayHi();
*/
console.log(`The output will be
1- console.log(name) -> undefined
--Why ?,
because only declerations are hoisted not initilization.

2- console.log(age) -> error
--Why ?,
because for (let and const) if i use the variables before declaration and initialization,
ok well be hoisted but will also join to temporal dead zone
that means i can't use them before declaration and initialization.`);
