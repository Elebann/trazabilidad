import {Separator} from "@/components/ui/separator"
import {CustomTrigger} from "@/components/CustomTrigger.jsx";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";

export function SiteHeader() {

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
                <h1 className="text-base font-medium">Sistema de Trazabilidad EsterilMed {userName ? `- ${userName}` : ``}</h1>
            </div>
        </header>
    )
}