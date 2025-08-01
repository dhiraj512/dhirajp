'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Icon from './icon';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="flex items-center justify-start gap-2 border-2 rounded-md p-2">
            <label htmlFor="search" className="sr-only">
                {placeholder}
            </label >
            <Icon.search className="size-5 text-muted-foreground" />
            <input
                id="search"
                className="text-sm focus:outline-none placeholder:text-muted-foreground"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div >
    );
}