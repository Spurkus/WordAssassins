'use client';
import StartButton from '@/components/StartButton';
import LetterTrail from '@/components/LetterTrail';
import { useState } from 'react';

const Home = () => {
  const [cursorTrail, setCursorTrail] = useState(false);
  const [wordPressed, setWordPressed] = useState(false);

  return (
    <>
      {cursorTrail && (
        <>
          <LetterTrail />
          <LetterTrail />
        </>
      )}
      <div className="mx-2 my-16 flex w-full flex-col justify-between text-center">
        <h1 className="inline-block bg-gradient-to-b from-yellow-500 via-primary-100 to-red-700 bg-clip-text font-black text-transparent ~mt-0/28 ~leading-[4.2rem]/[7.8rem] ~/lg:~text-[4.2rem]/[8rem]">
          <button
            className={`cursor-pointer transition-all duration-200 ease-in-out ${wordPressed ? 'scale-105' : ''}`}
            onClick={() => setCursorTrail(!cursorTrail)}
            onMouseDown={() => setWordPressed(true)}
            onMouseUp={() => setWordPressed(false)}
          >
            Word
          </button>{' '}
          Assassins
        </h1>
        <StartButton />
      </div>
    </>
  );
};

export default Home;
