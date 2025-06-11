import { useEffect } from "react";
import { backButton } from "@telegram-apps/sdk-react";
import { useNavigate } from "react-router";

const useBackButton = () => {
  const navigate = useNavigate();


  useEffect(() => {
    backButton.mount(); 
    backButton.show();  

    const off = backButton.onClick(() =>navigate("/"))

    return () => {
      off(); 
      backButton.hide(); 
      backButton.unmount(); 
    };
  }, [navigate]); 
};

export default useBackButton;
