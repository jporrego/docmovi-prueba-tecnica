import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import Task from "./Task";
import Form from "./Form";

export const App = () => {
    const tasks = useTracker(() => TasksCollection.find({}).fetch());

    return (
        <div className="flex items-center p-6 bg-sky-600 h-screen font-sans">
            {/* <ul>
          { tasks.map(task => <Task key={ task._id } task={ task }/>) }
        </ul> */}
            <Form></Form>
        </div>
    );
};
