
# TeamSync

"TeamSync" is a cutting-edge project management website designed to streamline your project organization and collaboration needs. Users have the flexibility to create organizations, providing a structured foundation for their projects. Within these organizations, various projects can be initiated, ensuring that each initiative is well-defined and managed. The granular control continues with the ability to create multiple boards within projects, allowing users to compartmentalize tasks and workflows efficiently.

What sets TeamSync apart is its robust team collaboration features. Users can seamlessly add team members to boards, ensuring everyone is on the same page and ready to contribute their expertise. Assigning tasks to specific team members is a breeze, facilitating project progress tracking and accountability. To make team expansion effortless, TeamSync also offers a user-friendly invitation system, allowing you to bring new members into your projects with ease. Experience the power of efficient project management and team synchronization with TeamSync.

# Features

### User-friendly Dashboard: 
- A user-friendly dashboard where project managers can create and manage multiple boards for different projects. Each board serves as a container for tasks related to a specific project.

### Task Assignment: 
- The ability to create and assign tasks within each board to different team members. Project managers can designate task owners and set due dates to ensure accountability.

### Progress Tracking: 
- A visual progress tracking system that allows project managers and team members to monitor the status of tasks and boards at a glance. Progress bars, status labels, and notifications can help in keeping everyone informed.


### Prioritization and Filters: 
- Tools for prioritizing tasks, such as the ability to set task priorities and filter tasks based on various criteria, like due date, priority, or team member. This helps in focusing on critical tasks.

# Tech Stack

**Client:** ReactJs

**Server:** Node, Express

**Database:** MongoDB

**External API Used:** jsonwebtoken


# Run server locally

Clone the project

```bash
  git clone https://github.com/Pratham1504/TeamSync
```

Go to the backend directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


# Environmental Variables

MongoDB Database URL 
```bash
MONGO_URL
```

Secret Key
```bash
SECRET
```

Port
```bash
PORT
```
# Authors

- [@cheekuag](https://github.com/cheekuag)
- [@ptayal76](https://github.com/ptayal76)
- [@Pratham1504](https://github.com/Pratham1504)
- [@RaghavDoda](https://github.com/RaghavDoda)
- [@Perseus29](https://github.com/Perseus29)
# Folder Structure

### Frontend

- src
    - context
        - authContext.js
        - boardContext.js
        - taskContext.js
    - hooks
        - useAuthContext.js
        - useLogin.js
        - useLogout.js
        - useSignup.js
    - Pages
        - Board
            - Board.js
            - Board.css
            - TaskCard.js
        - BoardInProjectPage
            - Boards.js
            - BoardsInProject.css
            - BoardsInProject.js
            - Member.js
        - ERROR
            - Error.js
        - HomePage
            - Home.css
            - Home.js
            - ProjectCard.js
            - Projects.js
            - task.js
            - taskList.js
        - images
            - img1.png
            - img2.png
            - img3.png
        - LandingPage
            - Invites.js
            - Landing.css
            - Landing.js
            - Organisation.js
        - Login
            - Login.js
            - Login.css
        - MyTask
            - Mytask.js
            - Mytask.css
        - OrgDetails
            - MemberCard.js
            - OrgDetails.css
            - OrgDetails.css
        - profile
            - Profile.js
            - ProfilePage.css
            - ProfilePage.js
        - ProjectPage
            - Member.js
            - Project.css
            - Project.js
            - Projects.js
        - Signup
            - Signup.js
            - Signup.css 
        - navBar.js
        - navBar.css
    - App.js
    - index.js
    - index.css

### Backend
- controllers
    - boardController.js
    - commentController.js
    - organisationController.js
    - projectController.js
    - taskController.js
    - userController.js
    - userInviteController.js
- middleware
    - createToken.js
    - requireAuth.js
- models
    - board.js
    - comment.js
    - organisations.js
    - project.js
    - task.js
    - user.js
    - userinvite.js
- routes
    - board.js
    - comment.js
    - organisation.js
    - project.js
    - task.js
    - user.js
    - userinvite.js
