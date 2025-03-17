"use client";

import { toast } from "sonner";
import { Link2, Trash2 } from "lucide-react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";


import{
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};


export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
}: ActionsProps) => {
    const { mutate, pending }= useApiMutation(api.board.remove);


    /* function to copy menu item link & get notifications using toast */
    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
        .then(() => toast.success("Link copied"))
        .catch(() => toast.error("Failed to copy link"))
    }

    const onDelete = () => {
        mutate({ id })
        .then(() => toast.success("Board deleted"))
        .catch(() => toast.error("Failed to delete board"));
    }

    /* use 'stopPropagation' to prevent redirection when clicking the menu item */
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem
                    onClick={onCopyLink}
                    className="p-3 cursor-pointer"
                >
                    <Link2 className="h-4 w-4 mr-2"/>
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onDelete}
                    className="p-3 cursor-pointer"
                >
                    <Trash2 className="h-4 w-4 mr-2"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};