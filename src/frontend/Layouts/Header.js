import React, { useEffect, useState } from 'react'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, ArrowRightIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { Link, useNavigate } from "react-router-dom";
import { decryptUserDataLocalStorage, isLoggedIn } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../actions/User';
import { currentCartItem } from '../../actions/VariableChangePage';

const Header = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const loggedIn = useSelector((state) => state.userApi);
  const { currentCItemCnt } = useSelector((state) => state.variableChanges);
  const existingUser = (isLoggedIn() == true) ? true : loggedIn?.isAuthenticated
  const [cartCnt, setcartCnt] = useState(0)

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  const [navigation, setNavigation] = useState([
    { name: 'Home', href: '/', current: true },
    // { name: 'Dashboard', href: '/user-dashboard', current: false },
    { name: 'Products', href: '/products', current: false },
    // { name: 'My Purchases', href: '#', current: false },
  ])


  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Change Password', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const handleLogout = (e) => {
    dispatch(userLogout(history));
  }
  useEffect(() => {
    if (existingUser) {
      const uData = JSON.parse(decryptUserDataLocalStorage());
      setNavigation([...navigation, { name: 'Dashboard', href: '/user-dashboard', current: false }, { name: 'My Purchases', href: '#', current: false }]);
      dispatch(currentCartItem(uData?.data?.id));
    } else {
      setNavigation([...navigation]);
    }
  }, [])

  useEffect(() => {
    setcartCnt(currentCItemCnt)
  }, [currentCItemCnt])

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link to={'/'}>
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {
                      (existingUser == true) ?
                        <>
                          <button
                            type="button"
                            className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>

                          <Link to="/cart" className="inline-flex relative items-center p-3 text-sm font-medium text-center bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-lg ">

                            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                            <span className="sr-only">Cart</span>
                            <div className="inline-flex absolute -top-0 -right-0 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900 /*animate-ping opacity-75*/">{cartCnt}</div>
                          </Link>


                          {/* Profile dropdown */}
                          <Menu as="div" className="ml-3 relative">
                            <div>
                              <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        to={item.href}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                        onClick={item.name == 'Sign out' ? (e) => handleLogout(e) : undefined}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu> </> :
                        <>
                          <Link
                            to={'/login'}
                            className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          >
                            <span className="sr-only">Sign In</span>
                            Sign In
                            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                          </Link>
                        </>
                    }
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>

              {
                (existingUser == true) ?
                  <>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">{user.name}</div>
                          <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                        </div>
                        <button
                          type="button"
                          className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <Link to="/cart" className=" inline-flex relative items-center p-3 text-sm font-medium text-center bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-lg ">

                          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                          <span className="sr-only">Cart</span>
                          <div className="inline-flex absolute -top-0 -right-0 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">{cartCnt}</div>
                        </Link>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            to={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                            onClick={item.name == 'Sign out' ? (e) => handleLogout(e) : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                    </div>
                  </> :
                  <>
                    <div className="flex items-center px-5">
                      <Link
                        to={'/login'}
                        className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">Sign In</span>
                        Sign In
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                      </Link>
                    </div>
                  </>
              }

            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div >
  )
}

export default Header