import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'


const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(false)


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