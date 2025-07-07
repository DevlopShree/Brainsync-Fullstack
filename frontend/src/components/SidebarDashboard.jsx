import React, { useState, useContext } from 'react'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ContentContext } from '../context/contentContext';
import BtnBrain from './BtnBrain'
import BtnList from './BtnList'
import { Link } from 'react-router-dom';
import AddItemModal from './AddItemModal';
import Sharebrain from './Sharebrain';
import Viewbrain from './Viewbrain';
import BrainBtnGroup from './BrainBtnGroup';

const SidebarDashboard = () => {

   const [showModal, setShowModal] = useState(false);
   const [share, setShare] = useState(false);
   const [view, setView] = useState(false);

   const { user, logout } = useAuth();
   const { activeFilter, setActiveFilter } = useContext(ContentContext);
   const navigate = useNavigate();

   const handleLogout = () => {
      logout();
      navigate("/");
   };

   // Filter handlers
   const handleFilterChange = (filterType) => {
      setActiveFilter(filterType);
   };

   // Get button style based on active filter
   const getButtonStyle = (filterType) => {
      const baseStyle = "py-2 rounded-md w-[95%] mb-2 transition-all duration-200";
      const activeStyle = "bg-orange-500 hover:bg-orange-600 text-white";
      const inactiveStyle = "bg-zinc-700 hover:bg-zinc-600 text-gray-300";
      
      return `${baseStyle} ${activeFilter === filterType ? activeStyle : inactiveStyle}`;
   };

   return (
      <>
         <div className="sidebar fixed md:flex flex-col z-15 top-0 left-0 h-screen items-center md:w-44 w-55 bg-zinc-800 text-white transform -translate-x-full transition-transform duration-300 ease-in-out md:translate-x-0">
            <div className='flex flex-col mx-auto w-11/12'>
               <nav className='flex flex-col w-full'>

                  {/* Logo */}
                  <Link to="/" className="text-[1.5rem] rounded-md text-center md:text-3xl my-3.5 font-semibold text-white">
                     BrainSync
                  </Link>

                  <div className=''>
                     <BrainBtnGroup
                        className="flex flex-col items-center w-full sm:hidden"
                        onAdd={() => setShowModal(true)}
                        onShare={() => setShare(true)}
                        onView={() => setView(true)}
                     />
                  </div>

                  <div className='flex flex-col items-center'>
                     {/* Filter Buttons */}
                     <button
                        onClick={() => handleFilterChange('all')}
                        className={getButtonStyle('all')}
                     >
                        <i className="fa-solid fa-list mr-2"></i>
                        All Links
                     </button>

                     <button
                        onClick={() => handleFilterChange('youTube')}
                        className={getButtonStyle('youTube')}
                     >
                        <i className="fa-brands fa-youtube mr-2"></i>
                        YouTube Links
                     </button>

                     <button
                        onClick={() => handleFilterChange('Twitter')}
                        className={getButtonStyle('Twitter')}
                     >
                        <i className="fa-brands fa-x-twitter mr-2"></i>
                        X Links
                     </button>

                     <button
                        onClick={() => handleFilterChange('Notes')}
                        className={getButtonStyle('Notes')}
                     >
                        <i className="fa-solid fa-note-sticky mr-2"></i>
                        Notes
                     </button>

                     <button
                        className="py-2 rounded-md w-[95%] mb-2 bg-zinc-700 hover:bg-zinc-600 text-gray-300 lg:hidden"
                        onClick={() => {
                           document.querySelector(".todo")?.classList.toggle("translate-x-full");
                        }}
                     >
                        <i className="fa-solid fa-check-to-slot mr-2"></i>
                        To Do List
                     </button>

                     {/* Active Filter Indicator */}
                     {activeFilter !== 'all' && (
                        <div className="mt-2 mb-4 text-xs text-orange-400 text-center">
                           <i className="fa-solid fa-filter mr-1"></i>
                           Showing: {activeFilter === 'youTube' ? 'YouTube' : activeFilter === 'Twitter' ? 'X Posts' : activeFilter}
                        </div>
                     )}

                     <button
                        onClick={handleLogout}
                        className="mt-10 bg-rose-700 py-3 rounded-md w-[95%] active:bg-zinc-300 hover:bg-rose-600 hover:ring-2"
                     >
                        <i className="fa-solid fa-sign-out-alt mr-2"></i>
                        Logout
                     </button>
                  </div>
               </nav>
            </div>
         </div>
         {showModal && <AddItemModal closeModal={() => setShowModal(false)} />}
         {share && <Sharebrain onClose={() => setShare(false)} />}
         {view && <Viewbrain onClose={() => setView(false)} />}
      </>
   )
}

export default SidebarDashboard