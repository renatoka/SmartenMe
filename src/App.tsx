import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import Alert from '@mui/material/Alert';

function App() {

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY as string,
  });
  const openai = new OpenAIApi(configuration);

  const [inputSentence, setInputSentence] = useState("");
  const [outputSentence, setOutputSentence] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const copyToClipboard = async (str: string) => {
    try {
      await navigator.clipboard.writeText(str);
    }
    catch (error) {
      setError(error as Error);
    }
  }

  const handleWordReplacement = async (inputSentence: string) => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Make this email sound professional: ${inputSentence}`,
        temperature: 0.5,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      setOutputSentence(response.data.choices[0].text as string);
    }
    catch (error) {
      setError(error as Error);
    }
  }

  return (
    <div className="App h-screen bg-[#202532]">
      <div className="container mx-auto flex flex-col items-center justify-center h-full gap-3">
        <div className="flex flex-col md:flex-row justify-between items-center mt-auto w-full">
          <h1 className="text-5xl font-bold text-white">Smarten <span className="text-[#ffdc15]">Me</span></h1>
          <p className="text-lg text-white">Sound professional, without the effort.</p>
        </div>
        <div className="flex flex-col w-full">
          {outputSentence ?
            <div className="relative">
              <ReactMarkdown className="w-full h-96 min-h-20 p-4 rounded-md bg-[#2B2F3F] text-white outline-none" children={outputSentence} />
              <div className="flex justify-between">
                <button className="absolute bottom-4 left-4 text-white hover:text-[#ffdc15]" onClick={() => setOutputSentence("")}>Edit</button>
                <button className="absolute bottom-4 right-4 text-white hover:text-[#ffdc15]" onClick={() => copyToClipboard(outputSentence)}>Copy</button>
              </div>
            </div>
            :
            <textarea className="w-full h-96 min-h-20 p-4 rounded-md bg-[#2B2F3F] text-white outline-none" placeholder="Enter your email here..." onChange={(e) => setInputSentence(e.target.value)}></textarea>}
          <button className="w-full h-16 mt-4 rounded-md bg-[#ffdc15] text-[#2B2F3F] font-bold text-lg" onClick={() => handleWordReplacement(inputSentence)}>Smart it</button>
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
        <div className="mt-auto mb-3">
          <p className="text-base text-white">Made with <span className="text-[#ffdc15]">{'<3'}</span> by <a href="https://github.com/renatoka" className="text-[#ffdc15]">{'@renatoka'}</a></p>
          <p className="text-xs text-white text-center">Powered by <a href="https://openai.com/api/policies/service-terms/" className="text-[#ffdc15]">{'OpenAI'}</a></p>
        </div>
      </div>
    </div>
  )
}

export default App
