import type { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import router from 'next/router'
import { useEffect } from 'react'
import { LoginFormCard } from '../../components/auth/LoginFormCard'
import { LoginHeroCard } from '../../components/auth/LoginHeroCard'
import TwoSidedLayout from '../../components/layout/TwoSidedLayout'

const LoginPage: NextPage = () => {
  const [session, loading] = useSession();
  useEffect(() => {
    if (!loading && session?.user) {
      router.push('/')
    }
  }, [loading])
  return (
    <>
    {!loading && (
      <TwoSidedLayout>
        <LoginHeroCard />
        <LoginFormCard />
      </TwoSidedLayout>
    ) }
    </>
  )
}

export default LoginPage
