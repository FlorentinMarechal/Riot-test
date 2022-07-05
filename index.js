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
    return data
  }



export async function matchListDetailsTft () {
    const puuidKey = await (await getSummonerTft()).response.puuid;
    const {
      response: {
        puuid = puuidKey
      }
    } = await getSummonerTft()
    const data = await api.Match.listWithDetails(puuid, configTft.tftRegion)
    console.log("data match: ",data.length );
    const matchList = [];
    for(const match of data){
        matchList.push(match.metadata.match_id);
    }
    console.log(matchList);
    return matchList
  }

matchListDetailsTft();

dzada