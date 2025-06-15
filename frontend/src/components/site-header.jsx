import {Separator} from "@/components/ui/separator"
import {CustomTrigger} from "@/components/CustomTrigger.jsx";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";
import {useEffect, useState} from "react";

export function SiteHeader() {
    const [hora, setHora] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setHora(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);


    const { userName } = useCurrentUser()

    return (
        <header
            className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <CustomTrigger className=""/>
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">EsterilMed {userName ? `- ${userName}` : ``}</h1>
                <p className="ml-auto flex items-center">Son las {hora.toLocaleTimeString([], {hour: '2-digit',minute:'2-digit'})}</p>
            </div>
        </header>
    )
}