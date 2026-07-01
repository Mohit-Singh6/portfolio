"use client";

import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  lineCount: number;
  anchorLineIdx: number; 
}

export default function RightSidebarNav() {
  const [isNavHovered, setIsNavHovered] = useState<boolean>(false);
  const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null);
  const [hoveredGlobalLineIdx, setHoveredGlobalLineIdx] = useState<number | null>(null);

  const navItems: NavItem[] = [
    { id: "home", label: "HOME", lineCount: 6, anchorLineIdx: 0 },
    { id: "projects", label: "PROJECTS", lineCount: 6, anchorLineIdx: 0 },
    { id: "skills", label: "SKILLS", lineCount: 6, anchorLineIdx: 0 },
    { id: "education", label: "EDUCATION", lineCount: 6, anchorLineIdx: 0 },
    { id: "contact me", label: "CONTACT ME", lineCount: 6, anchorLineIdx: 0 },
  ];

  let globalLineCounter = 0;
  const deepSeaBlue = "#00b4d8"; 

  const handleNavigation = (id: string) => {
    window.location.hash = `#${id}`;
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-[450px] flex justify-end items-center bg-transparent z-50 pointer-events-none select-none font-sans">
      
      {/* Sidebar Navigation Rail Container */}
      <nav 
        className="h-fit flex flex-col justify-center pr-6 pointer-events-auto gap-1"
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => {
          setIsNavHovered(false);
          setHoveredSectionId(null);
          setHoveredGlobalLineIdx(null);
        }}
      >
        {navItems.map((item) => {
          const isThisSectionHovered = hoveredSectionId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              onMouseEnter={() => setHoveredSectionId(item.id)}
              onMouseLeave={() => setHoveredSectionId(null)}
              className="relative flex flex-col items-end group cursor-pointer w-full"
            >
              
              {/* Outer lines stack wrapper with a strict, continuous gap-1 */}
              <div className="flex flex-col items-end w-full gap-1">
                {Array.from({ length: item.lineCount }).map((_, localIdx) => {
                  const currentGlobalIdx = globalLineCounter++;
                  const isAnchorLine = localIdx === item.anchorLineIdx;
                  
                  let inlineStyle: React.CSSProperties = {};
                  let widthClass = "w-6 bg-zinc-700"; 

                  if (isAnchorLine) {
                    if (isNavHovered) {
                      widthClass = "w-40"; 
                      if (isThisSectionHovered) {
                        inlineStyle = { 
                          backgroundColor: deepSeaBlue, 
                          boxShadow: `0 0 10px ${deepSeaBlue}40` 
                        };
                      } else {
                        inlineStyle = { backgroundColor: "#e4e4e7" }; 
                      }
                    }
                  } else {
                    if (hoveredGlobalLineIdx !== null) {
                      const distance = Math.abs(currentGlobalIdx - hoveredGlobalLineIdx);

                      if (distance === 0) widthClass = "w-22 bg-zinc-300";
                      else if (distance === 1) widthClass = "w-18 bg-zinc-400";
                      else if (distance === 2) widthClass = "w-12 bg-zinc-500";
                      else if (distance === 3) widthClass = "w-8 bg-zinc-500";
                      else if (distance === 4) widthClass = "w-4 bg-zinc-600";
                      else if (distance === 5) widthClass = "w-2 bg-zinc-600";
                    } else if (isNavHovered) {
                      widthClass = "w-2 bg-zinc-600";
                    }
                  }

                  return (
                    // Added "relative" here so the absolute text positions perfectly underneath it
                    <div
                      key={localIdx}
                      className="h-2 w-40 flex items-center justify-end bg-transparent group/row relative"
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setHoveredGlobalLineIdx(currentGlobalIdx);
                      }}
                    >
                      {/* Visual Segment Line */}
                      <div
                        style={inlineStyle}
                        className={`h-[2px] rounded-full transition-all duration-300 ease-out ${widthClass}`}
                      />

                      {/* Text Label - Now completely absolute! It floats without pushing components down */}
                      {isAnchorLine && (
                        <div
                          style={{ width: "192px" }} 
                          className={`absolute left-0 top-3 transition-all duration-300 ease-out pointer-events-none ${
                            isNavHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                          }`}
                        >
                          <span 
                            style={{ color: isThisSectionHovered ? deepSeaBlue : "#a1a1aa" }}
                            className="text-[11px] font-black tracking-[0.25em] text-left uppercase transition-colors duration-300 block"
                          >
                            {item.label}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </nav>
    </div>
  );
}