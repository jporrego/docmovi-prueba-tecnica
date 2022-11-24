import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import Task from "./Task";
import Form from "./Form";

export const App = () => {
    const tasks = useTracker(() => TasksCollection.find({}).fetch());

    return (
        <div className="flex flex-col gap-6 items-center p-6 bg-sky-600 min-h-screen font-sans">
            <Form></Form>
            <div className=" p-6 bg-slate-200 font-sans h-96">131231</div>
        </div>
    );
};
