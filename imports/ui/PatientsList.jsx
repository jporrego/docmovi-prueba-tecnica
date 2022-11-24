import React from "react";
import PatientCard from "./PatientCard";
import { PatientsCollection } from "/imports/api/PatientsCollection";
import { useTracker } from "meteor/react-meteor-data";

const PatientsList = () => {
    const patients = useTracker(() => PatientsCollection.find({}).fetch());

    return (
        <div className="flex flex-col gap-2 mx-auto w-full max-w-md min-h-max p-5 rounded-lg bg-slate-50 text-xs sm:text-sm">
            {patients.map((patient) => (
                <PatientCard
                    nombres={patient.nombres}
                    apellidoPaterno={patient.apellidoPaterno}
                    apellidoMaterno={patient.apellidoMaterno}
                    rut={patient.rut}
                    codigoPostal={patient.codigoPostal}
                    region={patient.region}
                    comuna={patient.comuna}
                ></PatientCard>
            ))}
        </div>
    );
};

export default PatientsList;
