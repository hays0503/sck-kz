import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
type ClientPortalInterface = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
  selector: string;
};
const ClientPortal = ({ children, selector, show }: ClientPortalInterface) => {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  useEffect(() => {
    if (ref.current) {
      if (show) {
        (ref.current as HTMLDivElement).style.height = 'inherit';
        (ref.current as HTMLDivElement).style.visibility = 'visible';
        (ref.current as HTMLDivElement).style.opacity = '1';
        (ref.current as HTMLDivElement).style.pointerEvents = 'auto';
      } else {
        (ref.current as HTMLDivElement).style.height = '0px';
        (ref.current as HTMLDivElement).style.visibility = 'hidden';
        (ref.current as HTMLDivElement).style.opacity = '0';
        (ref.current as HTMLDivElement).style.pointerEvents = 'none';
      }
    }
  }, [show]);

  return show && ref.current ? createPortal(children, ref.current) : null;
};
export default ClientPortal;
