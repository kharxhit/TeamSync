import React, { useState, useEffect } from 'react';
// import { Task } from '@compito/api-interfaces';

const TaskList = (props) => {
    // const [data, setData] = useState([]);
    // const [title, setTitle] = useState('Tasks');

    // useEffect(() => {
    //     fetch('/api/tasks')
    //         .then(response => response.json())
    //         .then(data => setData(data));
    // }, []);

    return (
        <div class="px-2 pt-2">
                        <header>
                            <p class="group-hover:text-blue-500">
                                {props.title}
                            </p>
                        </header>
                        <footer class="flex items-center justify-between text-xs text-gray-400">
                            <p>
                                Updated
                                <span class="text-gray-600">{props.updatedAt}</span>
                            </p>
                            <p>
                                <span class="font-medium text-gray-600">{props.priority}</span>
                                Priority
                            </p>
                        </footer>
        </div>
    );
};

export default TaskList;