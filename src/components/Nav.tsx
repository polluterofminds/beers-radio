import Link from 'next/link'
import React from 'react'

const Nav = () => {
  return (
    <nav className="py-4 px-8">
      <h1 className="text-2xl font-extrabold"><Link href="/"><span className="flex items-center"><img className="h-20" src="/logo.png" alt="Beers radio" />Beers Radio</span></Link></h1>
    </nav>
  )
}

export default Nav