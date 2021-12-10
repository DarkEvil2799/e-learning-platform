import { Fragment, useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { API_BASE_URL } from '../../utils/constants'
import { useSession } from 'next-auth/client'

type Props = {
  open: any,
  setOpen:any,
  currentClass:any,
  appendAnnouncement: any
}

const dummyAnnouncement = {
  name: "",
  detail: "",
  author: "",
  course: "",
  time: ""
}

export default function CreateAnnouncement({
  open,
  setOpen,
  currentClass,
  appendAnnouncement
}: Props) {
  const [isPostSucceess, setIsPostSuccess] = useState<null|boolean>(null)
  const [announcement, setAnnouncement] = useState(dummyAnnouncement)
  const form = useRef(null);
  const [session, loading] = useSession();

  const handleFormSubmit = (e:any) => {
    e.preventDefault();
    const newAnnouncement = {
      ...announcement, 
      author: session?.user?.name ?? "",
      course: currentClass.title,
      time: Date.now()
    }; 
    fetch(`${API_BASE_URL}/classes/${currentClass.id}/announcements`, {
      method: 'POST',
      body: JSON.stringify(newAnnouncement),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          setIsPostSuccess(true)
          appendAnnouncement(newAnnouncement)
          setAnnouncement({ ...announcement, name: "", detail: ""})
        } else {
          throw "error"
        }
      })
      .catch(error => {
        setIsPostSuccess(false)
        console.log(error)
      });
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 overflow-hidden z-10" open={open} onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 pl-16 max-w-full right-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <form ref={form} onSubmit={handleFormSubmit} className="h-full divide-y divide-primary-400 flex flex-col bg-primary-500 border-l border-primary-400 shadow-xl">
                  <div className="flex-1 h-0 overflow-y-auto">
                    <div className="py-6 px-4 bg-primary-700 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-primary-100">New Announcement</Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-primary-700 rounded-md text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-primary-300">
                          Filling in the information below to create a new announcement.
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="px-4 divide-y divide-primary-400 sm:px-6">
                        <div className="space-y-6 pt-6 pb-5">
                          <div>
                            <label htmlFor="announcement-name" className="block text-base font-medium text-primary-100">
                              Announcement name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                onChange={e => setAnnouncement({ ...announcement, name: e.target.value })}
                                value={announcement.name}
                                name="announcement-name"
                                id="announcement-name"
                                className="block w-full bg-primary-600 text-white shadow-sm sm:text-base focus:ring-blue-500 focus:border-blue-500 border-primary-400 rounded-md"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="detail" className="block text-base font-medium text-primary-100">
                              Detail
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="detail"
                                name="detail"
                                onChange={e => setAnnouncement({ ...announcement, detail: e.target.value })}
                                value={announcement.detail}                                  
                                rows={10}
                                className="block w-full bg-primary-600 text-white shadow-sm sm:text-base focus:ring-blue-500 focus:border-blue-500 border-primary-400 rounded-md"
                              />
                            </div>
                          </div>
                          <div>
                            { isPostSucceess === true && (
                              <p className="text-green-500 italic">Announcement successfully posted.</p>
                            ) }
                            { isPostSucceess === false && (
                              <p className="text-red-500 italic">Announcement post failed.</p>
                            ) }                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    { isPostSucceess === null && (
                      <button
                        disabled={announcement.name === "" || announcement.detail === ""}
                        type="submit"
                        className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-primary-300"
                      >
                        Create
                      </button>
                    )}
                    { isPostSucceess === false && (
                      <button
                        onClick={() => {
                          setIsPostSuccess(null)
                        }}
                        type="button"
                        className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Try again
                      </button>
                    )}         
                    { isPostSucceess === true && (
                      <button
                      onClick={() => {
                        setIsPostSuccess(null)
                      }}
                      type="button"
                        className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Create more
                      </button>
                    )}                               
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}