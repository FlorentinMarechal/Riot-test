// CONFIG

import fetch from "node-fetch";

const config = {
    apiKey: "RGAPI-64a445c6-b0b1-4ffa-a8c4-3b5e43e1a9cc",
    gameCount: 15
}

// FUNCTIONS

const getPuuid = async (name) => {
    const response = await fetch(`https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${config.apiKey}`);
    const data = await response.json();
    // console.log("puuid", data);
    return data.puuid;
}

const getMatchList = async (puuid) => {
    const response = await fetch(`https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=${config.gameCount}&api_key=${config.apiKey}`);
    const data = await response.json();
    // console.log("match id", data);
    return data;
}

const getMatchData = async (matchId, puuid) => {
    // const matchList = await getMatchList();
    // const puuid = await getPuuid();
    const response = await fetch(`https://europe.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${config.apiKey}`)
    const data = await response.json();
    console.log(data);
    const gameInfo = {
        traits:"",
        units:""
    }
    // console.log(gameInfo);
    const matchData = data.info.participants;
    // console.log("matchData: ",matchData);
    matchData.forEach(match => {
        if(match.puuid !== puuid) return;
        gameInfo.traits = match.traits;
        gameInfo.units = match.units;
    });
    // console.log("gameInfo: ", gameInfo);
    return gameInfo;
}

const createHistoricArray = async (matchList) => {
    const historicInfo = [];

    for(const matchId of matchList) {
        const gameInfo = await getMatchData(matchId, puuid);
        historicInfo.push(gameInfo);
    }
    // console.log("final data: ", historicInfo);
    return historicInfo;
}

const unitStat = (historicInfo) => {
    const unitPlayed = [];
    for(const match of historicInfo) {
        const units = match.units;
        units.forEach(unit => {
            unitPlayed.push(unit.character_id);
        });
    }
    const unitCount = {};
    unitPlayed.forEach(element => {
        unitCount[element] = (unitCount[element] || 0) + 1;
      });
    return unitCount;
}

const makeStat = (unitCount) => {
    const unitCountArray = [];
    for(const unit of unitCount) {
        unitCountArray.push(unit)
    }
    console.log("Pas trier: ",unitCountArray);
    console.log("Trier: ",unitCountArray.sort());
}

// PROGRAMME

const name = "KC Flooo"

const puuid = await getPuuid(name);

const matchList = await getMatchList(puuid);

console.log("matchList: ", matchList);

const historicInfo = await createHistoricArray(matchList);

// console.log("historic Info: ", historicInfo);

const unitCount = unitStat(historicInfo);

console.log(unitCount);

const sortArray = makeStat(unitCount);

console.log(sortArray);