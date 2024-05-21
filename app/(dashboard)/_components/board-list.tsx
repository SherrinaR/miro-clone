"use client"

import { EmptyBlocs } from "./empty-blocs";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";

/* create a board list query with option properties*/
interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
};

/* render above props as a json file object. search queries will update in the json file */
export const BoardList = ({
    orgId,
    query,
}: BoardListProps) => {
    const data = [];

    /* create different empty states; the order matters!*/
    /* 1. if no data length but have queries b/c user searched for something
    that doesn't exist */
    if (!data?.length && query.search) {
        return (
            <div>
                <EmptySearch />
            </div>
        );
    }

    /* 2. if no data length but favorite queries b/c the user searched for something
    that doesn't exists */
    if (!data?.length && query.favorites) {
        return (
            <div>
                <EmptyFavorites />
            </div>
        );
    }

    /* 3. if no data length at all */
    if (!data?.length) {
        return (
            <div>
                <EmptyBlocs />
            </div>
        );
    }

    return (
        <div>
            {JSON.stringify(query)}
        </div>
    )
}