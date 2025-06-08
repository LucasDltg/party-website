'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebaseConfig'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import nookies from 'nookies'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return unsubscribe
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    nookies.destroy(null, 'token') // clear token cookie on logout
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-indigo-600 text-white flex justify-between items-center px-5 py-3 z-50">
      <h1 className="text-xl font-bold m-0">
        <Link href="/">MyApp</Link>
      </h1>
      <nav>
        {user ? (
          <div className="flex items-center">
            <span className="mr-4">Hello, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 px-3 py-1 rounded cursor-pointer hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/auth">
            <button className="bg-white text-indigo-600 px-3 py-1 rounded cursor-pointer hover:bg-gray-100 transition">
              Connect
            </button>
          </Link>
        )}
      </nav>
    </header>
  )
}
