import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSProperties } from "styled-components";
type ClientPortalInterface = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
  selector: string;
  display?: CSSProperties['display']
};
const ClientPortal = ({ children, selector, show,display }: ClientPortalInterface) => {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  useEffect(() => {
    if (ref.current && display) {
      (ref.current as HTMLDivElement).style.display = display;
    }
  }, [display]);

  return show && ref.current ? createPortal(children, ref.current) : null;
};
export default ClientPortal;