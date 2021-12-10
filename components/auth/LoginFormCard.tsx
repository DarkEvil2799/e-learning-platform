import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import { SITE_NAME } from '../../utils/constants'

export const LoginFormCard = () => {
  return (
    <div className="flex-1 flex flex-col bg-primary-600 justify-center py-12 px-4 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto lg:mx-0 w-full max-w-lg">
        <div>
          <div className="flex flex-row items-center space-x-4">
            <span className="w-14 h-14">
              <img src="/logo.png" />
            </span>
            <span className="text-2xl font-bold text-primary-100">{SITE_NAME}</span>
          </div>
          <h2 className="mt-12 text-6xl font-black leading-snug bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-red-500">
            Online Studying&nbsp;
            Made Easy
          </h2>
        </div>

        <div className="mt-8">
          <p className="text-2xl font-bold text-primary-100">
            Join now 👇
          </p>
          <div className="mt-8">
              <button
                onClick={() => signIn('google', {
                  callbackUrl: `${window.location.origin}`
                })}
                className="w-auto inline-flex justify-center py-3 px-24 border rounded-md bg-gray-100 text-sm font-medium text-gray-900 hover:bg-gray-200"
              >
                <svg className="w-5 h-5 mr-1" preserveAspectRatio="xMidYMid" aria-hidden="true" fill="currentColor" viewBox="0 0 300 250">
                  <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
                  <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
                  <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
                  <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
                </svg>
                <span>Sign in using Google</span>
              </button>
          </div>
          <p className="mt-4 text-sm text-primary-400 font-medium italic">
            By signing in, you agree with our 
            <a href="#" className="text-blue-400 hover:text-blue-500"> Terms of service.</a>
          </p>
        </div>
      </div>
    </div>
  )
}