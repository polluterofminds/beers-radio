import About from "@/components/About";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { FeedSchema } from "@/types";
import Link from "next/link";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

export default async function Home(props: any) {
  const data: any = await pinata.gateways.get(process.env.NEXT_PUBLIC_ORIGINAL_CID!)

  const allEntries = data.data.map((feed: FeedSchema) => {
    return {
      title: feed.title,
      episodes: feed.entries.length,
      //  @ts-ignore
      mostRecent: feed.entries.sort((a, b) => new Date(b.published) - new Date(a.published))[0].published
    }
  }
  );

  //  @ts-ignore
  let filteredEntries = allEntries;

  return (
    <main className="max-w-[1200px] m-auto">
      <Nav />
      <div className="flex px-8 mt-10">
        <div className="hidden sm:block w-1/4">
          <h3 className="font-bold text-xl">Discover</h3>
          <div className="my-2">
            <Link href="/" className="font-light rounded-lg px-6 py-2 hover:underline">Recent</Link>
          </div>
          <div className="my-2">
            <button className="font-light rounded-lg px-6 py-2 bg-gray-700 hover:underline">Browse</button>
          </div>
          <About />
        </div>

        <div className="w-3/4 m-auto">
          <h2 className="font-light text-2xl">Browse Podcasts</h2>
          <ul role="list" className="divide-y divide-white">
            {filteredEntries.map((entry: any) => (
              <li
                key={entry.title}
                className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
              >
                <div>
                  <p className="text-sm font-semibold leading-6 text-white-900">
                    <Link href={`/${encodeURI(entry.title || "")}`} className="hover:underline">
                      {entry.title}
                    </Link>
                    <br />
                    <span className="my-4">
                      <span className="text-sm font-light"></span>
                    </span>
                  </p>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-white-500">
                    <p>
                      {entry.episodes} total episodes
                    </p>
                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                      <circle r={1} cx={1} cy={1} />
                    </svg>
                    <p>
                      <time dateTime={entry.mostRecent}>Most recent episode: {new Date(entry.mostRecent).toLocaleString()}</time>
                    </p>
                  </div>
                </div>
                <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                  <div className="flex -space-x-0.5">
                  </div>
                  {/* <a href={entry.link} target="_blank" rel="noreferrer noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                    <span className="text-xs font-bold">Listen now</span>
                  </a> */}
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
