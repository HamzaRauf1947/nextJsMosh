import React, { Suspense } from 'react'
import Link from 'next/link'
import UserTable from './UserTable'

interface Props {
  searchParams: Promise<{ sortOrder: string }>
}

const UsersPage = async ({ searchParams }: Props) => {
  const {sortOrder='name'} = await searchParams
  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className='btn'>New User</Link>
      <Suspense fallback={<p>Loading...</p>}> 
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  )
}

export default UsersPage