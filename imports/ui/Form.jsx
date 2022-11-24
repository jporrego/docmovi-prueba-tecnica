import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { regiones } from "./regiones";
import { validateRut } from "rutlib";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { PatientsCollection } from "/imports/api/PatientsCollection";
import { useTracker } from "meteor/react-meteor-data";

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

const Form = () => {
    const {
        register,
        handleSubmit,
        reset,
        resetField,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data), reset();
    };

    const [region, setRegion] = useState("Arica y Parinacota");

    const sortRegiones = () => {
        let sortedReg = regiones.sort((a, b) =>
            a.region.localeCompare(b.region)
        );

        return sortedReg;
    };

    const sortComunas = () => {
        let comunas = regiones.find((reg) => reg.region === region).comunas;
        comunas.sort((a, b) => a.localeCompare(b));

        return comunas.map((comuna) => (
            <option value={comuna} key={comuna}>
                {comuna}
            </option>
        ));
    };

    const errorMsg = (msg) => (
        <span className="absolute top-0 right-0 text-red-500 bg-slate-50 px-2 rounded-sm shadow">
            {msg}
        </span>
    );

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mx-auto w-full max-w-md h-fit p-5 rounded-lg bg-slate-50 text-xs sm:text-sm"
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

            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            <input
                type="submit"
                className="col-span-3 bg-sky-500 w-fit mx-auto px-4 py-1 rounded-md text-sky-50 font-medium hover:bg-sky-500  cursor-pointer transition duration-100"
            />
        </form>
    );
};

export default Form;
