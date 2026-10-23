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
                    <div className="flex items-center justify-center h-full"></div>
                )}
            </div>


        </div>



    )
}