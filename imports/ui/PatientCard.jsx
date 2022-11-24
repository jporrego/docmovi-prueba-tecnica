import React from "react";

const PatientCard = ({
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    rut,
    codigoPostal,
    region,
    comuna,
}) => {
    return (
        <div className="grid grid-cols-7 gap-5 bg-slate-200 px-2 py-2 rounded-md h-fit">
            <div className="flex items-center">{nombres}</div>
            <div className="flex items-center">{apellidoPaterno}</div>
            <div className="flex items-center">{apellidoMaterno}</div>
            <div className="flex items-center whitespace-nowrap">{rut}</div>
            <div className="flex items-center">{codigoPostal}</div>
            <div className="flex items-center">{region}</div>
            <div className="flex items-center">{comuna}</div>
        </div>
    );
};

export default PatientCard;
