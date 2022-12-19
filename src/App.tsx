import { Configuration, OpenAIApi } from "openai";
import ReactMarkdown from 'react-markdown'
import { useState } from "react";

const configuration = new Configuration({
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

function App() {

  const [inputSentence, setInputSentence] = useState("");
  const [outputSentence, setOutputSentence] = useState("");

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
      setOutputSentence(response.data.choices[0].text as string)
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App h-screen bg-[#202532]">
      <div className="container mx-auto flex flex-col items-center justify-center h-full gap-3">
        <div className="flex flex-col items-center mt-auto">
          <h1 className="text-5xl font-bold text-white">Smarten <span className="text-[#ffdc15]">Me</span></h1>
          <p className="text-base text-white">Make your emails sound professional!</p>
        </div>
        <div className="flex flex-col">
          <textarea className="w-96 h-96 min-h-20 p-4 rounded-md bg-[#2B2F3F] text-white outline-none" placeholder="Enter your email here..." rows={3} onChange={(e) => setInputSentence(e.target.value)}></textarea>
          <button className="w-96 h-16 mt-4 rounded-md bg-[#ffdc15] text-[#2B2F3F] font-bold text-lg" onClick={() => handleWordReplacement(inputSentence)}>Smart it</button>
        </div>
        <div className="mt-auto mb-3">
          <p className="text-base text-white">Made with <span className="text-[#ffdc15]">{'<3'}</span> by <a href="https://github.com/renatoka" className="text-[#ffdc15]">{'@renatoka'}</a></p>
          <p className="text-xs text-white text-center">Powered by <a href="https://openai.com/api/policies/service-terms/" className="text-[#ffdc15]">{'OpenAI'}</a></p>
          {outputSentence && <ReactMarkdown className="text-white text-center">{outputSentence}</ReactMarkdown>}
        </div>
      </div>
    </div>
  )
}

export default App
