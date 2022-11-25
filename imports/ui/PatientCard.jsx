import React from "react";
import { formatRut } from "rutlib";

export const PatientCard = ({ patient, onDeleteClick }) => {
    return (
        <div className="grid grid-cols-8 gap-5 bg-slate-200 px-2 py-2 rounded-md h-fit">
            <div className="flex items-center">{patient.nombres}</div>
            <div className="flex items-center">{patient.apellidoPaterno}</div>
            <div className="flex items-center">{patient.apellidoMaterno}</div>
            <div className="flex items-center ">
                {formatRut(patient.rut, false)}
            </div>
            <div className="flex items-center">{patient.codigoPostal}</div>
            <div className="flex items-center">{patient.region}</div>
            <div className="flex items-center">{patient.comuna}</div>
            <button
                className="flex items-center justify-end w-fit h-fit m-auto px-2 rounded-md font-medium text-xs text-slate-500 hover:text-black underline"
                onClick={() => onDeleteClick(patient)}
            >
                Eliminar
            </button>
        </div>
    );
};
