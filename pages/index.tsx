import { AcademicCapIcon, PlusIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { ClassCard } from '../components/class/ClassCard'
import BaseLayout from '../components/layout/BaseLayout'
import { API_BASE_URL } from '../utils/constants'
import UserInformationCard from '../components/auth/UserInformationCard'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import FileList from '../components/class/FileList'
import AnnouncementList from '../components/class/AnnouncementList'

const ClassListPage: NextPage = () => {
  const [session, loading] = useSession()
  const [files, setFiles] = useState(Array())
  const [announcements, setAnnouncements] = useState(Array())
  const [classes, setClasses] = useState<null|any[]>(null)
  const [firstLoaded, setFirstLoaded] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!session?.user) {
        router.push('/login')
      } else if (session?.user.email) {
        if (!firstLoaded) {
          setFirstLoaded(true)
          fetch(`${API_BASE_URL}/classes`)
            .then((response) => response.json())
            .then((fetchedClasses) => {
              const messages = Array();
              const announces = Array();
              setClasses(fetchedClasses.filter((c:any) =>
                  c.owner === session.user.email || 
                  c.students.filter((s:any) => 
                    s.email === session.user.email  
                  ).length !== 0 
              ))
              fetchedClasses.forEach((c:any) => {
                if ("announcements" in c) {
                  c.announcements.forEach((a:any) => {
                    announces.push(a)
                  });
                }
                c.messages.filter((m:any) => "attachment" in m).forEach((f:any) => {
                  f.attachment['course'] = c.title
                  f.attachment['time'] = f.timestamp
                  messages.push(f.attachment)
                });
              });
              setFiles([...files, ...messages])
              setAnnouncements([...announcements, ...announces])
            })
            .catch((error) => console.log(error))
        }
      } 
    }
  }, [loading])
  return (
    <>
    {!loading && classes !== null && (
    <BaseLayout title="Home Page
    ">
      <div className="px-8">
        <div className="pt-8 pb-10 lg:py-16 gap-8 mx-auto w-auto md:inline-flex">
          <div className="">
            <UserInformationCard 
              avatar={session?.user.image}
              name={session?.user.name}
              role={session?.user.role} />
            <div className="relative mx-auto">
              <div className="text-left pb-4 sm:pb-6 lg:pb-8">
                <h2 className="text-4xl tracking-tight font-black text-primary-100 sm:text-5xl">
                  Your classes
                </h2>
              </div>    
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-8">
                {classes.map((aClass:any) => (
                  <ClassCard key={aClass.id} theClass={aClass} />
                ))}
                { session?.user?.role === "lecturer" && (
                  <Link href="/create">
                  <button
                    type="button"
                    className="relative  block w-full text-primary-400 border-4 border-primary-300 border-dashed rounded-lg p-20 text-center hover:border-blue-500 hover:text-blue-500 active:bg-primary-400"
                  >
                    <AcademicCapIcon className="mx-auto h-12 w-12" />
                    <span className="mt-2 block text-sm font-medium">Create a new class</span>
                  </button>                  
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex-shrink">
            <Calendar className="mx-auto md:max-w-sm mt-8 md:mt-0" />
            <AnnouncementList announcements={announcements} />
            <FileList files={files} />
          </div>
        </div>
      </div>   
    </BaseLayout>
    )}
    </>
  )
}

export default ClassListPage
