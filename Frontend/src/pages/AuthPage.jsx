import { useState } from "react";
import LoginLeft from "../components/LoginLeft";

const AuthPage = ({ mode }) => {
    const isLogin = mode === "login";

    const [error, setError] = useState("");
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!form.email || !form.password || (!isLogin && !form.name)) {
            setError("Please fill in all fields.");
            return;
        }

        // TODO: call your login / register API here
    };

    return (
        <div className="min-h-screen bg-white flex text-zinc-900 font-sans">
            {/* Left Panel - Branding */}
            <LoginLeft />

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    <div className="mb-10">
                        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 mb-1.5">
                            {isLogin ? "Sign in" : "Create an account"}
                        </h1>
                        <p className="text-sm text-zinc-400">
                            {isLogin
                                ? "Enter your credentials to access your website builder."
                                : "Get started by entering your registration details."}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 border border-red-200 bg-red-50 text-red-700 text-xs rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Full name"
                                className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                        />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                        />
                        <button
                            type="submit"
                            className="w-full py-2.5 text-sm font-medium text-white bg-zinc-900 rounded-md hover:bg-zinc-800 transition-colors"
                        >
                            {isLogin ? "Sign in" : "Create account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;