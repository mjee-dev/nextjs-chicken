'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isMobileDevice } from "./util/commonUtils";

function classNames(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function MenuBar() {
    const pathName = usePathname();

    // 디바이스 접속 환경 체크
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(isMobileDevice());
    }, []);
    
    const navigation = [
        { name: '홈', link: '/', current: pathName === '/' ? true : false },
        { name: '로그인', link: '/login', current: pathName === '/login' ? true : false },
        { name: '게시판', link: '/list', current: pathName.includes('/list') ? true : false },
        { name: '지도', link: '/map', current: pathName === '/map' ? true : false },
        { name: '내 정보', link: '/myInfo/:userId', current: pathName.includes('/myInfo') ? true : false },
        { name: '회원가입', link: '/signup', current: pathName === '/signup'? true : false },
        { name: '스토어 등록', link: '/admin/stores/create', current: pathName === '/admin/stores/create'? true : false },
    ];
    console.log(`isMobile => ${isMobile}`);
    
    if (isMobile) {

    }

    return (
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
                            )}
                        >{item.name}
                        </Link>   
                    ))}
                </ul>
            </div>
        </div>
    );
};