/**TODO:
 * add 'action' prop for a confirmation action & button text
 * should be two buttons wrapped in a div.modal-actions, first button closes the modal, second one is the specified action
 */

import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({open,children,className = "", onClose}) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} onClose={onClose} className={`modal ${className}`}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}