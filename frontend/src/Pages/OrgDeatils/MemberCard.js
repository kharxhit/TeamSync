import React, { useState, useEffect } from 'react';
// import { Project } from '@compito/api-interfaces';

const MemberCard = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            className={`p-2 w-80 mr-4 relative rounded-md border group cursor-pointer transition-all hover:shadow-lg duration-200 ease-in border-gray-100 bg-white shadow-sm hover:border-gray-200
        ${isHovered ? 'border-blue-500' : ''}`}
            onClick={() => {
                window.location.href = `/app/projects/${props.id}`;
            }}
        >
            <header class="flex items-center justify-between">
                <div>
                    <p class="text-md font-medium group-hover:text-primary">
                        {props.names}
                    </p>
                    <p class="text-gray-400 text-sm line-clamp-1">{props.description}</p>
                </div>
            </header>
            <footer class="flex items-center justify-between text-xs text-gray-400">
                <div>
                    <p>
                        Updated
                        <span class="font-medium text-gray-600">{props.updatedAt}</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span class="font-medium text-gray-600">{props.boards}</span> Boards
                    </p>
                </div>
            </footer>
        </article>
    );
};

export default MemberCard;
