import { useRef, useEffect } from "react"


const ChatPanel = ({ message, Onsend, loading }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" })
    }, [message, loading])

    return (
        <div className="flex flex-col h-full bg-white">
            {/*Message*/}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 hide-scrollbar">
                {message.lenght === 0 & (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-zinc-400 text-sm text-center">Ask AI to modify yourwebsite</p>
                    </div>
                )}

{message.map((msg,i)=>(
    <div key={i}>
        <div className="flex gap-2.5 items-start">
            <div className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 bg-zinc-50"></div>
        </div>
    </div>
))}

            </div>


        </div>



    )
}