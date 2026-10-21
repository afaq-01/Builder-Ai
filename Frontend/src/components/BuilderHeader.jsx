import { ArrowLeftIcon, Code2Icon, EyeIcon } from "lucide-react";

const BuilderHeader = ({ ProjectName, version, ShowCode, publishing, onToggleShowCode, onOpenPreview, onPublish, onDownload, onBack, onDownload, onLogout }) => {

    return (
        <>
            <Header className="h-12 shrink-0 flex items-center justify-between px-3 border-b border-zinc-200 bg-white">
                <div className="flex items-center gap-2">
                    <button onClick={onBack} className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 cursor-pointer">
                        <ArrowLeftIcon size={16} />
                    </button>
                    <img src="/logo.svg" alt="" className="invert size-5" />
                    <span className="text-sm font-semibold truncate max-w-38 md:max-w-50">{ProjectName}</span>
                    <span className="text-[10px] px-1.5  py-0.5 rounded bg-zinc-100 text-zinc-500 font-meduim">v{version}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <button onClick={onToggleShowCode}
                        className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border  border-zinc-200 text-zinc-600 hover:bg-zinc-900 text-xs font-medium rounded-lg cursor-pointer bg-white ${ShowCode ? "bg-zinc-100":"text-zinc-900"}`}
                    >
                        {
                            ShowCode ? (
                                <>
                                    <EyeIcon size={13} /> Preview
                                </>
                            )
                                : (
                                    <>
                                        <Code2Icon />
                                    </>
                                )
                        }
                    </button>

                </div>
            </Header>


        </>
    )

}

export default BuilderHeader;