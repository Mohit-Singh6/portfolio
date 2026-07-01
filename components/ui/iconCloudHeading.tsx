
import TextAnimation from '@/components/uilayouts/scroll-text'

export function IconCloudHeading() {

    return (
        <div className='mt-70 mb-[-50]'>
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
                    classname='text-[3.5rem] md:text-[12rem] font-heading  leading-[0.95] tracking-tight text-white text-transparent [-webkit-text-stroke:1px_#eeeeee] opacity-20'
                />
            </div>
        </div>
    )
}