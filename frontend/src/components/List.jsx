import React, { useContext, useMemo } from 'react';
import ListItem from './ListItem';
import { ContentContext } from '../context/contentContext';

const List = () => {
   const { content, refreshContent, isContent, activeFilter } = useContext(ContentContext);

   console.log(content);
   console.log(isContent);
   console.log('Active filter:', activeFilter);

   // Filter content based on active filter
   const filteredContent = useMemo(() => {
      if (!content || !Array.isArray(content)) return [];
      
      if (activeFilter === 'all') {
         return content;
      }
      
      return content.filter(item => {
         // Handle different filter types
         switch (activeFilter) {
            case 'youTube':
               return item.cType === 'youTube';
            case 'Twitter':
               return item.cType === 'Twitter' || item.cType === 'X';
            case 'Notes':
               return item.cType === 'Notes';
            default:
               return true;
         }
      });
   }, [content, activeFilter]);

   // Loading state
   if (content === null || content === undefined) {
      return (
         <div className="flex items-center justify-center text-gray-500 text-xl p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mr-3"></div>
            Loading content...
         </div>
      );
   }

   // No content state
   if (!isContent || content.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center text-gray-600 text-center p-8 space-y-4">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold">No Content Yet</h2>
            <p className="text-lg text-gray-500 max-w-md">
               Start building your knowledge base by adding your first piece of content.
            </p>
            <button 
               onClick={refreshContent}
               className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
               Refresh Content
            </button>
         </div>
      );
   }

   // No filtered content state
   if (filteredContent.length === 0 && activeFilter !== 'all') {
      const getFilterDisplayName = (filter) => {
         switch (filter) {
            case 'youTube': return 'YouTube videos';
            case 'Twitter': return 'X posts';
            case 'Notes': return 'notes';
            default: return 'items';
         }
      };

      return (
         <div className="flex flex-col items-center justify-center text-gray-600 text-center p-8 space-y-4">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold">No {getFilterDisplayName(activeFilter)} Found</h2>
            <p className="text-lg text-gray-500 max-w-md">
               You don't have any {getFilterDisplayName(activeFilter)} yet. Try adding some or switch to a different filter.
            </p>
            <div className="flex gap-3">
               <button 
                  onClick={refreshContent}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
               >
                  Refresh Content
               </button>
               <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
               >
                  Clear Filter
               </button>
            </div>
         </div>
      );
   }

   // Content display with filtering
   return (
      <div className='list flex w-full md:ml-44 lg:mr-[230px]'>
         {/* Filter indicator */}
         {activeFilter !== 'all' && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-10">
               <i className="fa-solid fa-filter mr-2"></i>
               Showing: {activeFilter === 'youTube' ? 'YouTube Videos' : activeFilter === 'Twitter' ? 'X Posts' : activeFilter}
               <span className="ml-2 bg-white text-orange-500 px-2 py-1 rounded-full text-xs">
                  {filteredContent.length}
               </span>
            </div>
         )}
         
         <div className="relative columns-1 sm:columns-2 xl:columns-3 w-full p-2 gap-2">
            {filteredContent.map((item) => (
               <div key={item._id} className="mb-2 break-inside-avoid-column">
                  <ListItem
                     id={item._id}
                     title={item.title}
                     type={item.cType}
                     link={item.link}
                     note={item.note}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

export default List;