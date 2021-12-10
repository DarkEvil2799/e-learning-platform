import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"

type Props = {
  announcements: any[],
  fullWidth?: boolean
}

export default function AnnouncementList({
  announcements,
  fullWidth = false
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [announcement, setAnnouncement] = useState<null|any>(null)

  useEffect(() => {
    if (announcements && announcements.length > 0) {
      setAnnouncement(announcements.sort((a:any, b:any) => b.time - a.time)[currentIndex])
    }
  }, [currentIndex, announcements])
  return (
    <div className={`w-full ${!fullWidth && "md:max-w-sm"}`}>
    <div className="flex bg-primary-600 mt-4 py-4 border-b border-primary-400">
      <h3 className="text-xl leading-6 font-medium text-primary-100">Annoucements</h3>
      {announcements && announcements.length > 0 && (

        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            disabled={currentIndex == 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="relative inline-flex items-center text-sm font-medium rounded-md text-primary-100 hover:bg-primary-400 hover:text-primary-500 disabled:text-primary-300"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className="mx-2 text-primary-100">{currentIndex+1}/{announcements.length}</span>
          <button
            disabled={announcements.length-1 == currentIndex}
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="relative inline-flex items-center text-sm font-medium rounded-md text-primary-100 hover:bg-primary-400 hover:text-primary-500 disabled:text-primary-300"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
    <div>
      <div className="flow-root">
        {announcement && announcements && announcements.length > 0 ? (
          <div className="divide-y divide-primary-200">
            <div
              className="relative bg-primary-200 py-5 px-4"
            >
              <div className="flex justify-between space-x-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{announcement.name}</p>
                  <p className="text-sm text-gray-500 truncate">{announcement.course}</p>
                </div>
                <time className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                  {new Date(announcement.time).toLocaleString()}
                </time>
              </div>
              <div className="mt-1">
                <p className="line-clamp-2 text-sm text-gray-600">{announcement.detail}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No announcements available for now.</p>
        )}
    </div>
  </div>
  </div>
  )
}