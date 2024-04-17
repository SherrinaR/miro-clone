"use client"
import { useOrganizationList } from "@clerk/nextjs";
import { Item } from "./item";

/* iterate over current list of orgs and render them */
export const List = () => {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    /* if there are no user memberships */
    if (!userMemberships.data?.length) return null;
    /* get individual memberships and render org name on sidebar*/
    return (
        <ul className="space-y-4">
            {userMemberships.data?.map((mem) => (
                <Item 
                key={mem.organization.id}
                id={mem.organization.id}
                name={mem.organization.name}
                imageUrl={mem.organization.imageUrl}
                />
            ))}
        </ul>
    )
}