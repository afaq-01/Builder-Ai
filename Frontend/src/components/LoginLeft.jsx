

const LoginLeft=()=>{

    return(
        <>
        <div className="hidden lg:flex lg:w-2/5 bg-[url('bg-img.png')] bg-cover bg-center bg-no-repeat flex-col justify-between p-12 shrink-0 select-none">
        <div className="flex gap-2">
            <img src="/logo.svg" alt="logo" className="size-9.5" />
            <span className="text-4xl font-medium text-white">
                Build Ai
            </span>

        </div>
        <div>
            <h2 className="text-3xl text-white font-medium leading-snug mb-3 tracking-tight">Build you presence on web</h2>
            <p className="text-zinc-300">Describe what you need , preview instantly and customize your site in real time. React with clean Jsx, verified layout, and instant code exports</p>
            <p className="text-white text-sm mt-12">Copyright {new Date().getFullYear()} Builder-Ai</p>
        </div>
        </div>
        
        </>
    )
}

export default LoginLeft