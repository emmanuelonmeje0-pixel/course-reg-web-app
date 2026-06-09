import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';

type DrawerType = {
    open: boolean;
    onOpenChange: ()=>void;
    children: React.ReactNode ;
}

export default function DrawerUi({open, onOpenChange, children}: DrawerType) {
  return (
    <Drawer 
        open={open}
        onClose={onOpenChange} 
        width={800}
    >
      {children}
    </Drawer>
  )
}
