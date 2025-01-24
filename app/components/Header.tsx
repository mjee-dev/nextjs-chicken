'use client';

import React, { useState, useEffect } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from "next/navigation";
import ChangeLocale from "./ChangeLocales";
import { useSession } from "next-auth/react";
import UserGreeting from "./UserGreeting";
import SearchBar from "./SearchBar";

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://lh3.googleusercontent.com/a/ACg8ocI2218a_iAJxNw4SzNJPo0HJ07nAh3xX4mmlzllRwfUKF5RPe48=s96-c-rg-br100',
};

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];

function classNames(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

function Header () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pathName = usePathname();
    const navigation = [
        { name: '홈', link: '/', current: pathName === '/' ? true : false },
        { name: '게시판', link: '/list', current: (pathName === '/list' || pathName === '/write') ? true : false },
        { name: '지도', link: '/map', current: pathName === '/map' ? true : false },
        { name: '내 정보', link: '/myInfo/:userId', current: pathName.includes('/myInfo') ? true : false },
        { name: '회원가입', link: '/signup', current: pathName === '/signup'? true : false },
    ];

    // 세션 가져오기
    const { data : session, status } = useSession();

    // 관리자 메뉴 표시
    if (session && session.user?.name === 'admin') {
        navigation.push({ name: '스토어 목록', link: '/admin/stores/list', current: pathName === '/admin/stores/list'? true : false });
    }

    // 다크 테마
    const [theme, setTheme] = useState('light');
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
            /* 헤더 메뉴 */
            <header className="shadow">
                <Disclosure as="nav" className="backg-white">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <Image
                                        alt="Your Company"
                                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                        className="size-8"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="flex items-baseline ml-10 space-x-4">
                                        <ul>
                                            {navigation.map((item) => (
                                                <Link 
                                                    key={item.name}
                                                    href={item.link}
                                                    aira-current={item.current ? 'page' : undefined}
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-l font-medium',
                                                        item.link.includes('admin') ? 'text-red-500' : 'text-gray-300',
                                                    )}
                                                >{item.name}
                                                </Link>   
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="flex items-center ml-6 md:ml-6">
                                    {/* <button data-tooltip-target="default-sidebar-example-toggle-dark-mode-tooltip" type="button" data-toggle-dark="dark" className="flex items-center justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg w-9 h-9 toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-yellow-400 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        <span className="absolute -inset-1.5"></span>
                                        <svg data-toggle-icon="moon" className="w-3.5 h-3.5 hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
                                        </svg>
                                        <svg data-toggle-icon="sun" className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
                                        </svg>
                                        <span className="sr-only">Toggle dark/light mode</span>
                                    </button> */}
                                    <ChangeLocale />

                                    {/* Dark 모드 아이콘 */}
                                    <label className="flex gap-2 px-4 cursor-pointer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="5" />
                                            <path
                                            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                        </svg>
                                        <input type="checkbox" value="synthwave" onClick={toggleTheme} className="toggle theme-controller ylw" />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                        </svg>
                                    </label>

                                    {/* 알림 아이콘 */}
                                    <button
                                        type="button"
                                        className="relative p-1 text-gray-400 bg-yellow-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">View notification</span>
                                        <BellIcon aria-hidden="true" className="size-6"></BellIcon>
                                    </button>

                                    {/* 프로필 메뉴 dropdown */}
                                    <UserGreeting />
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex items-center max-w-xs bg-yellow-400 rounded-full text-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5"></span>
                                                <span className="sr-only">Open user menu</span>
                                                <Image alt="" src={user.imageUrl} className="rounded-full size-8" width={32} height={32}/>
                                            </MenuButton>
                                        </div>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none 
                                            data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            {userNavigation.map((item) => (
                                                <MenuItem key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className="block px-4 py-2 text-md font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                                                        {item.name}
                                                    </a>
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                            <div className="flex -mr-2 md:hidden">
                                {/* 모바일 메뉴 button */}
                                <DisclosureButton className="relative inline-flex items-center justify-center p-2 text-black bg-yellow-400 rounded-md group hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5"></span>
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden"></Bars3Icon>
                                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block"></XMarkIcon>
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        {/* 모바일 메뉴 영역 */}
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            
                            <DisclosureButton>
                                <ul>
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link 
                                            key={item.name}
                                            href={item.link}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block rounded-md px-3 py-2 text-base font-medium',
                                                )}
                                            >{item.name}
                                        </Link>
                                    </li>
                                ))}
                                </ul>
                            </DisclosureButton>
                            
                        </div>

                        {/* 모바일 프로필, 알림 아이콘 */}
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="flex items-center px-5">
                                <div className="shrink-0">
                                    <Image alt="" src={user.imageUrl} className="rounded-full size-10" width={40} height={40}/>
                                </div>
                                <div className="ml-3">
                                    <div className="font-medium text-white text-base/5">{user.name}</div>
                                    <div className="font-medium text-gray-400 text-md">{user.email}</div>
                                </div>
                                {/* 알림 아이콘  */}
                                <button type="button" className="relative p-1 ml-auto text-gray-400 bg-yellow-400 rounded-full shrink-0 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>
                        </div>

                        {/* 모바일 프로필 메뉴 dropdown */}
                        <div className="px-2 mt-3 space-y-1">
                            {userNavigation.map((item) => (
                                <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </Disclosure>
                {/* 헤더 메뉴 끝 */}

                {/* 헤더 contents */}
                <SearchBar />
                {/* 헤더 contents 끝 */}
            </header>
    );
}

export default Header;