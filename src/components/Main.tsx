import { useState } from "react";
import ReactMarkdown from "react-markdown";
import AlertPopup from "./AlertPopup";
import axios from "axios";

const Main = () => {
  const [inputSentence, setInputSentence] = useState("");
  const [outputSentence, setOutputSentence] = useState("");
  const [popupType, setPopupType] = useState<Error | string>("");

  const x = 125;

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setPopupType("success");
    });
  };

  const smartenEmail = (event: any) => {
    event.preventDefault();
    if (!inputSentence) {
      return setPopupType("no-input");
    } else {
      axios
        .post("http://localhost:3000/post", { sentence: inputSentence })
        .then((response) => {
          setOutputSentence(response.data);
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
          {outputSentence ? (
            <div className="relative">
              <ReactMarkdown className="w-full h-96 min-h-20 p-4 rounded-md bg-[#2B2F3F] text-white outline-none">
                {outputSentence}
              </ReactMarkdown>
              <div className="flex justify-between">
                <button
                  className="absolute bottom-4 left-4 text-white hover:text-[#ffdc15]"
                  onClick={() => setOutputSentence("")}
                >
                  Reset
                </button>
                <button
                  className="absolute bottom-4 right-4 text-white hover:text-[#ffdc15]"
                  onClick={() => copyToClipboard(outputSentence)}
                >
                  Copy
                </button>
              </div>
            </div>
          ) : (
            <form
              className="flex flex-col w-full"
              method="POST"
              name="smarten-me"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <textarea
                className="w-full h-96 min-h-20 p-4 rounded-md bg-[#2B2F3F] text-white outline-none"
                placeholder="Enter your email here..."
                onChange={(e) => setInputSentence(e.target.value)}
              ></textarea>
              <button
                className="w-full h-16 mt-4 rounded-md bg-[#ffdc15] text-[#2B2F3F] font-bold text-lg active:bg-[#dabc12]"
                onClick={smartenEmail}
              >
                Smart it
              </button>
            </form>
          )}
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
