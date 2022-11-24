import React from "react";
import PatientCard from "./PatientCard";
import { PatientsCollection } from "/imports/api/PatientsCollection";
import { useTracker } from "meteor/react-meteor-data";

const PatientsList = () => {
    const patients = useTracker(() =>
        PatientsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
    );

    return (
        <div className="flex flex-col gap-2 mx-auto w-full max-w-3xl min-h-max p-5 rounded-lg bg-slate-50 text-xs sm:text-sm">
            <div className="grid grid-cols-7 gap-5 px-2 rounded-md items-center">
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
                    nombres={patient.nombres}
                    apellidoPaterno={patient.apellidoPaterno}
                    apellidoMaterno={patient.apellidoMaterno}
                    rut={patient.rut}
                    codigoPostal={patient.codigoPostal}
                    region={patient.region}
                    comuna={patient.comuna}
                    key={patient.rut}
                ></PatientCard>
            ))}
        </div>
    );
};

export default PatientsList;
