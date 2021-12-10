import { CloudUploadIcon, PaperAirplaneIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/client"
import { useEffect, useState } from "react"
import { API_BASE_URL, API_FILE_URL, API_UPLOAD_URL } from "../../utils/constants"
import { Message } from "../../types/Message"
import { uploadFile } from "../../utils/fileUpload"
import { ChatMessage } from "./ChatMessage"

type Props = {
  classId: string
}

export const Chatbox = ({
  classId
}: Props) => {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState<any|undefined>(undefined);
  const [fileUploading, setFileUploading] = useState(false);
  const [session, loading] = useSession();

  useEffect(() => {
    getMessages()
    const interval = setInterval(() => {
      getMessages()
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const getMessages = () => {
      fetch(`${API_BASE_URL}/classes/${classId}/messages`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((response) => {
        setMessages(response)
      })
  }
  const sendMessage = (e:any) => {
    // e.preventDefault()
    if (e.key === "Enter") {
      fetch(`${API_BASE_URL}/classes/${classId}/messages`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(        {
          "author": session?.user?.name ?? "",
          "avatar": session?.user?.image ?? "",
          "content": newMessage,
          "attachment": file,
          "timestamp": new Date().toLocaleString()
        })
      })
      .then(() => {
        setNewMessage("")
        setFile(undefined)
      })
    }
  } 
  
  const handleUploadFile = (e: any) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFileUploading(true);
      uploadFile(selectedFile, "attachments")
        .then((uploadFileName: any) => {
          setFile({
            "url": `${API_FILE_URL}/${uploadFileName}`,
            "name": selectedFile.name,
            "size": Math.round(selectedFile.size / 1048576)
          })
          setFileUploading(false);
        });
    }
  }  
  return (
    <div className="bg-primary-500 rounded-lg">
    <div className="flex flex-col">
      <div id="messages" className="h-96 flex flex-col-reverse gap-y-4 p-3 overflow-y-auto">

        { messages.length > 0 ? messages.slice(0).reverse().map((message:Message) => (
          <ChatMessage 
              key={message.content}
              message={message}
            />
        )) : (
          <p className="text-center text-gray-500 mt-4">This class has no message yet. <br />Be the first one to do so!</p>
        ) }
      </div>
      <div className="p-4">
          { (file !== undefined) && (
            <p className="text-sm mb-2 italic text-primary-200">
              <a href={file.url} className="text-blue-500 font-medium">
                {file.name}
              </a> is ready.
            </p>
          ) }
          <div className="relative flex">
            <input 
              onKeyPress={(e) => sendMessage(e)}
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              type="text" 
              placeholder="Send a message" 
              className="w-full bg-primary-600 border-primary-400 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-400 text-white placeholder-gray-600 pl-4 pr-16 rounded-lg py-2" />          
            <div className="absolute right-0 items-center inset-y-0 hidden space-x-1 mr-2 sm:flex">
                { fileUploading ? (
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <label
                    htmlFor="file-upload" 
                    className="inline-flex cursor-pointer items-center justify-center rounded-full text-blue-500  hover:text-blue-600 focus:outline-none"
                    >
                    <CloudUploadIcon className="h-6 w-6" />
                    <input id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only"
                      accept="*"
                      onChange={(e) => handleUploadFile(e)} />  
                  </label>
                ) }
                <button type="button" className="inline-flex items-center justify-center rounded-full text-green-500 hover:text-green-600 focus:outline-none">
                  <PaperAirplaneIcon className="h-6 w-6" />
                </button>
            </div>
          </div>
      </div>
    </div>
    </div>
)
}