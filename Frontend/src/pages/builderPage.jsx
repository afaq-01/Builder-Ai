import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BuilderHeader from "../components/BuilderHeader";
import { FolderTreeIcon, MessageSquareIcon } from "lucide-react";

const Builder_Page = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [leftTab, setLeftTab] = useState("chat");
    const [publishUrl, setPublishUrl] = useState(false)
    const [publishing, setPublishing] = useState(false)



    const { activeProject, loadingActiveProject, activeFile, showCode, setActiveFile, setShowCode, loadProject, logout,chatLoading } = useAppContext();

    const handleOpenPreview = () => {
        if (!id) return;
        window.open(`/preview/${id}`, '_blank')

    }

    const handlePublish = () => {

    }

    const handleDownload = () => {

    }

   

    useEffect(() => {
        if (!id) return;
        loadProject(id)
    }, [id])

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
                <BuilderHeader
                    ProjectName={activeProject.name}
                    version={activeProject.version}
                    ShowCode={showCode}
                    publishing={publishing}
                    onToggleShowCode={() => setShowCode(!showCode)}
                    onOpenPreview={handleOpenPreview}
                    onPublish={handlePublish}
                    onDownload={handleDownload}
                    onBack={Navigate("/")}
                    onLogout={logout}
                />

                {/*Main Layout */}
                <div className="flex-1 flex overflow-hidden">
                    {/*Left sidebar */}
                    <div className="w-[320px] shrink-0 flex flex-col border-r border-zinc-200 bg-white">
                        {/*SideBar Tabs */}
                        <div className="flex border-b border-zinc-100">
                            <button onClick={() => setLeftTab("chat")} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-meduim cursor-pointer ${leftTab === "chat" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-700"}`}>
                                <MessageSquareIcon size={13} /> chat
                            </button>

                            <button onClick={() => setLeftTab("files")} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-meduim cursor-pointer ${leftTab === "files" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-700"}`}>
                                <FolderTreeIcon size={13} /> chat
                            </button>
                        </div>
                        {/*Sidebar Contect */}
                        <div className="flex overflow-hidden">
                            {
                                leftTab === 'chat' ? (
                                    <ChatPanel message={activeProject.message} onSend={handleChat} loading={chatLoading}/>
                                ) : (
                                    <div>File explorer</div>
                                )
                            }
                        </div>

                    </div>

                    {/*Preview / code area */}

                </div>

            </div>
        </>
    )
}

export default Builder_Page;