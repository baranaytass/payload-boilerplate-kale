import React from 'react'
import Image from 'next/image'

export const Icon = () => {
  return (
    <div 
      className="graphic-icon"
      style={{
        position: 'relative',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px',
        opacity: 1,
        visibility: 'visible',
        zIndex: 100,
        backgroundColor: 'transparent',
      }}
    >
      <Image
        src="/assets/kale-icon.png"
        alt="Kale"
        width={32}
        height={32}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          opacity: 1,
          visibility: 'visible',
          display: 'block',
          position: 'relative',
          zIndex: 101,
        }}
        priority
      />
    </div>
  )
}