import { fileURLToPath } from 'url';
import DayProvider  from '../dayProvider';
import { puzzleInput } from './input';

/**
 * https://adventofcode.com/2023/day/3
 */

type MapEntryT = {
    linenr : number,
    start : number,
    end : number,
    value: string
}

function mkPartKey(linenr : number,start : number) : string {
    return `${linenr}-${start}`;
}

function parseLines(lines : string[], lineParser : RegExp) : Map<string,MapEntryT> {
    const partsMap : Map<string,MapEntryT> = new Map();
    for(let linenr=0;linenr<lines.length;linenr++) {
        const line=lines[linenr];
        const matchIter=line.matchAll(lineParser);
        let match=matchIter.next();
        while (!match.done) {
            const matchValue=match.value as RegExpMatchArray & { indices : Array<number[]>};
            const [start,end]=matchValue.indices[1];            
            partsMap.set(mkPartKey(linenr,start), { linenr, start, end, value : match.value[1] });
            match=matchIter.next();
        }
    }
    return partsMap;
}

function isAdjacent(part : MapEntryT, symbol : MapEntryT) {
    const deltaY=Math.abs(part.linenr-symbol.linenr);
    if (deltaY <= 1) {
        const left=Math.max(part.start-1,0);
        const right=part.end;
        return left <= symbol.start && right >= symbol.start;
    }
    return false;
}

function parsePartsAndSymbols() : [Array<MapEntryT>,Array<MapEntryT>] {
    const lines=puzzleInput
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);

    const parts=Array.from(parseLines(lines,/[^0-9]*(\d+)[^0-9]*/gd)).map(([_,p]) => p);
    const symbols=Array.from(parseLines(lines,/([^.0-9])/gd)).map(([_,s]) => s);
    return [parts,symbols];
}

function exec1() : string {
    const [parts,symbols]=parsePartsAndSymbols();
    const filtered=parts.filter(part => symbols.some(symbol => isAdjacent(part,symbol)));    
    return filtered.reduce((acc,part) => acc+parseInt(part.value),0).toString();
}

function exec2() : string {
    const [parts,symbols]=parsePartsAndSymbols();
    const sumOfGearRatios=symbols
                            .map(s => parts.filter(p => isAdjacent(p,s)))
                            .filter(partsList => partsList.length === 2)
                            .map(partsPairs => parseInt(partsPairs[0].value) * parseInt(partsPairs[1].value))
                            .reduce((acc,val)=>acc+val,0);
    return sumOfGearRatios.toString();
}

const day3 : DayProvider = {
    day : 3,
    run1 : exec1,
    run2 : exec2
}

export default day3;