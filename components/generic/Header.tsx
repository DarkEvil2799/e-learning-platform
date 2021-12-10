import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, MenuIcon, PlusIcon, XIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client'
import { SITE_NAME } from '../../utils/constants'
import { useRouter } from 'next/router'

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const [session, loading] = useSession();
  const user = (session ? session.user : null);
  const router = useRouter();

  return (
<Disclosure as="nav" className="bg-primary-500 py-6">
{({ open }) => (
  <>
        <nav className="mx-auto px-8" aria-label="Global">
            <div className="flex flex-row items-center">
              <div className="flex-shrink flex items-center justify-between w-full md:w-auto">
                <Link href="/">
                  <a className="flex-shrink flex space-x-4 items-center">
                    <span className="w-12 h-12">
                      <img src="/logo.png" />
                    </span>
                    <span className="text-primary-100 font-bold text-2xl">{ SITE_NAME }</span>
                  </a>
                </Link>
                <div className="flex-grow"></div>
                <div className="-mr-2 flex-shrink flex items-center md:hidden">

                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </Disclosure.Button>

                </div>
              </div>
              <div className="flex-grow"></div>
            
            { user ? (
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-4 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs transition bg-primary-500 rounded-full flex items-center text-sm active:ring-2 active:ring-blue-300 p-2 lg:rounded-full lg:hover:bg-primary-600">
                            {/* <span className="w-8 h-8 bg-white rounded-full text-center"></span> */}
                            <img src={user.image ?? ""} alt="" className="w-8 h-8 rounded-full" />
                            <span className="ml-2 text-primary-100 text-base font-medium lg:block">
                              <span className="sr-only">Open user menu for </span>{user.name}
                            </span>
                            <ChevronDownIcon
                              className="hidden flex-shrink-0 h-3 w-4 text-primary-100 lg:block"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-primary-600 ring-1 ring-primary-400 focus:outline-none"
                          >
                              <Menu.Item key="signout">
                                {({active}) => (
                                  <button
                                    type="submit"
                                    
                                    onClick={() => signOut({
                                      callbackUrl: `${window.location.origin}`
                                    })}
                                    className={classNames(
                                      active ? "bg-primary-400" : null,
                                      "block px-4 py-2 text-sm text-primary-100 w-full text-left")}
                                  >  
                                    Sign out
                                  </button>
                                )}
                              </Menu.Item>

                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
            ) : (
                <div className="hidden md:flex md:items-center md:space-x-6">
                <button type="submit"
                        disabled={loading}
                        onClick={() => signIn('google', {
                          callbackUrl: `${window.location.origin}`
                        })}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white hover:text-primary-200">
                    Sign in
                </button>
                </div>)
            }
            </div>

          <Disclosure.Panel className="md:hidden">
            { user ? (
                <div className="py-3">
                    <div className="flex items-center pt-4">
                        <div className="ml-3">
                            <div className="text-base font-medium text-white">{user.name}</div>
                            <div className="text-sm font-medium text-primary-300">{user.email}</div>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <button
                          type="submit"
                          disabled={loading}
                          onClick={() => signOut({
                            callbackUrl: `${window.location.origin}`
                          })}
                          className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-primary-600"
                      >  
                        Sign Out
                      </button>                    
                    </div>
                </div>
            ) : (
                <div className="py-3 border-t border-gray-700">
                    <div className="space-y-2 lg:px-3">
                        <button type="submit"
                                disabled={loading}
                                onClick={() => signIn('cognito', {
                                  callbackUrl: `${window.location.origin}`
                                })}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600">
                            Sign in
                        </button>                        
                    </div>
                </div>
            ) }
          </Disclosure.Panel>

        </nav>
    </>
)}
</Disclosure>
  )
}

export default Header