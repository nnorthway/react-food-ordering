import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: '', //cart or checkout or success or error
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {}
})

export function UserContextProvider({children}) {
  const [userProgress,setUserProgress] = useState();

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  function showSuccess() {
    setUserProgress("success");
  }

  function showError() {
    setUserProgress("error");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart, hideCart, showCheckout, hideCheckout, showSuccess, showError
  }

  return (
    <UserProgressContext value={userProgressCtx}>{children}</UserProgressContext>
  )
}

export default UserProgressContext;