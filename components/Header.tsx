'use client'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { Avatar } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { getProfile } from '@/apis/user/getProfile'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()

  const notAllowedPaths = ['/signin', '/signup', '/oauth']
  const isMain = pathname === '/'

  const { data: user } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !notAllowedPaths.includes(pathname),
  })

  if (notAllowedPaths.includes(pathname)) return null

  return (
    <div className="w-full h-16 flex flex-row items-center justify-between px-4 mt-1">
      {isMain ? (
        <>
          <Image
            alt="logo"
            className="cursor-pointer"
            height={36}
            onClick={() => router.push('/')}
            src="/images/logo.svg"
            width={231}
            priority
          />
          <Avatar
            onClick={() => router.push('/my')}
            src={user?.profile_image_url ?? undefined}
            sx={{ cursor: 'pointer' }}
          />
        </>
      ) : (
        <div
          className="cursor-pointer bg-white border border-gray-lightest p-2 pr-2.5 shadow-md rounded-full"
          onClick={() => router.back()}
        >
          <KeyboardArrowLeftIcon />
        </div>
      )}
    </div>
  )
}

export default Header
