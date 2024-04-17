"use client"

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Hint } from "../hint";
import { cn } from "@/lib/utils";

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

export const Item = ({
    id,
    name,
    imageUrl,
}: ItemProps) => {
    /* hooks */
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    /* if current org from hook is active */
    const isActive = organization?.id === id;

    /* if current org is not active */
    const onClick = () => {
        if (!setActive) return;
        /* otherwise set the active org to be the current id of the item*/
        setActive({ organization: id });
    }

    return (
        <div className="aspect-square-relative">
            <Hint
                label={name}
                side="right"
                align="start"
                sideOffset={18}
            >
                <Image 
                    fill
                    alt={name}
                    src={imageUrl}
                    onClick={onClick}
                    className={cn(
                        "rounded-md cursor-pointer opcaity-75 hover:opacity-100 transition", 
                        isActive && "opacity-100"
                    )}
                />
            </Hint>
            
        </div>
    );
};