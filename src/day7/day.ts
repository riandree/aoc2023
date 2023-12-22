import DayProvider  from '../dayProvider';
import { puzzleInput } from './input';

/**
 * https://adventofcode.com/2023/day/7
 */

const HAND=0;
const BID=1;
type HandWithBid = [string,number];
enum HandType { FIVEOFAKIND=100, FOUROFAKIND=90, FULLHOUSE=80, THREEOFAKIND=70, TWOPAIR=60, ONEPAIR=50, HIGHCARD=40 };

function parseInput(input : string) : HandWithBid[] {
    return input.split('\n')
        .map(line => line.trim().split(/\s+/))
        .map(([hand,bid]) => [hand,parseInt(bid)]);
}

function typeFromHand(hand : string) : HandType {
    const cardFrequencies=[...hand].reduce((acc,current) => {
        if (acc.has(current)) {
            acc.set(current, acc.get(current)! + 1);
        } else {
            acc.set(current, 1);
        }        
        return acc;
    },new Map<string,number>())

    if (cardFrequencies.size === 1) {
        return HandType.FIVEOFAKIND;
    }
    const cardCounts=Array.from(cardFrequencies.values());
    if (cardFrequencies.size === 2) {
        if (cardCounts[0]===4 || cardCounts[1]===4) {
            return HandType.FOUROFAKIND;
        }
        if (cardCounts[0]===3 || cardCounts[1]===3) {
            return HandType.FULLHOUSE;
        }
    }

    if (cardCounts.includes(3)) {
        return HandType.THREEOFAKIND;
    }

    if (cardFrequencies.size === 3) {
        return HandType.TWOPAIR;
    }

    if (cardFrequencies.size === 4) {
        return HandType.ONEPAIR;
    }

    return HandType.HIGHCARD;
}

function compare(handA: string, handB: string) :number {
    const [typeA,typeB]=[typeFromHand(handA),typeFromHand(handB)];
    if (typeA !== typeB) {
        // Compare by type.
        return Math.sign(typeA-typeB);
    }
    const cardLabelStrengthOrder=[..."AKQJT98765432"].reverse();
    for(let idx=0;idx<5;idx++) {
        if (handA[idx]!==handB[idx]) {
            const firstCardStrength=cardLabelStrengthOrder.indexOf(handA[idx]);        
            const secondCardStrength=cardLabelStrengthOrder.indexOf(handB[idx]);        
            return Math.sign(firstCardStrength-secondCardStrength);
        }
    }
    return 0;
}

function exec1() : string {
    const handsAndBids = parseInput(puzzleInput);
    const sorted=handsAndBids
        .toSorted((handAndBidA,handAndBidB) => compare(handAndBidA[HAND],handAndBidB[HAND]));
    
    const result=sorted
            .map((handWithBit,index) => handWithBit[BID]*(index+1))
            .reduce((acc,curr) => acc+curr,0);

    return `${result}`;
}

function exec2() : string {
    return `ToDo`;
}

const day7 : DayProvider = {
    day : 7,
    run1 : exec1,
    run2 : exec2
}

export default day7;