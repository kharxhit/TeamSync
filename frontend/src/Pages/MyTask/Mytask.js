import NavBar from "../navBar";


import React, { useState, useEffect } from 'react';
import TaskList from "../HomePage/taskList";
import ProjectCard from "../HomePage/ProjectCard";
// import { Task } from '@compito/api-interfaces';

const HomePage = () => {
    // const [data, setData] = useState([]);
    // const [title, setTitle] = useState('Tasks');

    // useEffect(() => {
    //     fetch('/api/tasks')
    //         .then(response => response.json())
    //         .then(data => setData(data));
    // }, []);
    const loading = false
    const recentTasks = [
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        },
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        },
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        },
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        },
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        },
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        },
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        }
    ]
    const highPriorityTasks = [
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        },
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        },
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        },
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        },
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        },
        {
            id: 1,
            title: 'taskTitle',
            updatedAt: '8 hours',
            priority: 'high'
        }
    ]
    const projects=[
        {
            id:1,
            name:'projName',
            description:'hello',
            updatedAt:'8 hours',
            boards:['abcd123','dcba321']
            
        },
        {
            id:1,
            name:'projName',
            description:'hello',
            updatedAt:'8 hours',
            boards:['abcd123','dcba321']
            
        },
        {
            id:1,
            name:'projName',
            description:'hello',
            updatedAt:'8 hours',
            boards:['abcd123','dcba321']
            
        },
        {
            id:1,
            name:'projName',
            description:'hello',
            updatedAt:'8 hours',
            boards:['abcd123','dcba321']
            
        },
        {
            id:1,
            name:'projName',
            description:'hello',
            updatedAt:'8 hours',
            boards:['abcd123','dcba321']
            
        },
        {
            id:1,
            name:'projName',
            description:'hello',
            updatedAt:'8 hours',
            boards:['abcd123','dcba321']
            
        },
    ]
    return (
        <div>
            {/* <NavBar /> */}
            <section class="grid mt-10 md:px-8 cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-12">
                <div class="mb-10 md:mb-0">
                    <div style={{ display: "flex", height: "7vh", alignItems: "center", }}>
                        <div style={{ width: "8px", backgroundColor: "blue", marginRight: "8px", borderRadius: "20%" }}>.</div>
                        <h2 class="text-xl font-semibold">Recent Tasks</h2>
                    </div>
                    {loading ? (
                        <div class="flex justify-center items-center">
                            <div class="spinner-border text-primary"></div>
                        </div>
                    ) : (
                        recentTasks.length > 0 ? (
                            <div class="overflow-auto max-h-80 border rounded-md ml-4 list-none">
                                {recentTasks.map((task) => (
                                    <li key={task.id}
                                        class="border-y group bg-white cursor-pointer hover:bg-gray-500 transition-all duration-200"
                                        onClick={() => {
                                            // Navigate to the task details page.
                                        }}
                                    >
                                        <TaskList title={task.title} updatedAt={task.updatedAt} priority={task.priority} />
                                    </li>
                                ))}
                            </div>
                        ) : (
                            <div class="text-center text-gray-600">No recent tasks</div>
                        )
                    )}
                </div>
                <div class="mb-10 md:mb-0">
                    <div style={{ display: "flex", height: "7vh", alignItems: "center", }}>
                        <div style={{ width: "8px", backgroundColor: "blue", marginRight: "8px", borderRadius: "20%" }}>.</div>
                        <h2 class="text-xl font-semibold">Higher Priority Tasks</h2>
                    </div>
                    {loading ? (
                        <div class="flex justify-center items-center">
                            <div class="spinner-border text-primary"></div>
                        </div>
                    ) : (
                        highPriorityTasks.length > 0 ? (
                            <div class="overflow-auto max-h-80 border rounded-md ml-4 list-none">
                                {highPriorityTasks.map((task) => (
                                    <li key={task.id}
                                        class="border-y group bg-white cursor-pointer hover:bg-gray-700 transition-all duration-200"
                                        onClick={() => {
                                            // Navigate to the task details page.
                                        }}
                                    >
                                        <TaskList title={task.title} updatedAt={task.updatedAt} priority={task.priority} />
                                    </li>
                                ))}
                            </div>
                        ) : (
                            <div class="text-center text-gray-600">No higher priority tasks</div>
                        )
                    )}
                </div>
            </section>
            <div style={{ display: "flex", height: "7vh", alignItems: "center", }} class="md:px-8 mt-8">
                <div style={{ width: "8px", backgroundColor: "blue", marginRight: "8px", borderRadius: "20%" }}>.</div>
                <h2 class="text-xl font-semibold">Projects</h2>
            </div>
            <section class="px-4 md:px-8 projects__container">
      {loading ? (
        <div class="flex justify-center items-center">
          <div class="spinner-border text-primary"></div>
        </div>
      ) : (
        projects.length > 0 ? (
          <ul class="overflow-auto flex">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard id={project.id} names={project.name} description={project.description} updatedAt={project.updatedAt} boards={project.boards.length} />
              </li>
            ))}
          </ul>
        ) : (
          <div class="text-center text-gray-600">No projects</div>
        )
      )}
    </section>
        </div>
    );
};

export default HomePage;