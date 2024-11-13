'use client';
import { useEffect, useState, useRef } from 'react';

type Position = {
  x: number;
  y: number;
  existingTime: number;
  letter: string;
  id: number;
};

const LetterTrail = ({
  trailLength = 10,
  distanceThreshold = 20,
  maxExistingTime = 2000,
}) => {
  const [trail, setTrail] = useState<Position[]>([]);
  const [lastPosition, setLastPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const getRandomLetter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return letters.charAt(Math.floor(Math.random() * letters.length));
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const handleMouseMove = (event: MouseEvent) => {
    // First mouse move
    if (!lastPosition) {
      setLastPosition({ x: event.clientX, y: event.clientY });
      return;
    }

    // Calculate distance between last position and current position
    // and check if it's greater than the threshold
    const distance = calculateDistance(
      lastPosition.x,
      lastPosition.y,
      event.clientX,
      event.clientY,
    );
    if (distance <= distanceThreshold) return;

    // Add a new letter to the trail
    setTrail((currentTrail) => {
      const newTrail = [
        ...currentTrail,
        {
          x: event.clientX,
          y: event.clientY,
          letter: getRandomLetter(),
          existingTime: 0,
          id: Math.random(),
        },
      ];
      return newTrail.length > trailLength ? newTrail.slice(1) : newTrail;
    });

    setLastPosition({ x: event.clientX, y: event.clientY });
  };

  // Add mousemove event listener to track mouse position and update trail
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [lastPosition, distanceThreshold, trailLength]);

  // Animate the trail with requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      setTrail((currentTrail) =>
        currentTrail
          .map((item) => ({
            ...item,
            existingTime: item.existingTime + 100,
          }))
          .filter((item) => item.existingTime < maxExistingTime),
      );
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [maxExistingTime]);

  return (
    <div className="pointer-events-none z-50">
      {trail.map((position, index) => (
        <span
          key={position.id}
          className="trail-letter"
          style={{
            left: position.x + 0.02 * position.existingTime * position.id,
            top: position.y - 0.01 * position.existingTime,
            fontSize: `${25 - 0.5 * (trailLength - index)}px`,
            opacity: 1 - position.existingTime / maxExistingTime,
            textShadow: `0 5px 20px #16bfed`,
            transform: `translateY(-${position.existingTime / 50}px)`,
          }}
        >
          {position.letter}
        </span>
      ))}
    </div>
  );
};

export default LetterTrail;
