import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(false)

    const Navigate = useNavigate();

    //States
    const [project, setProject] = useState([])
    const [loadingProject, setLoadingProject] = useState(true)
    const [activeProject, setActiveProject] = useState(null)
    const [loadingActiveProject, setloadingActiveProject] = useState(true)
    const [chatLoading, setchatLoading] = useState(false)
    const [generatingProject, setGeneratingProject] = useState(false)
    const [activeFile, setAtiveFile] = useState("App.js");
    const [showCode, setShowCode] = useState(false)


    // Auth Action
    const checkSession = async () => {
        try {
            const { data } = await api.get("/api/auth/me");
            setUser(data.user);

        } catch (error) {

        } finally {
            setLoadingUser(false)
        } [activeProject, user]
    }

    useEffect(() => {
        checkSession()
    }, [checkSession])

    const login = async (email, password) => {
        try {
            const { data } = await api.post("/api/auth/login", { email, password });
            setUser(data.user);
            toast.success("Welcome back");
            Navigate("/");
        } catch (error) {
            console.error("Login failed", error);
            const errMsg = error.response?.data?.error || "Invalid email or password";
            toast.error(errMsg);
            throw new Error(errMsg);
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post("/api/auth/register", { name, email, password });
            setUser(data.user);
            toast.success("Account created successfully");
            navigate("/");
        } catch (error) {
            console.error("Registration failed", error);
            const errMsg = error.response?.data?.error || "Registration failed. Please try again.";
            toast.error(errMsg);
            throw new Error(errMsg);
        }
    };

    const logout = async () => {

        try {
            await api.post("/api/auth/logout")
            setUser(null)
            setProject([])
            setActiveProject(null)
            toast.success("logged out successfully")
            Navigate("/login")


        } catch (error) {
            console.error("Logout failed", error);
            toast.error("Logout failed");


        }
    }

    // Project Action
    const LoadProjects = async () => {
        if (!user) return
        try {
            const { data } = await api.get("/api/projects")
            setProject(data)

        } catch (error) {
            console.error("Failed to list Projects:", error)
            toast.error("Faild to load Project list")
        } finally {
            setLoadingProject(false)
        }

        const loadproject = async (id, Silent = false) => {
            if (!user) return;
            if (!Silent) return;
            try {
                const { data } = await api.get(`/api/project/${id}`)
                setActiveProject(true)
                //Default file
                const files = Object.keys(data.files)
                if (files.length > 0) {
                    setAtiveFile((pre) => {
                        if (files.includes(pre)) return prev;
                        if (files.includes("/App.js")) return "App.js";
                        return files[0]
                    })
                }

            } catch (error) {

                console.error("Failed to load projects", error)
                if (!Silent) {
                    toast.error("Faild to load project details")
                    Navigate("/")

                }

            } finally {
                if (!Silent) setloadingActiveProject(false)

            }
        }
    }

    // Automatically poll active projects status if generating or pending 

    useEffect(() => {
        if (!activeProject?._id || !user) return;

        const isOngoing = activeProject.status === "generating" || activeProject.status === "pending" || activeProject.status === "revising"

        if (isOngoing) {
            setchatLoading(true);
            const interval = setInterval(() => {
                LoadProjects(activeProject?._id, true)

            }, 2000)

            return () => clearInterval(interval)
        } else {
            setchatLoading(false)
        }


    }, [activeProject?._id, activeProject?.status, LoadProjects, user])

    const handleGenerate = useCallback(
        async (prompt) => {
            if (!user) return;
            setGeneratingProject(true);
            try {
                const { data } = await api.post("/api/projects", { prompt })
                toast.success("Ai Agent is planning structure...")
                Navigate(`/builder/${data._id}`)
            } catch (error) {
                console.error("Failed to generate project", error)
                toast.error("error?.response?.data?.error" || "Failed to generate project")

            } finally {
                setGeneratingProject(false)
            }
        }
        , [Navigate, user])

    const handleDelete = useCallback(
        async (id) => {
            if (!user) return;
            setGeneratingProject(true);
            try {
                await api.delete(`/api/projects/${id}`)
                setProject((prev) => prev.filter((p) => p._id !== id))
                toast.success("Project deleted successfully")
                Navigate(`/builder/${data._id}`)
            } catch (error) {
                console.error("Failed to delete project", error)
                toast.error("Failed to generate project")

            } finally {
                setGeneratingProject(false)
            }
        }
        , [user])

    const handleChat = useCallback(
        async (prompt) => {
            if (!activeProject || !user) return;
            setchatLoading(true)
            try {
                const { data } = await api.post(`/api/projects/${activeProject._id}/chat`, { prompt });
                setActiveProject(data);
                if (data.errors && data.errors.lenght > 0) {
                    toast.error(`${data.errors.lenght} version patch(es) failed`);
                } else {
                    toast.success(`Updated to version ${data.version}`)
                }
            } catch (err) {
                console.error("Revision request failed:", err)
                toast.error(err?.response?.data?.error || "Revision request failed")
            } finally {
                setchatLoading(false)
            }


        },[activeProject,user]
    )



    return (

        <AppContext.Provider value={{ user, loadingUser, login, register, project, LoadProjects, activeProject, loadingActiveProject, chatLoading, generatingProject, activeFile, showCode, setAtiveFile, setShowCode, loadingProject, handleGenerate, handleDelete }}>
            {children}
        </AppContext.Provider>
    )

}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppContextProvider")

    }

    return context

}