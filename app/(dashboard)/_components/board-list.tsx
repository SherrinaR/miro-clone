"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { BoardCard } from "./board-card";
import { EmptyBoards } from "./empty-boards";
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
    const data = useQuery(api.boards.get, { orgId });

    if (data === undefined) {
        return (
            <div>
                Loading...
            </div>
        )
    }

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
                <EmptyBoards />
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl">
                {query.favorites ? "Favorite boards" : "Team boards"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
                lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                {data?.map((board) => (
                    <BoardCard
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        imageUrl={board.imageUrl}
                        authorId={board.authorId}
                        authorName={board.authorName}
                        createdAt={board._creationTime}
                        orgId={board.orgId}
                        isFavorite={true}
                    />
                ))}
            </div>
        </div>
    )
}