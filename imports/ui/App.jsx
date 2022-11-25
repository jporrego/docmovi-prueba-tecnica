import React from "react";
import { Form } from "./Form";
import { PatientsList } from "./PatientsList";

export const App = () => {
    return (
        <div className="flex flex-col gap-6 items-center p-6 bg-sky-600 min-h-screen font-sans">
            <Form></Form>
            <PatientsList></PatientsList>
        </div>
    );
};
