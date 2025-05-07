import { Copyright } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <hr className="border border-gray-400 dark:border-gray-800" />
        <p className="regular-14 text-[10px] w-full text-center  flex items-center justify-center gap-1 mt-1">
          <Copyright width={10} /> <p>2025 All Rights Reserved, Mourya J P ®</p>
        </p>
    </div>
  )
}

export default Footer