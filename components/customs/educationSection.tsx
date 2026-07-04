import ScrollFloat from '@/components/ScrollFloat';

const educationItems = [
  {
    title: 'B.Tech in Information Technology',
    institution: 'National Institute of Technology, Jalandhar',
    duration: '2024 — Present',
    details: ['8.27 CGPA (till 4th semester)'],
  },
  {
    title: 'Class 12th • Non-Medical',
    institution: 'Mukat Public School, Rajpura, Punjab',
    duration: '2023',
    details: ['92.4%'],
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="min-h-screen w-full bg-transparent text-white flex items-center">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 lg:gap-16   py-20 w-full pr-30 pl-10">

        {/* Header Area */}
        <div className="max-w-4xl ml-1">
          <ScrollFloat
            scrollContainerRef={null}
            containerClassName="max-w-full"
            // Adjusted text size to be smaller and more responsive
            textClassName="font-heading text-6xl md:text-7xl lg:text-[5.5rem] text-[#efefef] tracking-[0.02em]"
            animationDuration={1.2}
            ease="power3.out"
            scrollStart="top 85%"
            scrollEnd="bottom 50%"
            stagger={0.04}
          >
            EDUCATION
          </ScrollFloat>
          <p className="mt-4 text-base md:text-lg text-slate-400 max-w-3xl leading-relaxed">
            A concise look at my academic path
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid gap-6 lg:gap-8 md:grid-cols-2 sm:grid-cols-1">
          {educationItems.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-black/40 backdrop-blur-md p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/10 hover:bg-black/60 flex flex-col"
            >
              {/* Subtle Animated Top Border Glow */}
              <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/50 transition-all duration-700" />

              {/* Vertical Cyan Accent Line */}
              <div className="absolute left-8 top-8 bottom-8 w-1 rounded-full bg-cyan-500/20 group-hover:bg-cyan-400/80 transition-colors duration-500" aria-hidden="true" />

              <div className="relative z-10 ml-8 flex flex-col h-full">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
                  {item.duration}
                </span>

                {/* Replaced 'leading-tight' with 'leading-snug' to fix the squished text */}
                <h3 className="mt-4 text-[1.75rem] md:text-[2rem] lg:text-[2rem] font-heading leading-normal text-[#efefef]">
                  {item.title}
                </h3>

                <p className="mt-3 text-base text-slate-400 font-medium">
                  {item.institution}
                </p>

                {/* Properly styled bullet point section pushed to the bottom */}
                <div className="mt-auto pt-8">
                  <ul className="flex items-center gap-3">
                    <li className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <li className="text-slate-200 text-sm md:text-base font-medium tracking-wide">
                      {item.details[0]}
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}