import DayProvider  from '../dayProvider';
import zip from 'lodash/zip';
import { puzzleInput } from './input';

type Time = number;
type Distance = number;
type ToyBoatRace = [Time,Distance]; 

function parsePuzzle(p : string) : ToyBoatRace[] {
    const [times,distances]=p.split('\n')
     .map(line => line.split(':')[1])
     .map(vals => vals.trim().split(/\s+/))
     .map(arr => arr.map(s => parseInt(s)));
    return zip(times,distances) as ToyBoatRace[];
}

function computeNumberOfWinningOptions(timeOfRace : number, competitorDistance : number) : number {
    // The function describing the distance travelled in a race that lasts 'timeOfRace' milliseconds
    // for a certain time spent charging the boat at the beginning is a quadratic formular.
    // Solving this equation and intersecting it with the maximum distance travelled by the best competitor
    // leads to the minimum and maximum times one can press the "charge" button in order to at least be as
    // good as the best competitor. Since one can only chare for an integral amount of time we have to
    // charge for the next integral number upwards for the minimum or downwards for the maximum charging time
    // of our boat respectively in order to win. (see graph for race (time:7,dist:9) in todays source-folder)
    const lowerIntersectionMillies=(timeOfRace - Math.sqrt(Math.pow(timeOfRace,2)-4*competitorDistance)) / 2;
    const upperIntersectionMillies=(timeOfRace + Math.sqrt(Math.pow(timeOfRace,2)-4*competitorDistance)) / 2;
    const lowerWinningMillies=Number.isInteger(lowerIntersectionMillies) ? lowerIntersectionMillies + 1 : Math.ceil(lowerIntersectionMillies);
    const upperWinningMillies=Number.isInteger(upperIntersectionMillies) ? upperIntersectionMillies - 1 : Math.floor(upperIntersectionMillies);
    return upperWinningMillies-lowerWinningMillies+1;
}

function solve(input : string) {
    const toyBoatRaces=parsePuzzle(input);
    const result=toyBoatRaces
                    .map(race => computeNumberOfWinningOptions(...race))
                    .reduce((acc,n) => acc*n,1);

    return `${result}`;
}

function exec1() : string {
    return `${solve(puzzleInput)}`;
}

function exec2() : string {
    return `${solve(puzzleInput.replaceAll(' ',''))}`;
}

const day6 : DayProvider = {
    day : 6,
    run1 : exec1,
    run2 : exec2
}

export default day6;