
import TextAnimation from '@/components/uilayouts/scroll-text'

export function IconCloudHeading() {

    return (
        <div className='md:mt-70 mt-40'>
            <div className='text-left'>
                <TextAnimation
                    text="MY SKILLS"
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
                    classname='text-[2.5rem] min-[470px]:text-[4rem] min-[560px]:text-[5rem] min-[800px]:text-[6rem] min-[1000px]:text-[7.9rem] font-heading  leading-[0.95] tracking-tight text-white text-transparent [-webkit-text-stroke:1px_#eeeeee] opacity-20'
                />
            </div>
        </div>
    )
}