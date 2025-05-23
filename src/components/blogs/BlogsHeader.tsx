import React from 'react'
import Link from 'next/link';
const BlogssHeader = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue via-primary-cyan to-primary-purple leading-[1.3]">
        Blogs
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Know more about Mathematics with us.
      </p>
      <Link href="/dashboard" className='inline-block mt-6 px-6 py-2 text-white bg-primary-blue rounded-full hover:opacity-90 transition-opacity'>Add Your Blog</Link>
    </div>
  )
}

export default BlogssHeader;
