import Image from 'next/image';
import React from 'react'

interface EmptyProps {
    label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return <div className="h-full p-20 flex flex-col items-center justify-center">
    <div className='relative h-72 w-72'>
        <Image
        alt="Empty State"
        fill
        src="/empty.gif"
        />
    </div>
  </div>;
};

