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
        <div>
            <div>{nombres}</div>
            <div>{apellidoPaterno}</div>
            <div>{apellidoMaterno}</div>
            <div>{rut}</div>
            <div>{codigoPostal}</div>
            <div>{region}</div>
            <div>{comuna}</div>
        </div>
    );
};

export default PatientCard;
