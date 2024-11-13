'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const StartButton = () => {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <Button
      className={`shadow-[0_0px_50px_-12px_rgba(0,0,0,0.3)] shadow-primary-200 transition-all duration-200 ease-in-out ~mb-0/12 hover:shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-primary-200 ${hover ? 'scale-105' : ''} ${pressed ? 'scale-[107%]' : ''}`}
      size="lg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      Start Playing with Friends :3
    </Button>
  );
};

export default StartButton;
