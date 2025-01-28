import React from 'react'

const ShopHeader = () => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-5xl font-bold mt-14 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue via-primary-cyan to-primary-purple">
        Infi-Shop
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
          Where Mathematics Meets Style - Exclusive Anant Merchandise
      </p>
      <div className="flex justify-center gap-4 mt-8">
        <span className="px-6 py-2 rounded-2xl bg-primary-blue/10 text-primary-cyan border border-primary-blue/20 hover:bg-primary-blue/20 transition-all">
          Mathematical Designs
        </span>
        <span className="px-6 py-2 rounded-2xl bg-primary-blue/10 text-primary-cyan border border-primary-blue/20 hover:bg-primary-blue/20 transition-all">
          Premium Quality
        </span>
      </div>
    </div>
  )
}
export default ShopHeader