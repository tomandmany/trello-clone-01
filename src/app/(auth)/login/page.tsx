import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <main className='w-full h-[100vh] flex flex-col justify-center items-center gap-8'>
      <h1 className='text-4xl'>明実Trello</h1>
      <form className='bg-white w-[400px] flex flex-col items-center p-10 shadow-lg'>
        <h2 className='mb-6'>ログイン方法を選んでください</h2>
        <input type='textbox' placeholder='メールアドレスでログインする' className='border-2 p-2 mb-4 text-sm w-full'></input>
        <button className='bg-green-600 rounded text-white w-full py-2 mb-2'>次へ</button>
        <p className='text-sm mb-2'>または</p>
        <div className='w-full pb-6 border-b-2 mb-6'>
          <button className='p-2 shadow-md w-full border'>Googleアカウントでログイン</button>
        </div>
        <div className='flex text-sm'>
          <div className='text-blue-600 hover:underline'>
            <Link href={'#'}>ログインできない場合</Link>
          </div>
          ・
          <div className='text-blue-600 hover:underline'>
            <Link href={'#'}>アカウントを作成</Link>
          </div>
        </div>
      </form>
      <div className='flex text-[0.8rem]'>
        <div className='text-blue-600 hover:underline'>
          <Link href={'#'}>プライバシーポリシー</Link>
        </div>
        ・
        <div className='text-blue-600 hover:underline'>
          <Link href={'#'}>サービス利用規約</Link>
        </div>
      </div>
    </main>
  )
}

export default Login