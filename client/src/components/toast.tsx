import { useEffect, useState } from "react";
import { toast,  } from "sonner"

type ToastPos = 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right' | 'top-center'

function ToastComponent() {
    const [open, setOpen] = useState<boolean>(false);
    const [desc, setDesc] = useState<string>('');
    const [pos, setPos] = useState<ToastPos>('top-center');
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        if(open) {
            toast(title, {
                    description: desc,
                    position: pos
                }
            )
        }

        return () => { //clean up
            setOpen(false)
        }
        
    }, [open, desc, pos, title]); //i am watching open behaviour but will only trigger when open is true

    return {setOpen, setDesc, setPos, setTitle}

}

export default ToastComponent;