import { createContext, useContext, useEffect, useState } from "react";
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
        }
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
               LoadProjects(activeProject?._id,true)

            }, 2000);

        }


    }, [])



    return (

        <AppContext.Provider value={{ user, loadingUser, login, register }}>
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