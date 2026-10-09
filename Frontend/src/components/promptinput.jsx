import { useState } from "react";


const promptInput = ({ onSubmit, loading = false, placeholder = "Describe the website you want to build...", large = false, autoFocus = false, variant = "dafault", }) => {

    const [value, setValue] = useState("");
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        if (e) e.preventDefault()
        const trimmed = value.trim()
        if (!trimmed || loading) return;
        onSubmit(trimmed)
        setValue("")

    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

        }
    }

    if (vaiant === "glass") {
        return (
            <form action="" onSubmit={handleSubmit} className="max-w-2xl w-full bg-white/10 backedrop-blur-xl rounded-xl ring-1 ring-white/25 focus-within:ring-2 focus-within:ring-white/30 overflow-hidden mt-6 transition">
                <textarea raf={textareaRef} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown}>

                </textarea>

            </form>
        )

    }
    return (
        <>

        </>
    )


};

export default promptInput;