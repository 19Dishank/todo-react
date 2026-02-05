import React, { useEffect, useState } from 'react';

function DateAndTime(props) {
    const [dateTime, setDateTime] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedDate = now.toLocaleDateString();
            const formattedTime = now.toLocaleTimeString();

            setDateTime(`${formattedDate} - ${formattedTime}`)

        }, 0);

        return () => clearInterval(interval)

    }, [])
    return (
        <span className='text-neutral-100/50 min-h-6'>{dateTime}</span>
    );
}
export default DateAndTime;


