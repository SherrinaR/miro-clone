import Image from "next/image";

/* Loading page with logo once user is authenticated */
export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={120}
                height={120}
                className="animate-pulse duration-700"
            />
        </div>
    );
};