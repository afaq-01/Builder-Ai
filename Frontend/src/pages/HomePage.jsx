import { homeTags } from "../assets/assets";
import PromptInput from "../components/promptinput";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Home = () => {
    const {
        user,
        projects,
        loadingProjects,
        generatingProject,
        loadProject,
        handleGenerate,
        handleDelete,
        logout,
        LoadProjects
    } = useAppContext();

    useEffect(() => {
        LoadProjects();
    }, [LoadProjects]);

    return (
        <div className="h-screen overflow-y-scroll text-white font-sans bg-[url('/bg-img.png')] bg-cover bg-center bg-no-repeat">
            {/* Nav */}
            <nav className="sticky top-0 z-10 flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="logo" className="size-6" />
                    <span>BuildAI</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-zinc-300">
                    <span>User</span>
                    <button
                        onClick={logout}
                        className="py-1.5 px-3 border border-white/20 text-white hover:bg-white/10 text-xs rounded-md cursor-pointer bg-transparent"
                    >
                        Sign out
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 mt-8 xl:mt-28">
                <div className="w-full max-w-2xl flex flex-col items-center">
                    {/* Promo Badge */}
                    <div className="flex items-center gap-2 p-1.5 pr-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[13px] text-white/90">
                        <span className="px-3 py-1 text-[11px] bg-red-700 rounded-full font-medium tracking-wider">
                            Promo
                        </span>
                        <span>Create your first project for free</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-center text-4xl md:text-6xl font-medium mt-4 max-w-2xl text-white">
                        Let's build an app together
                    </h1>
                    <p className="text-center text-sm md:text-base max-w-xl mt-4 text-white/65 leading-relaxed">
                        Describe your idea and AI will design, structure and launch your website instantly. No coding required.
                    </p>

                    {/* Prompt input with glassmorphic variant */}
                    <div className="w-full mt-6">
                        <PromptInput
                            onSubmit={handleGenerate}
                            loading={generatingProject}
                            placeholder="Create a portfolio website..."
                            variant="glass"
                            autoFocus
                        />
                    </div>

                    {/* Scrolling marquee tags */}
                    <div className="mask-marquee w-full mt-4 max-w-2xl overflow-hidden py-1">
                        <div className="animate-marquee gap-3">
                            {homeTags.map((tag, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleGenerate(tag)}
                                    disabled={generatingProject}
                                    className="px-4 py-1.5 border rounded-full text-sm text-white bg-white/10 border-white/25 hover:bg-white/20 transition cursor-pointer shrink-0 font-medium"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* All projects */}
                    {!loadingProjects && projects?.length > 0 && (
                        <div className="mt-12 w-full">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                                <p className="text-xs font-medium uppercase text-zinc-100 tracking-widest">
                                    All projects
                                </p>
                                <span className="text-xs text-zinc-100 font-normal">
                                    {projects.length}{" "}
                                    {projects.length === 1 ? "project" : "projects"}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;