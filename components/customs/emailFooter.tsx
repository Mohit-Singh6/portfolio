'use client';

import TextAnimation from '@/components/uilayouts/scroll-text';

export default function EmailFooter() {
    return (
        <div className='mx-auto mt-20 mb-[-20]' id='aboutme'>
            <a href='mailto:mohitssr11@gmail.com'>
                <TextAnimation
                    text='mohitssr11@gmail.com'
                    variants={{
                        hidden: { filter: 'blur(5px)', opacity: 0, y: 20 },
                        visible: {
                            filter: 'blur(0px)',
                            opacity: 1,
                            y: 0,
                            transition: { ease: 'linear' },
                        },
                    }}
                    classname='text-[3.2rem] md:text-[3.8rem] xl:text-[1.5rem] leading-[0.98] font-sans text-left text-white max-w-6xl normal-case no-underline hover:underline '
                />
            </a>
        </div>
    )
}