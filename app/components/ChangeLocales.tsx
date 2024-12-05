'use client';

import React from 'react';
import {useParams, useRouter, useSelectedLayoutSegments} from 'next/navigation';

const ChangeLocale = () => {
    const router = useRouter();
    const params = useParams();
    const urlSegments = useSelectedLayoutSegments();

    const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = event.target.value;

        // This is used by the Header component which is used in `app/[locale]/layout.tsx` file,
        // urlSegments will contain the segments after the locale.
        // We replace the URL with the new locale and the rest of the segments.
        router.push(`/${newLocale}/${urlSegments.join('/')}`);
    };

    return (
        <div className="test-change-locale">
            <select onChange={handleLocaleChange} value={params.locale}>
                <option value="ko">🇰🇷 한국어</option>
                <option value="en">🇺🇸 English</option>
                <option value="ja">🇯🇵 日本語</option>
            </select>
        </div>
    );
};

export default ChangeLocale;