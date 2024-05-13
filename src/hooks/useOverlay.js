import { useEffect } from "react";

export function useOverlay(handleClose) {
    useEffect(() => {
      const handleOverlay = (event) => {
        console.log(event);
        if (event.target === event.currentTarget) {
          handleClose();
        }
      };
  
      document.addEventListener("click", handleOverlay); // left off
  
      return () => {
        document.removeEventListener("click", handleOverlay);
      };
    }, [handleClose]);
  }
