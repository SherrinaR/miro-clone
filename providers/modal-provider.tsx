"use client"

import { useEffect, useState } from "react";

import { RenameModal } from "@/components/modals/rename-modal";

/* create a provider for reuse & adding multiple modals */
export const ModalProvider = () => {
    const [isMounted, setisMounted] = useState(false);

    useEffect(() => {
        setisMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <RenameModal />
        </>
    );
};