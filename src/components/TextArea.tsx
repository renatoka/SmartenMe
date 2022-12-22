import { CircularProgress } from "@mui/material";
import ReactMarkdown from "react-markdown";

interface TextAreaProps {
  isLoading: boolean;
  outputSentence: string;
  setInputSentence: (input: string) => void;
  smartenEmail: (event: any) => void;
  setOutputSentence: (output: string) => void;
  copyToClipboard: (email: string) => void;
}

const TextArea = ({
  isLoading,
  setInputSentence,
  smartenEmail,
  outputSentence,
  setOutputSentence,
  copyToClipboard,
}: TextAreaProps) => {
  return (
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
        <form className="flex flex-col w-full" onSubmit={smartenEmail}>
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-96 min-h-20 p-4 rounded-md bg-[#2B2F3F] text-white outline-none">
              <div className="flex flex-col items-center justify-center gap-2">
                <CircularProgress />
                <p className="text-base">Smartening your email...</p>
              </div>
            </div>
          ) : (
            <textarea
              className="w-full h-96 min-h-20 p-4 rounded-md bg-[#2B2F3F] text-white outline-none"
              placeholder="Enter your email here..."
              onChange={(event) => setInputSentence(event.target.value)}
            />
          )}
          <button
            className="w-full h-16 mt-4 rounded-md bg-[#ffdc15] text-[#2B2F3F] font-bold hover:bg-[#ffdc15] hover:text-black text-lg"
            type="submit"
          >
            Smarten Me
          </button>
        </form>
      )}
    </div>
  );
};

export default TextArea;
