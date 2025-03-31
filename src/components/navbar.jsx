import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useApi } from '../hooks/useApi.jsx'
import { NavLink, createSearchParams, useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

const navigation = [
  { name: 'new releases', href: '/' },
  { name: 'reviews', href: '/reviews' },
  { name: 'for you', href: '/for-you' },
  { name: 'your top tracks', href: '/top-tracks' },
  { name: 'my ratings', href: '/profile' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") ?? "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate({
        pathname: "search",
        search: createSearchParams({
          query: searchQuery
        }).toString()
      });
    }
  }

  const handleLogout = (e) => {
    api.logout();
    navigate({
      pathname: "login",
      replace: true
    });
  }

  const api = useApi();

  return (
    <Disclosure as="nav" className="h-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center rounded-lg grow p-px">
      {({ open }) => (
        <>
          <div className='h-full w-full bg-lightblack-100 rounded-lg'>
            <div className="max-w-7xl p-2 sm:px-6 lg:px-8 grow">
              <div className="relative flex h-16 items-center justify-between grow">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <Link to="/">
                    <h1 className='font-bold sm:text-xl md:text-2xl lg:text-3xl'>CHUNES</h1>
                  </Link>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) =>
                        <NavLink
                          key={item.href}
                          to={item.href}
                          className={({ isActive }) => classNames(
                            isActive ? 'bg-pink-900 text-white' : 'text-gray-300 transition-colors duration-300 hover:bg-pink-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium')}
                        >{item.name}</NavLink>
                      )}
                    </div>
                  </div>
                </div>

                <div className='sm:w-20 md:w-40 lg:w-60'>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <input
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          handleSearch(e);
                      }}
                      value={searchQuery}
                      type="search"
                      className="relative m-0 w-20 text-sm block flex-auto border-b-2 border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="button-addon2" />

                    {/* <!--Search icon--> */}
                    <span
                      className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200 hover:cursor-pointer"
                      id="basic-addon2"
                      onClick={handleSearch}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                          fillRule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5 justify-self-end" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={api.user?.profileUrl ?? "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"}
                          alt=""
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="/profile"
                              className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              View profile
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <span
                            onClick={handleLogout}
                              className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </span>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton key={item.href}>
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive }) => classNames(
                        isActive ? 'bg-pink-900 text-white' : 'text-gray-300 hover:bg-purple-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium')}
                    >{item.name}</NavLink>
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </div>
        </>
      )}
    </Disclosure>
  )
}
