import type { NextPage } from 'next'
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BaseLayout from '../components/layout/BaseLayout'
import { API_BASE_URL } from '../utils/constants';

const SelectRolePage: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter()

  const selectRole = (role:string) => {
    fetch(`${API_BASE_URL}/users/${session?.user?.email}`, {
      method: 'PATCH',
      body: JSON.stringify({"role": role}),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(respone => {
        if (!respone.ok) {
          console.log("failed to select role")
        } else {
          router.push("/")
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (!loading) {
      if (!session?.user) {
        router.push('/login')
      } else if (session?.user.role !== "unknown") {
        router.push('/')
      }
    }
  }, [loading])
  return (
    <>
    {!loading && session?.user.role === "unknown" &&
    <BaseLayout title="Select Role">
      <div className="max-w-4xl mx-auto px-8">
        <div className="relative pt-8 pb-10 lg:py-16">
          <div className="relative mx-auto">      
            <div className="text-center">
              <h2 className="text-4xl tracking-tight font-black text-primary-200 sm:text-5xl">
                <div className="leading-tight">
                  Hi 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500"> { session.user.name }</span>
                  , <br />
                  <span>Which of the following roles best describe you?</span>
                </div>
              </h2>
              <p className="mt-3 mx-auto text-lg font-medium sm:text-xl text-primary-400 sm:mt-4">
                Once you have choosen you role, you will not be able to change it in the future.
              </p>
            </div>  
            <div className="flex flex-row mt-8 sm:gap-8">
              <button
              onClick={() => selectRole("lecturer")}
                className="flex-1 transition-colors h-auto text-primary-100 hover:text-primary-900 hover:bg-primary-100 rounded-xl cursor-pointer p-8 active:ring-4">
                <img
                  className="h-auto w-full object-fit pb-4 px-4"
                  src="/lecturer.svg"
                  alt=""
                />
                <p className="w-full text-center uppercase font-black text-xl">
                  Lecturer
                </p>
              </button>
              <button
                onClick={() => selectRole("student")} 
                className="flex-1 transition-colors h-auto text-primary-100 hover:text-primary-900 hover:bg-primary-100 rounded-xl cursor-pointer p-8 active:ring-4">
                <img
                  className="h-auto w-full object-fit pb-4 px-4"
                  src="/student.svg"
                  alt=""
                />
                <p className="w-full text-center uppercase font-black text-xl">
                  Student
                </p>
              </button>
            </div> 
          </div>
        </div>
      </div>   
    </BaseLayout>}
    </>
  )
}

export default SelectRolePage
