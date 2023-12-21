import Day2 from './day2/day';
import Day3 from './day3/day';
import Day4 from './day4/day';
import Day5 from './day5/day';
import Day6 from './day6/day';
import DayProvider from './dayProvider';

[Day2,Day3,Day4,Day5, Day6].forEach(d => {
    console.log(`Advent of code 2023 Day ${d.day}`);
    console.log('-------------------------------------');
    console.log('(1)');
    console.log(d.run1());
    console.log('(2)');
    console.log(d.run2());
    console.log();
});
