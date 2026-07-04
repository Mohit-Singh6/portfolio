'use client';
import TextAnimation from '@/components/uilayouts/scroll-text';
import React from 'react';

function AboutSection() {
    return (
        <section className='min-h-screen w-full bg-transparent text-white'>
            <div className='mx-auto flex max-w-[1400px] flex-col gap-16 pl-[5rem] pr-[8rem] py-20'>
                <div className='max-w-6xl mt-50' id='aboutme'>
                    <TextAnimation
                        text='I believe in engineering systems that prioritize flawless architecture over superficial design, turning complex algorithmic logic into highly reliable, automated solutions.'
                        variants={{
                            hidden: { filter: 'blur(5px)', opacity: 0, y: 20 },
                            visible: {
                                filter: 'blur(0px)',
                                opacity: 1,
                                y: 0,
                                transition: { ease: 'linear' },
                            },
                        }}
                        classname='text-[3.2rem] md:text-[3.8rem] xl:text-[3rem] leading-[0.98] text-left text-white max-w-6xl normal-case'
                    />
                </div>

                <div className='border-b border-white/10 pb-8'>
                    <span className='text-sm uppercase tracking-[0.3em] text-slate-400'>This is me.</span>
                </div>

                <div className='grid gap-10 lg:grid-cols-[minmax(18rem,45%)_minmax(28rem,1fr)] items-start'>
                    <div className='text-left'>
                        <TextAnimation
                            text="MAKING COMPUTERS DO THINGS."
                            direction='right'
                            highlightWords={['COMPUTERS']}
                            variants={{
                                hidden: { filter: 'blur(5px)', opacity: 0, y: 20 },
                                visible: {
                                    filter: 'blur(0px)',
                                    opacity: 1,
                                    y: 0,
                                    transition: { ease: 'linear' },
                                },
                            }}
                            classname='text-[3.5rem] md:text-[4.2rem] font-bold leading-[0.95] tracking-tight text-white'
                        />
                    </div>

                    <div className='space-y-6 text-left'>
                        <TextAnimation
                            text="I’m an Information Technology undergrad at NIT Jalandhar who builds resilient, scalable web apps. I prioritize functional, clean code over visual flair, using a problem-solving mindset to tackle complex algorithmic challenges. I build tools born from necessity—if it can be optimized, I want to build the logic behind it."
                            direction='right'
                            highlightWords={['Full-Stack', 'Developer', 'Information', 'Technology', 'NIT', 'Jalandhar']}

                            classname='text-xl md:text-2xl font-medium leading-8 text-slate-300 normal-case'
                        />
                        <TextAnimation
                            text="When I'm not in my IDE, you'll find me scrambling in my sketchbook or being lost in a good book."
                            direction='right'
                            highlightWords={[]}

                            classname='text-lg md:text-xl font-light leading-8 text-slate-400 normal-case'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
