import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";

function Todo() {
    const [task, setTask] = useState(() => {
        const saved = localStorage.getItem("reactToDo");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("reactToDo", JSON.stringify(task));
    }, [task]);

    // Logic Functions
    const addTask = (content) => {
        if (!content.trim() || task.some(t => t.content === content)) return;
        setTask([...task, { id: Date.now(), content: content, checked: false }]);
    };

    const toggleCheck = (id) => {
        setTask(task.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
    };

    const deleteTask = (id) => setTask(task.filter(t => t.id !== id));

    return (
        <div className='bg-zinc-900 min-h-screen flex flex-col items-center pt-10 px-4'>
            <h1 className='text-3xl font-bold text-white mb-2'>Task Tracker</h1>
            
            <div className="w-full max-w-md">
                {/* Form Area */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addTask(e.target.todo.value);
                    e.target.reset();
                }} className='flex shadow-lg mb-6'>
                    <input
                        name="todo"
                        type="text"
                        placeholder='Write a Task'
                        className="flex-1 rounded-l-2xl bg-white py-2 px-4 outline-none"
                    />
                    <button className="px-4 py-2 bg-violet-500 text-white rounded-r-2xl hover:bg-violet-600 transition-colors">
                        Add
                    </button>
                </form>

                {/* List Area */}
                <div className='space-y-3'>
                    {task.map(item => (
                        <div key={item.id} className='flex items-center bg-white p-3 rounded-2xl shadow-md'>
                            <span className={`flex-1 px-2 ${item.checked ? "line-through text-gray-400" : "text-black"}`}>
                                {item.content}
                            </span>
                            <div className='flex gap-2'>
                                <button 
                                    onClick={() => toggleCheck(item.id)}
                                    className={`${item.checked ? "text-red-500" : "text-green-600"} p-1`}
                                >
                                    {item.checked ? <RxCrossCircled size={22}/> : <RxCheckCircled size={22} />} 
                                </button>
                                <button 
                                    onClick={() => deleteTask(item.id)}
                                    className='text-red-600 p-1'
                                >
                                    <MdDeleteForever size={22} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {task.length > 0 && (
                    <button 
                        onClick={() => setTask([])}
                        className='w-full mt-10 py-2 rounded-xl bg-red-600 text-white text-sm font-bold'
                    >
                        Clear All
                    </button>
                )}
            </div>
        </div>
    );
}

export default Todo;