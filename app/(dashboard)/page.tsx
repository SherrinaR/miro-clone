"use client";

import { EmptyOrg } from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";

/* destructure parameters of favorite boards to access in the url */
interface DashboardPageProps {
    searchParams: {
        search?: string;
        favorites?: string;
    };
};

/*if there is no org render EmptyOrg to create an org otherwise display Bloc list */
const DashboardPage = ({
    searchParams,
}: DashboardPageProps) => {
    const { organization } = useOrganization();
    return (
        <div className=" flex-1 h-[calc(100%-80px)] p-6">
            {JSON.stringify(searchParams)}
            {!organization ? (
                <EmptyOrg />
            ) : (
                <p>Bloc List</p>
            )}
        </div>
    );
};

export default DashboardPage;