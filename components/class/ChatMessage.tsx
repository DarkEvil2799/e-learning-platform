import { DocumentTextIcon } from "@heroicons/react/outline"
import { Message } from "../../types/Message"

type Props = {
  message: Message
}

export const ChatMessage = ({
  message
}: Props) => {
  return (
    <div className="">
        <div className="flex items-start">
          { message.avatar ? (
            <img src={message.avatar} alt="My profile" className="w-6 h-6 rounded-full" />          
          ) : (
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-400">
              <span className="text-xs leading-none uppercase text-white">
                {message.author.substring(0, 1)}
              </span>
            </span>
          ) }
          <div className="flex-grow flex flex-col text-sm mx-2 items-start">
              <div className="space-x-1 font-medium">
                <span className="text-blue-500">{message.author}</span>
                <span className="text-primary-400">at&nbsp;
                  <time>
                    {message.timestamp}
                  </time>
                </span>
              </div>
              <p className="text-white">
                {message.content}
              </p>
              { message.attachment !== undefined && (
                <a href={message.attachment.url} className="flex flex-row items-center mt-2 w-full text-left gap-1 text-white font-medium bg-primary-600 hover:bg-primary-400 p-2 rounded">
                    <DocumentTextIcon className="flex-none p-1 rounded h-6 w-6" />
                    <span className="flex-grow">{message.attachment.name}</span>
                    <span className="flex-none font-normal">{message.attachment.size} MB</span>
                </a>
              ) } 
          </div>
        </div>
    </div>
  )
}