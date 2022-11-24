import React from "react";
import { PatientsCollection } from "/imports/api/PatientsCollection";
import { useTracker } from "meteor/react-meteor-data";

const PatientsList = () => {
    const patients = useTracker(() => PatientsCollection.find({}).fetch());

    return (
        <div className="flex flex-col gap-2 mx-auto w-full max-w-md min-h-max p-5 rounded-lg bg-slate-50 text-xs sm:text-sm">
            {patients.map((patient) => (
                <div key={patient.rut}>{patient.nombres}</div>
            ))}
        </div>
    );
};

export default PatientsList;
