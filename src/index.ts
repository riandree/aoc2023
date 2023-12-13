import Day2 from './day2/day2';
import Day3 from './day3/day3';
import Day4 from './day4/day4';
import DayProvider from './dayProvider';

const days : { [day:number] : Array<() => string> } = [];

[Day2,Day3,Day4].forEach(d => {
    console.log(`Advent of code 2023 Day ${d.day}`);
    console.log('-------------------------------------');
    console.log('(1)');
    console.log(d.run1());
    console.log('(2)');
    console.log(d.run2());
    console.log();
});