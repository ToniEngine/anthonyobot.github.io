import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Toast from "../components/shared/Toast";

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toastMessage, setToastMessage] = useState("");
  const timeoutRef = useRef(null);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setToastMessage("");
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const contextValue = useMemo(() => showToast, [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toastMessage ? <Toast message={toastMessage} /> : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
