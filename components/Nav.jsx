"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';


const Nav = () => {
  const { data:session } = useSession();
  const [providers, setproviders] = useState(null);

  const [toggleDropdown, settoggleDropdown] = useState(false)

  useEffect(() => {
    const setproviders = async () => {
      const response = await getProviders();
      setproviders(response);
    }
    setproviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src='/assets/images/Deadpool-Logo.svg'
          alt="Project Logo"
          width={40}
          height={40}
        />
        <p className="logo_text">Your Idea</p>
      </Link>


      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-idea"
              className="black_btn">
              Create Idea
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/images/Deadpool-Logo.svg"
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>

          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Nav */}

      <div className=" sm:hidden flex relative">
        {session?.user ? (
          <button className="flex">
            <Image
              src="/assets/images/Deadpool-Logo.svg"
              alt="profile"
              width={40}
              height={40}
              className="rounded-full"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-idea"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  Create Idea
                </Link>

                <button
                  type="button"
                  className="black_btn mt-5 w-full"
                  onClick={() => {
                    settoggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>

              </div>

            )}

          </button>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}

      </div>




    </nav>
  )
}

export default Nav