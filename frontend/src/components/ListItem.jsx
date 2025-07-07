import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { ContentContext } from '../context/contentContext';
import NoteItem from './NoteItem';

const ListItem = ({ title, type, link, note, id }) => {
   const { refreshContent } = useContext(ContentContext);

   // 🔴 DELETE content by ID and refresh the list
   const deleteContent = async (id) => {
      try {
         await axios.delete('http://localhost:3000/api/v1/content/deleteContent', {
            headers: {
               Authorization: localStorage.getItem("token")
            },
            params: { id }
         });
         refreshContent();
      } catch (error) {
         console.error("Error deleting content:", error);
      }
   };

   // 🎞️ Convert YouTube URL to embeddable format
   const convertToEmbedUrl = (url) => {
      if (!url) return "";
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/);
      return match ? `https://www.youtube.com/embed/${match[1]}` : "";
   };

   // 🎨 Get icon based on content type
   const getTypeIcon = (type) => {
      switch (type) {
         case "youTube":
            return <i className="fa-brands fa-youtube text-red-600 mr-2 text-xl"></i>;
         case "Twitter":
            return <i className="fa-brands fa-x-twitter text-zinc-800 bg-white rounded-full p-0.5 mr-2"></i>;
         case "Notes":
            return <i className="fa-solid fa-note-sticky text-lime-600 mr-2"></i>;
         default:
            return <i className="fa-solid fa-link text-gray-600 mr-2"></i>;
      }
   };

   // 🟫 Dynamic border color based on content type
   const getBorderColor = (type) => {
      switch (type) {
         case "youTube":
            return "border-red-600";
         case "Twitter":
         case "X":
            return "border-black";
         case "Notes":
            return "border-lime-600";
         default:
            return "border-gray-600";
      }
   };

   // 🔁 Reload Twitter embed script on link change
   useEffect(() => {
      if (window.twttr && window.twttr.widgets) {
         window.twttr.widgets.load();
      }
   }, [link]);

   return (
      <div className={`bg-zinc-800 rounded-xl w-full text-white border-b-4 ${getBorderColor(type)} p-2 h-fit`}>
         {/* 🔖 Title with Icon & Delete */}
         <h2 className="text-lg font-bold flex items-center mb-2 pb-1 border-b border-zinc-700">
            {getTypeIcon(type)}
            {title}
            <i
               onClick={() => deleteContent(id)}
               className="fa-solid fa-trash text-red-400 hover:text-red-500 active:text-red-600 ml-auto cursor-pointer"
               title="Delete"
            ></i>
         </h2>

         {/* ▶️ YouTube Embed */}
         {type === 'youTube' && (
            <div className="aspect-video mb-2">
               <iframe
                  className="w-full h-full rounded-xl"
                  src={convertToEmbedUrl(link)}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
               ></iframe>
            </div>
         )}

         {/* 🐦 Twitter Embed */}
         {type === 'Twitter' && (
            <div className="aspect-video mb-2">
               <blockquote className="twitter-tweet w-full h-full rounded-xl">
                  <a href={link.replace("x.com", "twitter.com")}></a>
               </blockquote>
            </div>
         )}

         {/* 📝 Note Display */}
         {type === 'Notes' && <NoteItem type="Notes" note={note} />}
      </div>
   );
};

export default ListItem;
