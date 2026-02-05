import { GoCheckCircleFill } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { RxCheckCircled } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";

function ToDoData(props) {
    const handleDelete = (item) => {
        props.setTask(props.task.filter(ele => ele.id !== item.id));
    };

    const handleCheck = (item) => {
        const updatedTask = props.task.map(curr =>
            curr.id === item.id ? { ...curr, checked: !curr.checked } : curr
        );
        props.setTask(updatedTask);
    };
    

    return (
        <div className='pt-4 list-none'>
            {props.task.map(ele => (
                <div key={ele.id} className='flex flex-row bg-white items-center gap-5 px-1 py-1.5 rounded-4xl m-3 min-w-[20rem]'>
                    <li className={`px-4 ${ele.checked ? "line-through" : ""}`}>
                        {ele.content}
                    </li>
                    <div className='flex items-center ml-auto gap-1'>
                        <button className={`${ele.checked ? "bg-red-600" : "bg-green-600"} px-1 py-1 text-white rounded-[100rem]`} onClick={() => handleCheck(ele)}>
                            {ele.checked ? <RxCrossCircled/> : <RxCheckCircled />} 
                        </button>
                        <button className='bg-red-600 px-1 py-1 text-white rounded-[100rem]' onClick={() => handleDelete(ele)}>
                            <MdDeleteForever />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ToDoData;
