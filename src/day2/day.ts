import DayProvider  from '../dayProvider';
import { puzzleInput } from './input';

/**
 * https://adventofcode.com/2023/day/2
 */

const GameRegex = /Game\s+(\d+):(.*)/;

type GameT = {
    id : number,
    red : number,
    green : number,
    blue : number
}

function parseGame(gameDesc : string) : GameT {
    let [_,idStr,gameElements]=GameRegex.exec(gameDesc)!;

    const initial : GameT = {
        id : parseInt(idStr),
        red : 0,
        green: 0,
        blue : 0
    };

    return gameElements.split(";")
        .flatMap(turn => turn.split(","))
        .map(single => {
            const countOfColor=single.trim().split(/\s+/);
            return [parseInt(countOfColor[0]),countOfColor[1]] as [number,string];
        })
        .reduce((acc,current) => {
            switch (current[1]) {
                case "red" :
                    return { ...acc, red : Math.max(acc.red,current[0]) };
                case "green" :
                    return { ...acc, green : Math.max(acc.green,current[0]) };
                case "blue" :
                    return { ...acc, blue : Math.max(acc.blue,current[0]) };
            }
            throw new Error(`can't process : ${current}`);
        } ,initial);
}

function isGamePossible(game : GameT) : boolean {
    // possible if the bag contained a maximum of only 12 red cubes, 13 green cubes, and 14 blue cubes ?
    return game.red <= 12 && game.green <= 13 && game.blue <= 14;
}

function exec1() : string {
    return puzzleInput.split("\n")
        .map(line => parseGame(line))
        .filter( game => isGamePossible(game))
        .reduce((acc,current) => acc+current.id,0).toString();
}

function exec2() : string {
    return puzzleInput.split("\n")
        .map(line => parseGame(line))
        .map(game => game.red * game.green * game.blue)
        .reduce((acc,current) => acc+current,0).toString();
}

const day2 : DayProvider = {
    day : 2,
    run1 : exec1,
    run2 : exec2
}

export default day2;