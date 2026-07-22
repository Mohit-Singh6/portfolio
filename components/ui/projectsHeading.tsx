
import TextAnimation from '@/components/uilayouts/scroll-text'

export function ProjectsHeading() {

    return (
        <div className='lg:mt-70 md:mt-55 mt-60 sm:mb-[-30] mb-[-60]' id='projects'>
            <div className='text-left'>
                <TextAnimation
                    text="MY PROJECTS"
                    direction='right'
                    variants={{
                        hidden: { filter: 'blur(5px)', opacity: 0, y: 20 },
                        visible: {
                            filter: 'blur(0px)',
                            opacity: 1,
                            y: 0,
                            transition: { ease: 'linear' },
                        },
                    }}
                    classname='text-[2rem] min-[500px]:text-[3rem] min-[580px]:text-[3.5rem] min-[900px]:text-[4.5rem] min-[1000px]:text-[5.5rem] min-[1300px]:text-[7.9rem] font-heading  leading-[0.95] tracking-tight text-white text-transparent [-webkit-text-stroke:1px_#eeeeee] opacity-20'
                />
            </div>
        </div>
    )
}