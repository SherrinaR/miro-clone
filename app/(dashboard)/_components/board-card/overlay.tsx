/* create opacity effect when you hover over a board*/

export const Overlay = () => {
    return (
        <div className="opacity-0 group-hover:opacity-50 transition-opacity
            h-full w-full bg-black"
        />
    );
};