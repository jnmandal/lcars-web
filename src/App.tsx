import {useState} from 'react'
import Clock from './Clock.tsx';
import Avatar from './assets/restaurateur.png';

function App() {
  const [messages, setMessages] = useState([])
  const [agentThinking, setAgentThinking] = useState(false)
  const [msgInputContent, setMsgInputContent] = useState("")


  function sendMessage(content: string, cb: Function) {
    const BASE_URL = "//localhost:8000"

    fetch(`${BASE_URL}/agents/restaurateur`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        content
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return data
    })
    .then(cb)
  }

  function handleChatBoxSubmit(e) {
    e.preventDefault()
    console.log(e)
    console.log("Sending msg", msgInputContent)

    // be careful, setMessages is async!
    const nextMessages = messages.concat([{
        content: msgInputContent,
        type: "user"
      }])
    setMsgInputContent("")
    setAgentThinking(true)

    setMessages(nextMessages)
    sendMessage(msgInputContent, data => {
      setMessages(nextMessages.concat([{
        content: data.message,
        type: "assistant"
      }]))
      setAgentThinking(false)
    })
  }

  // Placeholders...
  const { agentName, agentTagline, initialMessage } = {
    agentName: "Karim",
    agentTagline: "Owner, Karim's Kitchen",
    initialMessage: "What can I get you today?"
  }

  return (
    <>
      <div className="bg-gradient-to-r from-amber-200 to-stone-500 px-6 py-4 flex flex-row">
        <div className="text-stone-500 flex-1">
          <span className="font-bold">LCARS</span>&nbsp;<span>v0.0.2</span>
        </div>
        <div className="text-white font-bold justify flex-1 text-center">
          <Clock />
        </div>
        <div className="text-amber-200 font-bold flex-1 text-right">
          Lotus AI
        </div>
      </div>
      <div className="lg:col-span-1 my-5 max-w-xl mx-5">
        <div className="bg-white shadow-xl flex flex-col border-2 border-amber-400">
          <div className="bg-gradient-to-r from-stone-300 to-stone-500 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-25 h-25 bg-white bg-opacity-20 flex items-center justify-center border-5 border-amber-100">
                <img src={Avatar} />
              </div>
               <div>
                <h3 className="text-lg font-semibold text-amber-300">{ agentName }</h3>
                <p className="text-amber-200 text-sm">
                  { agentTagline }
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 min-h-[250px] max-h-[250px]">
            {
              messages.length == 0 ?
              <div className="text-center text-gray-500 text-sm py-16 ">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Start a conversation with { agentName }!
              </div>
              : <></>
            }
            {
              messages.map(msg =>
                msg.type == "user" ?
                <div className="flex justify-start" key={btoa(msg)}>
                  <div className="bg-white text-black border px-4 py-2 rounded-lg max-w-xs shadow-sm">
                    {msg.content}
                  </div>
                </div>
                :
                <div className="flex justify-end" key={btoa(msg)}>
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
                    {msg.content}
                  </div>
                </div>
              )
            }
            { agentThinking ? <div>Loading...</div> : <></> }
          </div>
          <div className="p-4 border-t bg-white ">
            <form className="flex space-x-2" onSubmit={handleChatBoxSubmit}>
              <input
                type="text"
                placeholder="Two chicken afghani please..."
                value={msgInputContent}
                onChange={e => setMsgInputContent(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-black"
              />
              <button className="px-3 py-3 bg-orange-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
                </svg>
              </button>
              <button
                id="record-button"
                className="px-3 py-3 font-semibold transition-colors flex flex-row bg-blue-500 hover:bg-blue-600 text-white"
                // {[
                //   ,
                //   if(@recording?,
                //     do: "bg-red-500 hover:bg-red-600 text-white",
                //     else: "bg-blue-500 hover:bg-blue-600 text-white"
                //   )
                // ]}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="2" width="6" height="10" rx="3" stroke="currentColor" stroke-width="2" fill="none"/>
                  <path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <line x1="8" y1="22" x2="16" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden border-2 border-dashed my-5 p-1 mx-5">
        <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700 bg-gray-50 select-none">
                  field 1
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700 bg-gray-50 select-none">
                  field 2
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700 bg-gray-50 select-none">
                  field 3
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 focus-within:bg-blue-50">
                <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white">field value 1</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white">field value 2</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white">field value 3</td>
              </tr>
              <tr className="hover:bg-blue-50 focus-within:bg-blue-50">
                <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white">field value 1</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white">field value 2</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white">field value 3</td>
              </tr>
            </tbody>
        </table>
      </div>
    </>
  )
}

export default App
