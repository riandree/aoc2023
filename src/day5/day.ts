import DayProvider  from '../dayProvider';
import { puzzleInput } from './input';

/**
 * https://adventofcode.com/2023/day/5
 */

enum State { NEXT, SEED, SOIL, FERTILIZER, WATER, LIGHT, TEMPERATURE, HUMIDITY }

type Range = {
    src : number,
    dest : number,
    width : number
}

type MappedSeeds = {
    initialSeeds : number[],
    ranges : Map<String,Range[]>
}

function processSeed(line : string) : number[] {
    const seeds=line.split(':')[1].trim();
    return seeds.split(/\s+/)
        .map(s => parseInt(s));
}

function parseRange(line : string) : Range | null {
    const parsed=line.split(/\s+/);
    if (isNaN(parseInt(parsed[0]))) {
        return null;
    }
    return {
        src : parseInt(parsed[1]),
        dest : parseInt(parsed[0]),
        width : parseInt(parsed[2]),
    };
}

function createRangeIfAbsent(ranges : Map<String,Range[]>, range : string) : Range[] {
    if (!ranges.has(range)) {
        ranges.set(range,[]);
    }
    return ranges.get(range) as Range[];
}

function processCategory(category : string, line : string,ranges : Map<String,Range[]>) {
    const range=parseRange(line);
    if (!!range) {
        const rangeList = createRangeIfAbsent(ranges,category);
        rangeList.push(range);
    }
}

function nextState(currentState : State, line : string) {
    if (line.startsWith('soil')) {
        return State.SOIL;
    } else if (line.startsWith('fertilizer')) {
        return State.FERTILIZER;
    } else if (line.startsWith('water')) {
        return State.WATER;
    } else if (line.startsWith('light')) {
        return State.LIGHT;
    } else if (line.startsWith('temperature')) {
        return State.TEMPERATURE;
    } else if (line.startsWith('humidity')) {
        return State.HUMIDITY;
    } else if (line.startsWith('seed')) {
        return State.SEED;
    }  
    return currentState;
}

function processInputLines(lines : string[]) : MappedSeeds {
    const initialSeeds : number[] = [...processSeed(lines[0])];
    const ranges : Map<String,Range[]> = new Map();
    
    let state:State=State.NEXT;
    for (let index = 1; index < lines.length; index++) {
        if (state !== State.NEXT) {
            processCategory(State[state],lines[index],ranges);
        }
        state=nextState(state,lines[index]);        
    }

    return {
        initialSeeds,
        ranges
    };
}

function inRange(start : number, width : number, value2Test : number) : boolean {
    if (value2Test < start) {
        return false;
    }
    if (value2Test > (start+width-1)) {
        return false;
    }
    return true;
}

function mapCategory(mappedRanges :  MappedSeeds['ranges'], category : string, value : number) : number {
    if (mappedRanges.has(category)) {
        const ranges=mappedRanges.get(category) as Range[];
        const matching=ranges.find(r => inRange(r.src,r.width,value));
        if (!!matching) {
            return matching.dest + (value - matching.src);    
        } 
        return value;
    } else {
        throw new Error("Unknown category : "+category);
    }
}


function exec1() : string {
    const lines=puzzleInput.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const mapped=processInputLines(lines);

    const mapSeed2Location = (seed : number) => {
        const soil=mapCategory(mapped.ranges,State[State.SEED],seed);
        const fertilizer=mapCategory(mapped.ranges,State[State.SOIL],soil);
        const water=mapCategory(mapped.ranges,State[State.FERTILIZER],fertilizer);
        const light=mapCategory(mapped.ranges,State[State.WATER],water);
        const temperature=mapCategory(mapped.ranges,State[State.LIGHT],light);
        const humidity=mapCategory(mapped.ranges,State[State.TEMPERATURE],temperature);
        const location=mapCategory(mapped.ranges,State[State.HUMIDITY],humidity);
        return location;
    };

    const locations=mapped.initialSeeds
            .map(seed => mapSeed2Location(seed));
    locations.sort().reverse();

    return locations[0].toString();
}

function exec2() : string {
    return "ToDo";
}

const day5 : DayProvider = {
    day : 5,
    run1 : exec1,
    run2 : exec2
}

export default day5;