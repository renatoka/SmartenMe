import Alert from "@mui/material/Alert";
import { useState } from "react";
import { motion } from "framer-motion";

const AlertPopup = ({ error }: { error: string }) => {

  const [showAlert, setShowAlert] = useState(true);
  const errorType = error === 'success' ? 'success' : 'error';
  const errorText = error === 'success' ? 'Message successfully copied to clipboard!' : 'Something went wrong, please try again.';

  setTimeout(() => {
    setShowAlert(false);
  }, 3000);

  return (
    showAlert ? (
      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className="w-full lg:w-1/2">
        <Alert severity={errorType}>
          {errorText}
        </Alert>
      </motion.div>
    )
      : null
  )
}

export default AlertPopup;