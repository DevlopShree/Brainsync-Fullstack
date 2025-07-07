import React, { useRef, useState, useEffect } from "react";

const NoteItem = ({ note }) => {
   const noteRef = useRef(null);
   const [isExpanded, setIsExpanded] = useState(false);
   const [maxHeight, setMaxHeight] = useState("10.5em");
   const [needsExpansion, setNeedsExpansion] = useState(false);

   // 🔁 Toggle expand/collapse state
   const toggleNote = () => {
      setIsExpanded(prev => !prev);
   };

   // 📐 Check if content needs expansion and update maxHeight
   useEffect(() => {
      if (noteRef.current) {
         const element = noteRef.current;
         const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
         const maxLines = 7;
         const maxCollapsedHeight = lineHeight * maxLines;
         
         // Check if content exceeds 7 lines
         const fullHeight = element.scrollHeight;
         setNeedsExpansion(fullHeight > maxCollapsedHeight);

         if (isExpanded) {
            // Expand to full height
            setMaxHeight(`${fullHeight}px`);
         } else {
            // Collapse to default height
            setMaxHeight("10.5em");
         }
      }
   }, [isExpanded, note]);

   // 🎯 Handle keyboard navigation
   const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         toggleNote();
      }
   };

   // Don't make it clickable if expansion isn't needed
   const isClickable = needsExpansion;

   return (
      <div className="relative">
         <p
            ref={noteRef}
            className={`note overflow-hidden p-1 transition-all duration-500 ease-in-out break-words ${
               isClickable ? 'cursor-n-resize hover:bg--50' : 'cursor-default'
            }`}
            onClick={isClickable ? toggleNote : undefined}
            onKeyDown={isClickable ? handleKeyDown : undefined}
            tabIndex={isClickable ? 0 : -1}
            role={isClickable ? "button" : undefined}
            aria-expanded={isClickable ? isExpanded : undefined}
            aria-label={isClickable ? (isExpanded ? "Click to collapse note" : "Click to expand note") : undefined}
            style={{
               maxHeight,
               display: "-webkit-box",
               WebkitLineClamp: isExpanded ? "unset" : "7",
               WebkitBoxOrient: "vertical"
            }}
            title={isClickable ? (isExpanded ? "Click to collapse" : "Click to expand") : undefined}
         >
            {note}
         </p>
         
         {/* 📍 Visual indicator for expandable content */}
         {needsExpansion && (
            <div className="absolute bottom-0 right-0 p-1">
               <span 
                  className="text-xs text-black bg-lime-500  px-1 rounded"
                  aria-hidden="true"
               >
                  {isExpanded ? '↑' : '↓'}
               </span>
            </div>
         )}
         
         
      </div>
   );
};

export default NoteItem;