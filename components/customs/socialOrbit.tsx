import OrbitImages from '../OrbitImages';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';

// Pass the icon components wrapped in a small container
const socialIcons = [
  <div key="github" className="flex items-center justify-center w-full h-full bg-[#0a0a0a] rounded-full border border-white/10 hover:border-white transition-colors">
    <FaGithub size={30} color="white" />
  </div>,
  <div key="linkedin" className="flex items-center justify-center w-full h-full bg-[#0a0a0a] rounded-full border border-white/10 hover:border-[#0077b5] transition-colors">
    <FaLinkedin size={30} color="#0077b5" />
  </div>,
  <div key="mail" className="flex items-center justify-center w-full h-full bg-[#0a0a0a] rounded-full border border-white/10 hover:border-[#d44638] transition-colors">
    <Mail size={30} color="#d44638" />
  </div>,
];

export function SocialOrbit() {
  return (
    <div className="flex justify-center items-center h-screen">
      <OrbitImages
        images={socialIcons} // Pass the icons array here
        shape="circle"       // Force a circular path
        radius={150}         // Adjust this for a smaller/larger circle
        duration={25}        // Speed of the rotation
        itemSize={60}        // Size of the individual icon wrappers
        responsive={true}
        direction="normal"
        showPath={false}     // Hides the orbit path line
        paused={false}
      />
    </div>
  );
}