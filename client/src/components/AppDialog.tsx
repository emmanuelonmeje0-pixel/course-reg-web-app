import { Button } from "../components/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import type React from "react"

type AppDialogProps = {
  triggerOpen?: React.ReactNode;
  open: boolean | undefined;
  onOpenChange: ()=>void;
  titleStyle?: string;
  title?: string;
  descriptionStyle?: string;
  description?: string;
  children?: React.ReactNode;
  isFooter?: boolean;
  closeText?: string;
  footerFunc?: ()=>void;
  footerText?: string;
}
export function AppDialog({
  triggerOpen,
  open,
  onOpenChange,
  titleStyle,
  title,
  descriptionStyle,
  description,
  children,
  isFooter,
  closeText,
  footerFunc,
  footerText,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
        { triggerOpen ? <DialogTrigger asChild> {triggerOpen} </DialogTrigger> : null }
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className={`${titleStyle}`}>{title}</DialogTitle>
            <DialogDescription className={`${descriptionStyle}`}>
              {description}
            </DialogDescription>
          </DialogHeader>
         {children}
         {isFooter && <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{closeText}</Button>
            </DialogClose>
            <Button onClick={footerFunc}>{footerText}</Button>
          </DialogFooter>}
        </DialogContent>
      
    </Dialog>
  )
}
