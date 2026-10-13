import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast',
import { useNavigate } from "react-router-dom"


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
            navigate("/");
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