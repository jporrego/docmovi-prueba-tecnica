import React from "react";
import { PatientCard } from "./PatientCard";
import { PatientsCollection } from "/imports/api/PatientsCollection";
import { useTracker } from "meteor/react-meteor-data";

export const PatientsList = () => {
    const patients = useTracker(() =>
        PatientsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
    );

    const deletePatient = ({ _id }) => PatientsCollection.remove(_id);

    return (
        <div className="flex flex-col gap-2 mx-auto w-full max-w-7xl min-h-max p-5 rounded-lg bg-slate-50 text-xs sm:text-sm">
            <div className="grid grid-cols-8 gap-5 px-2 rounded-md items-center font-medium">
                <div>Nombres</div>
                <div>Ap. Paterno</div>
                <div>Ap. Materno</div>
                <div>RUT</div>
                <div>Código Postal</div>
                <div>Región</div>
                <div>Comuna</div>
            </div>
            {patients.map((patient) => (
                <PatientCard
                    key={patient._id}
                    patient={patient}
                    onDeleteClick={deletePatient}
                ></PatientCard>
            ))}
        </div>
    );
};
