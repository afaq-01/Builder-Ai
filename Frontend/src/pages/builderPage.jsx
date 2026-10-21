import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Builder_Page = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [leftTab, setLeftTab] = useState("chat");
    const [publishUrl, setPublishUrl] = useState(false)
    const [publishing, setPublishing] = useState(false)

    const { activeProject, loadingActiveProject, activeFile, showCode, setActiveFile, setShowCode, loadProject, logout } = useAppContext();

    useEffect(() => {
        if (!id) return;
        loadProject(id)
    }, [id, loadProject])

    useEffect(() => {
        if (!id || !activeProject) return;
        if (activeProject.status === "pending" || activeProject.status === "generating") {
            const interval = setInterval(() => {
                loadProject(id, true)
            }, 1500);
            return () => clearInterval(interval)
        }
    }, [id, loadProject, activeProject])

    if (loadingActiveProject || !activeProject) {
        return <loading />

    }
    return (
        <>
            <div className="h-screen flex flex-col bg-white overflow-hidden text-zinc-900 relative">
                {/*Top bar header */}



                {/*Main Layout */}

            </div>
        </>
    )
}

export default Builder_Page;