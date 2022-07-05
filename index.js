import { TftApi, Constants } from 'twisted'

const api = new TftApi({
    key: 'RGAPI-4a1c7dcf-fdf7-473c-a70c-aa6f36da033d'
})

const configTft = {
    summonerName: 'KC Flooo',
    region: Constants.Regions.EU_WEST,
    tftRegion: Constants.RegionGroups.EUROPE
}

export async function getSummonerTft () {
    const data = await api.Summoner.getByName(configTft.summonerName, configTft.region)
    // console.log("data: ", data);
    return data
  }

//getSummonerTft();

export async function matchListDetailsTft () {
    const puuidKey = (await getSummonerTft()).response.puuid;
    const {
      response: {
        puuid = puuidKey
      }
    } = await getSummonerTft()
    const data = await api.Match.listWithDetails(puuid, configTft.tftRegion)
    const matchId = [];
    for(const match of data){
        matchId.push(match.metadata.match_id);
    }
    // console.log(matchId);
    return matchId
  }

export async function matchDetailsTft () {
    const puuidKey = (await getSummonerTft()).response.puuid;
    const {
      response: {
        puuid = puuidKey
      }
    } = await getSummonerTft()
    const {
      response: [matchId] = matchListDetailsTft()
    } = await api.Match.list(puuid, configTft.tftRegion)
    const data = await api.Match.get(matchId, configTft.tftRegion);
    console.log("data match: ", data);
}

matchDetailsTft();

// https://developer.riotgames.com/apis#tft-match-v1/GET_getMatch