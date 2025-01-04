"use client";

import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";

import { useOrganization } from "@clerk/nextjs";

/* destructure parameters of favorite boards to access in the url */
interface DashboardPageProps {
    searchParams: {
        search?: string;
        favorites?: string;
    };
};

/*if there is no orgs render EmptyOrg to create an org otherwise display board list */
const DashboardPage = ({
    searchParams,
}: DashboardPageProps) => {
    const { organization } = useOrganization();
    return (
        <div className=" flex-1 h-[calc(100%-80px)] p-6">
            {!organization ? (
                <EmptyOrg />
            ) : (
                <BoardList
                    orgId={organization.id}
                    query={searchParams}
                />
            )}
        </div>
    );
};

export default DashboardPage;