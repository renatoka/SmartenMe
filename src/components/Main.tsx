import axios from "axios";
import { useState } from "react";
import AlertPopup from "./AlertPopup";
import TextArea from "./TextArea";

const Main = () => {
  const [inputSentence, setInputSentence] = useState("");
  const [outputSentence, setOutputSentence] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popupType, setPopupType] = useState<Error | string>("");

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setPopupType("success");
    });
  };

  const smartenEmail = (event: MouseEvent) => {
    event.preventDefault();
    if (!inputSentence) {
      setPopupType("no-input");
    } else {
      setIsLoading(true);
      axios
        .post("http://localhost:3000/post", { sentence: inputSentence })
        .then((response) => {
          setOutputSentence(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="App h-screen bg-[#202532] p-3">
      <div className="container mx-auto flex flex-col items-center justify-center h-full gap-3">
        {/* Error or Success Copied display */}
        <div className="flex justify-center absolute top-0 right-0 w-full">
          {popupType && <AlertPopup error={popupType as string} />}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-auto w-full">
          <h1 className="text-5xl font-bold text-white">
            Smarten <span className="text-[#ffdc15]">Me</span>
          </h1>
          <p className="text-lg text-white">
            Sound professional, without the effort.
          </p>
        </div>
        <div className="flex flex-col w-full">
          {/* TextArea component that does all the work */}
          <TextArea
            isLoading={isLoading}
            setInputSentence={setInputSentence}
            outputSentence={outputSentence}
            setOutputSentence={setOutputSentence}
            smartenEmail={smartenEmail}
            copyToClipboard={copyToClipboard}
          />
        </div>
        <div className="mt-auto">
          <p className="text-base text-white">
            Made with <span className="text-[#ffdc15]">{"<3"}</span> by{" "}
            <a
              href="https://github.com/renatoka/SmartenMe"
              target={"_blank"}
              rel="noreferrer"
              className="text-[#ffdc15]"
            >
              {"@renatoka"}
            </a>
          </p>
          <p className="text-xs text-white text-center">
            Powered by{" "}
            <a
              href="https://openai.com/api/policies/service-terms/"
              className="text-[#ffdc15]"
            >
              {"OpenAI"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Main;
