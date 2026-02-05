import React, { useState } from 'react';

function Form(props) {
    const reactToDo = "reactToDo"
    const [inputValue, setInputValue] = useState(()=>{
        const tododata = localStorage.getItem(reactToDo);
        if(!tododata) return [];
        return JSON.parse(tododata);
    });
    const handleInputChange = (value) => {
        setInputValue({ id: value, content: value, checked: false });
    };

    const handleFromSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.content) return;

        const exists = props.task.some(t => t.content === inputValue.content);
        if (exists) {
            setInputValue({ id: "", content: "", checked: false });
            return;
        }

        props.setTask(prev => [...prev, inputValue]);
        setInputValue({ id: "", content: "", checked: false });
    };

    const handleClearAll = () => {
        props.setTask([]);
        setInputValue({ id: "", content: "", checked: false });
    };

        localStorage.setItem(reactToDo, JSON.stringify(props.task));
    

    return (
        <div>
            <form className='p-2' onSubmit={handleFromSubmit}>
                <input
                    type="text"
                    placeholder='Write a Task'
                    className="focus:outline-none rounded-l-2xl shadow-lg bg-slate-50 py-2 px-4"
                    value={inputValue.content}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
                <button className="px-4 py-2 bg-violet-400 rounded-r-2xl hover:bg-violet-500">
                    Add to list
                </button>
            </form>
            <div className="flex justify-center mt-2">
                <button className='px-4 py-2 rounded-[10px] bg-red-600 text-sm text-white' onClick={handleClearAll}>
                    Clear All
                </button>
            </div>
        </div>
    );
}

export default Form;
