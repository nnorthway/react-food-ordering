/**TODO:
 * add 'action' prop for a confirmation action & button text
 * should be two buttons wrapped in a div.modal-actions, first button closes the modal, second one is the specified action
 */

import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({open,children,onClose,closeText,actionName,action}) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  function handleCloseClick() {
    dialog.current.close();
  }

  function handleConfirm() {
    dialog.current.close();
    action();
  }

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}