"use client"

import Image from "next/image";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

export const EmptyBoards = () => {
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    /* link 'Create Board' button to API route */
    const onCLick = () => {
        if (!organization) return;

        /* create floating notification (a toast) when board is created
           or display error if board fails to create  */
        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
        .then((id) => {
            toast.success("Board created");
            // TODO: REdirect to broard/{id}
        })
        .catch(() => toast.error("Failed to create board"));
    };

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
                src="/elements.svg"
                height={110}
                width={110}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first Board!
            </h2>
            <p className="text-muted-foreground textg-sm mt-2">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onCLick} size="lg">
                    Create board
                </Button>
            </div>
        </div>
    );
};