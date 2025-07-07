import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
   // ------------------ STATE VARIABLES ------------------ //
   const [tasks, setTasks] = useState([]);              // Stores all todo tasks
   const [taskInput, setTaskInput] = useState("");      // Controlled input for new task
   const [refreshTrigger, setRefreshTrigger] = useState(0); // Triggers re-fetch on change
   const [istodo, setIsTodo] = useState(false);         // Flag to check if todos exist

   // ------------------ HANDLE ADD TASK ------------------ //
   const handleSubmit = async (e) => {
      e.preventDefault();

      if (taskInput.trim() === "") return; // Prevent empty tasks

      try {
         const res = await axios.post(
            'http://localhost:3000/api/v1/content/addTodo',
            { title: taskInput },
            {
               headers: {
                  authorization: localStorage.getItem("token"),
               },
            }
         );

         setTaskInput("");                        // Clear input field
         setIsTodo(true);                         // Indicate todo is available
         setRefreshTrigger(prev => prev + 1);     // Trigger re-fetch
      } catch (err) {
         console.error("Error adding task:", err);
      }
   };

   // ------------------ TOGGLE TASK STATUS ------------------ //
   const toggleTask = (index) => {
      const updated = tasks.map((task, i) =>
         i === index ? { ...task, completed: !task.completed } : task
      );
      setTasks(updated);
   };

   // ------------------ DELETE TASK ------------------ //
   const deleteTask = async (id) => {
      try {
         await axios.delete('http://localhost:3000/api/v1/content/deleteTodo', {
            headers: {
               Authorization: localStorage.getItem("token"),
            },
            params: { id },
         });

         setRefreshTrigger(prev => prev + 1); // Trigger re-fetch
      } catch (err) {
         console.error("Error deleting task:", err);
      }
   };

   // ------------------ FETCH TASKS ON LOAD & REFRESH ------------------ //
   useEffect(() => {
      const fetchTodos = async () => {
         try {
            const response = await axios.get(
               'http://localhost:3000/api/v1/content/getTodo',
               {
                  headers: {
                     Authorization: localStorage.getItem("token"),
                  },
               }
            );

            if (response.data.success) {
               setTasks(response.data.data);
               setIsTodo(true);
            } else {
               setIsTodo(false);
            }
         } catch (err) {
            console.error("Error fetching todos:", err);
         }
      };

      fetchTodos();
   }, [refreshTrigger]);

   // ------------------ JSX RETURN ------------------ //
   return (
      <div className="todo md:block fixed z-5 top-0 right-0 bg-zinc-800 text-white shadow-md px-3 pt-13 w-full max-w-[230px] mx-auto h-screen transform translate-x-full transition-transform duration-300 ease-in-out lg:translate-x-0">
         {/* Header GIF */}
         {/* <div className="overflow-hidden h-15">
            <img src="/icon/giphy.gif" alt="header gif" />
         </div> */}

         {/* Title */}
         <h2 className="text-xl font-bold pt-3 mb-4 text-center text-orange-500">
            <i className="fa-solid fa-list-check text-white pr-2"></i>
            To Do List
         </h2>

         {/* Add Task Form */}
         <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-col">
            <input
               type="text"
               className="flex-1 border border-zinc-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="Add a new task..."
               value={taskInput}
               onChange={(e) => setTaskInput(e.target.value)}
            />
            <button
               type="submit"
               className="bg-orange-500 text-white py-1 rounded-md hover:bg-orange-600 active:bg-orange-600 active:scale-96 transition-transform duration-200"
            >
               Add
            </button>
         </form>

         {/* Task List */}
         {istodo ? (
            <ul className="space-y-2 max-h-95 overflow-y-auto hide-scrollbar">
               {tasks.map((task, index) => (
                  <li
                     key={task._id}
                     className={`flex justify-between items-center p-2 border border-zinc-300 rounded-md ${task.completed ? "bg-green-100 line-through" : ""}`}
                  >
                     {/* Toggle Completion */}
                     <span
                        className="cursor-pointer"
                        onClick={() => toggleTask(index)}
                     >
                        {task.title}
                     </span>

                     {/* Delete Task */}
                     <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteTask(task._id)}
                     >
                        <i className="fa-solid fa-trash"></i>
                     </button>
                  </li>
               ))}
            </ul>
         ) : (
            <div className="flex text-white justify-center mt-10 text-sm">
               No todos to show
            </div>
         )}
      </div>
   );
};

export default Todo;
