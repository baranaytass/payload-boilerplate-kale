import React from 'react'
import Image from 'next/image'

export const Logo = () => {
  return (
    <div 
      className="graphic-logo"
      style={{
        position: 'relative',
        width: '240px',
        height: '82px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
      }}
    >
      <Image
        src="/assets/kale-logo-dark.png"
        alt="Kale CMS"
        width={240}
        height={82}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
        priority
      />
    </div>
  )
}
