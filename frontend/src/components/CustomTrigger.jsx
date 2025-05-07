import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftOpen, PanelLeftClose } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* todo: fix the change of icon and description that doesn't work on mobile view */
export function CustomTrigger() {
  const { open, toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSidebar}
      className={cn(
        "flex items-center gap-2 hover:bg-accent"
      )}
    >
      {open ? (
        <>
          <PanelLeftClose className="h-4 w-4" />
          <span>Cerrar menú</span>
        </>
      ) : (
        <>
          <PanelLeftOpen className="h-4 w-4" />
          <span>Abrir menú</span>
        </>
      )}
    </Button>
  )
}