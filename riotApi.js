import fetch from "node-fetch";

const config = {
    apiKey: "RGAPI-971fca2e-7a7d-4b88-81f1-9f4c8c18f96b"
}

const getPuuid = async (name) => {
    const response = await fetch(`https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${config.apiKey}`);
    const data = await response.json();
    // console.log("puuid", data);
    return data.puuid;
}

// getSummoner();

/* 
Remplacer les appels à fonction par des paramétres 
*/

const getMatchList = async (puuid) => {
    const response = await fetch(`https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${config.apiKey}`);
    const data = await response.json();
    // console.log("match id", data);
    return data;
}

const getMatchData = async (matchId, puuid) => {
    // const matchList = await getMatchList();
    // const puuid = await getPuuid();
    const response = await fetch(`https://europe.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${config.apiKey}`)
    const data = await response.json();
    // console.log(data);
    const gameInfo = {
        traits:"",
        units:"",
        match_id:data.metadata.match_id
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

const name = "KC Flooo"

const puuid = await getPuuid(name);

const matchList = await getMatchList(puuid);

const historicInfo = [];

// matchList.forEach(matchId => {
//     const gameInfo = await getMatchData(matchId, puuid);
//     historicInfo.push(gameInfo);
// })

const createHistoricArray = async () => {
    for(const matchId of matchList) {
        const gameInfo = await getMatchData(matchId, puuid);
        historicInfo.push(gameInfo);
    }
    console.log("final data: ", historicInfo);
}

createHistoricArray();
