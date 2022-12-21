import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import AlertPopup from './assets/components/AlertPopup';

function App() {

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_API_KEY as string,
  });
  const openai = new OpenAIApi(configuration);

  const [inputSentence, setInputSentence] = useState("");
  const [outputSentence, setOutputSentence] = useState("");
  const [error, setError] = useState<Error | string>("");

  const copyToClipboard = async (str: string) => {
    try {
      await navigator.clipboard.writeText(str);
      setError("success");
    }
    catch (error) {
      setError('error');
    }
  }

  const handleWordReplacement = async (inputSentence: string) => {
    try {
      if (inputSentence === "") {
        setError('no-input');
        return;
      } else {
        // This model needs to be tuned to be more formal
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Make this email formal: ${inputSentence}}`,
          temperature: 0.7,
          max_tokens: 512,
          top_p: 0.8,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        setOutputSentence(response.data.choices[0].text as string);
      }
    }
    catch (error) {
      setError('error');
    }
  }
  return (
    <div className="App h-screen bg-[#202532] p-3">
      <div className="container mx-auto flex flex-col items-center justify-center h-full gap-3">
        {/* Error or Success Copied display */}
        <div className="flex justify-center absolute top-0 right-0 w-full">
          {error && <AlertPopup error={error as string} />}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-auto w-full">
          <h1 className="text-5xl font-bold text-white">Smarten <span className="text-[#ffdc15]">Me</span></h1>
          <p className="text-lg text-white">Sound professional, without the effort.</p>
        </div>
        <div className="flex flex-col w-full">
          {outputSentence ?
            <div className="relative">
              <ReactMarkdown className="w-full h-96 min-h-20 p-4 rounded-md bg-[#2B2F3F] text-white outline-none" children={outputSentence} />
              <div className="flex justify-between">
                <button className="absolute bottom-4 left-4 text-white hover:text-[#ffdc15]" onClick={() => setOutputSentence("")}>Reset</button>
                <button className="absolute bottom-4 right-4 text-white hover:text-[#ffdc15]" onClick={() => copyToClipboard(outputSentence)}>Copy</button>
              </div>
            </div>
            :
            <textarea className="w-full h-96 min-h-20 p-4 rounded-md bg-[#2B2F3F] text-white outline-none" placeholder="Enter your email here..." onChange={(e) => setInputSentence(e.target.value)}></textarea>}
          <button className="w-full h-16 mt-4 rounded-md bg-[#ffdc15] text-[#2B2F3F] font-bold text-lg" onClick={() => handleWordReplacement(inputSentence)}>Smart it</button>
        </div>
        <div className="mt-auto">
          <p className="text-base text-white">Made with <span className="text-[#ffdc15]">{'<3'}</span> by <a href="https://github.com/renatoka" className="text-[#ffdc15]">{'@renatoka'}</a></p>
          <p className="text-xs text-white text-center">Powered by <a href="https://openai.com/api/policies/service-terms/" className="text-[#ffdc15]">{'OpenAI'}</a></p>
        </div>
      </div>
    </div>
  )
}
export default App
