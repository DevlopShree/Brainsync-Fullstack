import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isContent, setIsContent] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get('http://localhost:3000/api/v1/content/getContent', {
          headers: {
            "Authorization": token
          }
        });

        console.log(response);
        
        if (response.data.success) {
          setContent(response.data.response);
          setIsContent(true);
        } else {
          setIsContent(false);
          setError(response.data.message || "Failed to fetch content");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setError(error.response?.data?.message || error.message || "Failed to fetch content");
        setIsContent(false);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
    console.log("Content side Effects");
  }, [refreshTrigger]);

  const refreshContent = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const clearError = () => {
    setError(null);
  };

  // Add content function
  const addContent = async (newContent) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post('http://localhost:3000/api/v1/content/addContent', newContent, {
        headers: {
          "Authorization": token
        }
      });

      if (response.data.success) {
        setContent(prevContent => [...prevContent, response.data.response]);
        setIsContent(true);
        return response.data.response;
      } else {
        throw new Error(response.data.message || "Failed to add content");
      }
    } catch (error) {
      console.error("Error adding content:", error);
      setError(error.response?.data?.message || error.message || "Failed to add content");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete content function
  const deleteContent = async (contentId) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.delete(`http://localhost:3000/api/v1/content/deleteContent/${contentId}`, {
        headers: {
          "Authorization": token
        }
      });

      if (response.data.success) {
        setContent(prevContent => prevContent.filter(item => item._id !== contentId));
        if (content.length <= 1) {
          setIsContent(false);
        }
        return true;
      } else {
        throw new Error(response.data.message || "Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      setError(error.response?.data?.message || error.message || "Failed to delete content");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update content function
  const updateContent = async (contentId, updatedContent) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.put(`http://localhost:3000/api/v1/content/updateContent/${contentId}`, updatedContent, {
        headers: {
          "Authorization": token
        }
      });

      if (response.data.success) {
        setContent(prevContent => 
          prevContent.map(item => item._id === contentId ? response.data.response : item)
        );
        return response.data.response;
      } else {
        throw new Error(response.data.message || "Failed to update content");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      setError(error.response?.data?.message || error.message || "Failed to update content");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      refreshContent, 
      isContent,
      activeFilter,
      setActiveFilter,
      loading,
      error,
      clearError,
      addContent,
      deleteContent,
      updateContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};