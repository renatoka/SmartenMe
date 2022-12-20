import Alert from "@mui/material/Alert";
import { useState } from "react";
import { motion } from "framer-motion";

const AlertPopup = ({ error }: { error: string }) => {

  const [showAlert, setShowAlert] = useState(true);
  const errorType = error === ('no-input' || 'error') ? 'error' : 'success';

  switch (error) {
    case 'no-input':
      var errorText = 'Please enter a message to smarten it.';
      break;
    case 'error':
      var errorText = 'Something went wrong, please try again.';
      break;
    case 'success':
      var errorText = 'Message successfully copied to clipboard!';
      break;
    default:
      var errorText = 'Something went wrong, please try again.';
  }

  setTimeout(() => {
    setShowAlert(false);
  }, 3000);

  return (
    showAlert ? (
      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className="w-full lg:w-1/2">
        <Alert severity={errorType} variant="filled" sx={{ borderRadius: 0 }}>
          {errorText}
        </Alert>
      </motion.div>
    )
      : null
  )
}

export default AlertPopup;