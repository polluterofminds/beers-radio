import { NextRequest, NextResponse } from 'next/server';
import { extract } from '@extractus/feed-extractor'
import { FeedSchema } from '@/types';
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

const feeds = [
  { podcast: "Steal This Beer", url: "https://stealthisbeer.squarespace.com/episodes?format=rss" }, 
  { podcast: "The Beerists", url: "https://thebeerists.libsyn.com/rss" }, 
  { podcast: "Don't Drink Beer", url: "https://dontdrinkbeer.libsyn.com/rss" }, 
  { podcast: "Good Beer Matters", url: "https://anchor.fm/s/bccc788/podcast/rss" }, 
  { podcast: "ABV Chicago", url: "https://abvchicago.libsyn.com/rss" }, 
  { podcast: "The Session", url: "https://feeds.megaphone.fm/thesession" }, 
  { podcast: "Perfect Pour", url: "https://perfectpourpod.com/feed/" }, 
  { podcast: "Beer Night In San Diego", url: "https://threebzine.podomatic.com/rss2.xml" }, 
  { podcast: "Brew Roots", url: "https://feeds.acast.com/public/shows/5af4bb76b30ae6571f83f77f" }, 
  { podcast: "New Glarus Brewing", url: "https://feeds.buzzsprout.com/2040671.rss" }, 
  { podcast: "Drink Beer Think Beer", url: "https://feeds.transistor.fm/drink-beer-think-beer-with-john-holl" }, 
  { podcast: "All About Beer", url: "https://feeds.transistor.fm/all-about-beer" }, 
  { podcast: "Beer Me!", url: "https://feeds.simplecast.com/sqpTl6oG" }, 
  { podcast: "All About Beer", url: "https://feeds.soundcloud.com/users/soundcloud:users:243440503/sounds.rss" }
]

export async function GET(request: NextRequest) {
    try {
      const results: FeedSchema[] = []
      for(const feed of feeds) {
        let result: any = await extract(feed.url)
        result.entries.length > 10 ? result.entries = result.entries.slice(0, 10) : result.entries = result.entries;    
        results.push(result)
      }      
      //  Send it to Pinata
      const { IpfsHash } = await pinata.upload.json(results)      
      //  Swap it like it's hot
      await pinata.gateways.swapCid({
        cid: process.env.NEXT_PUBLIC_ORIGINAL_CID!,
        swapCid: IpfsHash
      })
      return NextResponse.json(results);
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Server error" });
    }    
}