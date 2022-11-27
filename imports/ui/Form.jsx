import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { regiones } from "./regiones";
import { validateRut } from "rutlib";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatRut } from "rutlib";

import { PatientsCollection } from "/imports/api/PatientsCollection";

/** Yup used as a second layer of validation, and to implement RUT validation with RUTlib. */
const schema = yup
    .object({
        nombres: yup.string().required(),
        apellidoPaterno: yup.string().required(),
        apellidoMaterno: yup.string().required(),
        rut: yup
            .string()
            .required()
            .test((rut) => validateRut(rut)),
        codigoPostal: yup.number().required(),
        region: yup.string().required(),
        comuna: yup.string().required(),
    })
    .required();

/**
 * Patient registration form. Takes inputs, validates them and the handles the data submission.
 */

export const Form = () => {
    const {
        register,
        handleSubmit,
        reset,
        resetField,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    /* States used to display warning and success messages. */
    const [warningMsg, setWarningMsg] = useState("");
    const [sucessMsg, setSuccessMsg] = useState("");

    /* Region state used for getting the corresponding Comunas. */
    const [region, setRegion] = useState("Arica y Parinacota");

    /* Sorts Regiones alphabetically */
    const sortRegiones = () => {
        let sortedReg = regiones.sort((a, b) =>
            a.region.localeCompare(b.region)
        );

        return sortedReg;
    };

    /* 
    Finds the comunas that match the selected region, sorts them 
    and then returns an option element for each one.
    */
    const sortComunas = () => {
        let comunas = regiones.find((reg) => reg.region === region).comunas;
        comunas.sort((a, b) => a.localeCompare(b));

        return comunas.map((comuna) => (
            <option value={comuna} key={comuna}>
                {comuna}
            </option>
        ));
    };

    /* Error message element */
    const errorMsg = (msg) => (
        <span className="absolute top-0 right-0 text-red-500 bg-slate-50 px-2 rounded-sm shadow">
            {msg}
        </span>
    );

    /* sets warning message and a timeout to clean it up after x seconds */
    const showWarning = (msg) => {
        setWarningMsg(msg);
        setTimeout(() => setWarningMsg(""), 3000);
    };

    /* sets success message and a timeout to clean it up after x seconds */
    const showSuccess = (msg) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    /*
     * Sets data.createdAt date and formats data.rut
     * If theres a patient with that rut, call showWarning
     * Else inserts the new patient, shows success message and resets the form.
     */
    const onSubmit = (data) => {
        data.createdAt = new Date();
        data.rut = formatRut(data.rut, false);

        const existingPatient = PatientsCollection.findOne({ rut: data.rut });
        if (existingPatient === undefined) {
            PatientsCollection.insert(data);
            showSuccess("Paciente registrado");
            reset();
        } else {
            showWarning("Ya existe un paciente con ese RUT");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mx-auto w-full max-w-md h-fit p-5 rounded-lg bg-slate-50 text-xs sm:text-sm relative"
        >
            <h1 className="col-span-3 text-sky-900 text-md sm:text-lg font-semibold mx-auto">
                Registro de paciente
            </h1>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="nombres" className="text-sky-900">
                    Nombres
                </label>
                <input
                    {...register("nombres", { required: true })}
                    className="w-full px-3 py-1 bg-slate-100 rounded-md outline outline-1 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.nombres && errorMsg("Ingrese un nombre")}
            </div>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="apellidoPaterno" className="text-sky-900">
                    Apellido Paterno
                </label>
                <input
                    {...register("apellidoPaterno", { required: true })}
                    className="w-full px-3 py-1 bg-slate-100 rounded-md outline outline-1 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.apellidoPaterno &&
                    errorMsg("Ingrese un apellido paterno")}
            </div>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="apellidoMaterno" className="text-sky-900">
                    Apellido Materno
                </label>
                <input
                    {...register("apellidoMaterno", { required: true })}
                    className="w-full px-3 py-1 bg-slate-100 rounded-md outline outline-1 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.apellidoMaterno &&
                    errorMsg("Ingrese un apellido materno")}
            </div>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="rut" className="text-sky-900">
                    RUT
                </label>
                <input
                    {...register("rut", { required: true })}
                    className="w-full px-3 py-1 bg-slate-100 rounded-md outline outline-1 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.rut && errorMsg("Ingrese un RUT valido")}
                <div className="absolute top-0 right-0 text-red-500 bg-slate-50 px-2 rounded-sm shadow">
                    {warningMsg}
                </div>
            </div>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="codigoPostal" className="text-sky-900">
                    Código Postal
                </label>
                <input
                    type="number"
                    {...register("codigoPostal", { required: true })}
                    className="w-full px-3 py-1 bg-slate-100 rounded-md outline outline-1 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.codigoPostal && errorMsg("Ingrese un código postal")}
            </div>

            <div className="flex flex-col gap-1 font-medium">
                <label htmlFor="region" className="text-sky-900">
                    Región{" "}
                </label>
                <select
                    {...register("region")}
                    value={region}
                    onChange={(e) => {
                        resetField("comuna");
                        return setRegion(e.target.value);
                    }}
                    className="w-full px-3 py-1 bg-slate-100 rounded-md outline outline-1 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                    autoComplete="new-region"
                >
                    {sortRegiones().map((reg) => (
                        <option value={reg.region} key={reg.region}>
                            {reg.region}
                        </option>
                    ))}
                </select>
                {errors.region && errorMsg("Debe seleccionar una region")}
            </div>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="comuna" className="text-sky-900">
                    Comuna{" "}
                </label>

                <select
                    {...register("comuna", { required: true })}
                    className="w-full px-3 py-1 bg-slate-100 rounded-md outline outline-1 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500 transition ease-in-out"
                    autoComplete="new-comuna"
                >
                    {sortComunas()}
                </select>
                {errors.comuna && errorMsg("Debe seleccionar una comuna")}
            </div>

            <input
                value="Registar"
                type="submit"
                className="col-span-3 bg-sky-500 w-fit mx-auto px-4 py-1 rounded-md text-sky-50 font-medium hover:bg-blue-500  cursor-pointer transition duration-100 mb-3 mt-2"
            />
            <span className="absolute bottom-2 left-5 text-sky-500 bg-slate-50 px-2 font-medium">
                {sucessMsg}
            </span>
        </form>
    );
};
