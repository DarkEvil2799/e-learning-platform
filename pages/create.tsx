import { PlusIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import BaseLayout from '../components/layout/BaseLayout'
import { API_BASE_URL } from '../utils/constants'
import { Class } from '../types/Class'
import { useSession } from 'next-auth/client'

const defaultClass:Class = {
  title: "",
  owner: "",
  description: "",
  students: [],
  messages: []
}

const CreateClassPage: NextPage = () => {
  const [session, loading] = useSession();
  const [student, setStudent] = useState("")
  const [students, setStudents] = useState<any[]>([])
  const [newClass, setNewClass] = useState<Class>(defaultClass)
  const [errorMessage, setErrorMessage] = useState<null|string>(null)
  const form = useRef(null)
  const router = useRouter()

  const addStudent = (e:any) => {
    setErrorMessage(null)
    if (students.filter((s) => s.email === student).length === 0) {
      fetch(`${API_BASE_URL}/users/${student}`)
      .then((response) => {
        if (!response.ok) {
          setErrorMessage("Non-exist student email, try again!")
        } else {
          response.json().then((fetchedStudent) => {
            setStudents([...students, fetchedStudent])
          })
        }
        setStudent("")
      })
      .catch((error) => console.log(error))
    } else {
      setErrorMessage("User already added.")
      setStudent("")

    }
  }

  const removeStudent = (e:any, studentId: string) => {
    e.preventDefault()
    setStudents(students.filter((student) => student.id !== studentId))
  }

  const handleFormSubmit = (e: any) => {
    // e.preventDefault();
    if (newClass.title && newClass.description) {
      fetch(`${API_BASE_URL}/classes`, {
        method: 'PUT',
        body: JSON.stringify({
          ...newClass, 
          owner: session?.user?.email ?? "", // TODO: next-auth
          students: students
        }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(createdClass => {     
          router.push(`/class/${createdClass.id}`);
        })
        .catch(error => console.log(error));
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!session?.user) {
        router.push('/login')
      } else if (session?.user.role !== "lecturer") {
        router.push('/')
      }
    }
  }, [loading])
  return (
    <>
    {!loading && (
    <BaseLayout title="Create class">
      <div className="max-w-2xl mx-auto px-8">
        <div className="relative pt-8 pb-10 lg:py-16">

          <form ref={form} onSubmit={handleFormSubmit}>
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl leading-6 font-bold text-primary-100">New Class</h1>
                <p className="mt-4 font-medium text-primary-400">
                  Let’s get started by filling in the information below to create your new class.
                </p>
              </div>

              <div>
                <label htmlFor="class-name" className="block text-lg font-bold text-primary-100">
                  Class Name
                </label>
                <div className="mt-1">
                  <input
                    id="class-name"
                    type="text"
                    name="class-name"
                    required={true}
                    className="block w-full bg-primary-500 shadow-sm text-white focus:ring-blue-400 border-primary-400 rounded-md"
                    placeholder="My new class"
                    onChange={e => setNewClass({ ...newClass, title: e.target.value })}
                    defaultValue={newClass.title}                    
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-lg font-bold text-primary-100">
                  Short Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    required={true}
                    rows={3}
                    className="block w-full text-white bg-primary-500 shadow-sm focus:ring-blue-400 border-primary-400 rounded-md"
                    placeholder="Write what your class is about here"
                    onChange={e => setNewClass({ ...newClass, description: e.target.value })}
                    defaultValue={newClass.description}    
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <label htmlFor="students" className="block text-lg font-bold text-primary-100">
                    Students
                  </label>
                  <div className="flex">
                    <div className="flex-grow flex flex-col">
                      <input
                        type="text"
                        name="students"
                        id="students"
                        className="block w-full text-white bg-primary-500 shadow-sm focus:ring-blue-400 border-primary-400 rounded-md"
                        placeholder="Email address"
                        aria-describedby="students-helper"
                        value={student}
                        onChange={(e) => setStudent(e.target.value)}
                      />
                      { errorMessage !== null && (
                        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
                      )}
                    </div>
                    <span className="ml-3">
                      <button
                        onClick={(e) => addStudent(e)}
                        disabled={(student === "")}
                        type="button"
                        className="bg-green-500 transition-colors inline-flex items-center px-4 py-2 border border-primary-400 shadow-sm font-medium rounded-md text-white hover:bg-green-600 active:outline-none active:ring-2 active:ring-green-400 disabled:bg-green-300"
                      >
                        <PlusIcon className="-ml-2 mr-1 h-5 w-5 text-white" aria-hidden="true" />
                        Add
                      </button>
                    </span>
                  </div>
                </div>

                <div className="border-b border-primary-400">
                  { students.length > 0 ? (
                    <ul className="divide-y divide-primary-400">
                      {students.map((student:any) => (
                        <li key={student.email} className="py-4 flex">
                          <img className="h-10 w-10 rounded-full" src={student.image} alt="" />
                          <div className="ml-3 flex flex-col">
                            <span className="text-sm font-bold text-primary-100">{student.name}</span>
                            <span className="text-sm text-primary-400">{student.email}</span>
                          </div>
                          <div className="flex-grow"></div>
                          <button 
                            onClick={(e) => removeStudent(e, student.id)}
                            className="px-3 my-1 text-white text-sm bg-red-500 rounded hover:bg-red-600">
                            X
                          </button>
                        </li>
                      ))}
                    </ul>                    
                  ) : (
                    <p className="text-center text-primary-400 my-4">The class is currently empty. Try adding some students!</p>
                  ) }
                </div>
              </div>

              <div className="flex">
                <Link href="/">
                  <a
                    className="bg-gray-200 py-2 px-4 border-none rounded-md shadow-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Cancel
                  </a>
                </Link>
                <div className="flex-grow"></div>
                <button
                  disabled={!(newClass.title && newClass.description && (students.length > 0))}
                  onClick={handleFormSubmit}
                  type="button"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none  disabled:bg-primary-300"
                >
                  Create class
                </button>
              </div>
            </div>
          </form>       

        </div>
      </div>
    </BaseLayout>
    )}
    </>
  )
}

export default CreateClassPage
