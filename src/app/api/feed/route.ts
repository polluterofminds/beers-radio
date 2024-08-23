import { NextRequest, NextResponse } from 'next/server';
import { FeedSchema } from '@/types';
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

export async function GET(request: NextRequest) {
    try {      
      const file = await pinata.gateways.get(process.env.NEXT_PUBLIC_ORIGINAL_CID!)      
      return NextResponse.json(file);
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Server error" });
    }    
}