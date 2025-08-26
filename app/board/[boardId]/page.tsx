/* Board layout page without the dashboard and sidebar */

import { Canvas } from "./_components/canvas";

interface BoardIdPageProps {
    params: {
        boardId: string;
    };
};

const BoardIdPage = ({params,}: BoardIdPageProps) => {
    return (
        <Canvas boardId={params.boardId} />
    );
};

export default BoardIdPage;