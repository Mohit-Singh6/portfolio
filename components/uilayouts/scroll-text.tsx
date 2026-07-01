// @ts-nocheck

'use client';

import { cn } from '@/lib/utils';
import { type HTMLMotionProps, motion } from 'motion/react';
import type React from 'react';
import type { JSX } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.01,
    },
  }
};

const generateVariants = (direction: Direction): { hidden: any; visible: any } => {
  const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y';
  const value = direction === 'right' || direction === 'down' ? 100 : -100;

  return {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      [`translate${axis}`]: value,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      [`translate${axis}`]: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };
};

const defaultViewport = { amount: 0.3, margin: '0px 0px 0px 0px' };

const TextAnimation = ({
  as = 'h1',
  text,
  classname = '',
  viewport = defaultViewport,
  variants,
  direction = 'down',
  letterAnime = false,
  lineAnime = false,
  highlightWords = [],
}: {
  text: string;
  classname?: string;
  as?: keyof JSX.IntrinsicElements;
  viewport?: {
    amount?: number;
    margin?: string;
    once?: boolean;
  };
  variants?: {
    hidden?: any;
    visible?: any;
  };
  direction?: Direction;
  letterAnime?: boolean;
  lineAnime?: boolean;
  highlightWords?: string[];
}) => {
  const baseVariants = variants || generateVariants(direction);
  const modifiedVariants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
    },
  };

  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<
    HTMLMotionProps<any>
  >;

  return (
    <MotionComponent
      whileInView='visible'
      initial='hidden'
      variants={containerVariants}
      viewport={viewport}
      className={cn(`inline-block text-foreground uppercase`, classname)}
    >
      {lineAnime ? (
        <motion.span className={`inline-block`} variants={modifiedVariants}>
          {text}
        </motion.span>
      ) : (
        <>
          {text.split(' ').map((word: string, index: number) => {
            const normalizedWord = word.replace(/[^A-Za-z0-9-]+/g, '')
            const isHighlighted = highlightWords.some((term) => term.toLowerCase() === normalizedWord.toLowerCase())
            const wordClass = isHighlighted ? 'text-[#00b4d8]' : ''

            return (
              <motion.span
                key={`${word}-${index}`}
                className={`inline-block ${wordClass}`}
                variants={letterAnime === false ? modifiedVariants : {}}
              >
                {letterAnime ? (
                  <>
                    {word.split('').map((letter: string, letterIndex: number) => (
                      <motion.span
                        key={letterIndex}
                        className={`inline-block ${wordClass}`}
                        variants={modifiedVariants}
                      >
                        {letter}
                      </motion.span>
                    ))}
                    &nbsp;
                  </>
                ) : (
                  <>{word}&nbsp;</>
                )}
              </motion.span>
            )
          })}
        </>
      )}
    </MotionComponent>
  );
};

export default TextAnimation;
