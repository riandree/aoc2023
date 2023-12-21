import DayProvider  from '../dayProvider';
import { puzzleInput } from './input';

/**
 * https://adventofcode.com/2023/day/4
 */


function toSetOfNumbers(numbers : string) : Set<number> {
    const res= new Set(numbers.split(" ")
            .map(n => n.trim())
            .filter(n =>  n.length > 0)
            .map(n => parseInt(n)));
    return res;
}

function intersect(a : Set<number>, b: Set<number>) : Set<number> {
    return new Set([...a].filter(n => b.has(n)));
}

function exec1() : string {
    const score=puzzleInput
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0)
        .map(line => {
            const allNumbers=line.split(':')[1];
            const [winningNumbers,ownedNumbers]=allNumbers.split('|');
            const winning=toSetOfNumbers(winningNumbers);
            const owned=toSetOfNumbers(ownedNumbers)
            const ownedWinning=intersect(winning,owned);
            return ownedWinning.size === 0 ? 0 : Math.pow(2,ownedWinning.size-1);
        })
        .reduce((acc,current) => acc+current,0);

    return score.toString();
}

function exec2() : string {
    return "ToDo";
}

const day4 : DayProvider = {
    day : 4,
    run1 : exec1,
    run2 : exec2
}

export default day4;