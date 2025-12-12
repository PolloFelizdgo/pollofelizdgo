import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Icon generation
export default async function Icon() {
  // Fetch the logo image
  const logoUrl = new URL('/logo.png', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
  
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl.href}
          alt="Pollo Feliz"
          width="32"
          height="32"
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
