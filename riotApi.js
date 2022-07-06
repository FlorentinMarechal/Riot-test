import fetch from "node-fetch";

const config = {
    name: "KC Flooo",
    apiKey: "RGAPI-fe279972-4abe-4d0b-9a4d-9b978e4bd3c4"
}

const getPuuid = async () => {
    const response = await fetch(`https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${config.name}?api_key=${config.apiKey}`);
    const data = await response.json();
    // console.log("puuid", data);
    return data.puuid;
}

// getSummoner();

const getMatchList = async () => {
    const puuid = await getPuuid()
    const response = await fetch(`https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${config.apiKey}`);
    const data = await response.json();
    // console.log("match id", data);
    return data;
}

const getMatchData = async () => {
    const matchList = await getMatchList();
    const puuid = await getPuuid();
    const response = await fetch(`https://europe.api.riotgames.com/tft/match/v1/matches/${matchList[0]}?api_key=${config.apiKey}`)
    const data = await response.json();
    console.log("match data: ",data.info.participants);
    
    const champPlayed = data.map(matchData => {
        if(matchData.puuid !== puuid) return
        /* 
        Creer un objet trait, un objet units
        */
    })
}

getMatchData();