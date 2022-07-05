import fetch from "node-fetch";

const test = async () => {
    const name = "KC%20Flooo"
    const apiKey = "RGAPI-4a1c7dcf-fdf7-473c-a70c-aa6f36da033d"
    const response = await fetch(`https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${apiKey}`);
    const data = await response.json();
    console.log(data);
    return data;
}

test();

