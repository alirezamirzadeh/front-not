import { useEffect } from "react";
import { backButton } from "@telegram-apps/sdk-react";
import { useNavigate } from "react-router";
import { useViewTransition } from "./useViewTransition";

const useBackButton = () => {
  const navigate = useNavigate();
  const navigateWithTransition = useViewTransition();

  useEffect(() => {
    backButton.mount(); // Mount backButton
    backButton.show();  // Show backButton

    const off = backButton.onClick(() =>navigateWithTransition("/"))
     // Define the backButton action

    return () => {
      off(); // Clean up the click listener
      backButton.hide(); // Hide the backButton
      backButton.unmount(); // Unmount the backButton
    };
  }, [navigate]); // Re-run if navigate changes
};

export default useBackButton;
