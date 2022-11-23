import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { regiones } from "./regiones";

const Form = () => {
    const {
        register,
        handleSubmit,
        reset,
        resetField,
        formState: { errors },
    } = useForm();
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

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mx-auto h-fit p-5 rounded-lg bg-slate-50"
        >
            <h1 className=" text-sky-900 text-lg font-semibold mx-auto">
                Registro de paciente
            </h1>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="nombres" className="text-sky-900">
                    Nombres
                </label>
                <input
                    {...register("nombres", { required: true })}
                    className="w-90 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.nombres && (
                    <span className="absolute top-0 right-0 text-red-500">
                        Ingrese un nombre
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="apellidoPaterno" className="text-sky-900">
                    Apellido Paterno
                </label>
                <input
                    {...register("apellidoPaterno", { required: true })}
                    className="w-90 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.apellidoPaterno && (
                    <span className="absolute top-0 right-0 text-red-500">
                        Ingrese un apellido paterno
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="apellidoMaterno" className="text-sky-900">
                    Apellido Materno
                </label>
                <input
                    {...register("apellidoMaterno", { required: true })}
                    className="w-90 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.apellidoMaterno && (
                    <span className="absolute top-0 right-0 text-red-500">
                        Ingrese un apellido materno
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="rut" className="text-sky-900">
                    RUT
                </label>
                <input
                    {...register("rut", { required: true })}
                    className="w-90 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.rut && (
                    <span className="absolute top-0 right-0 text-red-500">
                        Ingrese un RUT valido
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="codigoPostal" className="text-sky-900">
                    Código Postal
                </label>
                <input
                    type="number"
                    {...register("codigoPostal", { required: true })}
                    className="w-90 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.codigoPostal && (
                    <span className="absolute top-0 right-0 text-red-500">
                        Ingrese un código postal
                    </span>
                )}
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
                    className="w-90 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                    autoComplete="new-region"
                >
                    {sortRegiones().map((reg) => (
                        <option value={reg.region} key={reg.region}>
                            {reg.region}
                        </option>
                    ))}
                </select>
                {errors.region && <span>Debe seleccionar una region</span>}
            </div>

            <div className="flex flex-col gap-1 font-medium relative">
                <label htmlFor="comuna" className="text-sky-900">
                    Comuna{" "}
                </label>

                <select
                    {...register("comuna", { required: true })}
                    className="w-90 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500 transition ease-in-out"
                    autoComplete="new-comuna"
                >
                    {sortComunas()}
                </select>
                {errors.comuna && (
                    <span className="absolute top-0 right-0 text-red-500">
                        Debe seleccionar una comuna
                    </span>
                )}
            </div>

            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            <input
                type="submit"
                className="bg-sky-600 w-fit mx-auto px-4 py-1 rounded-md text-sky-50 font-medium hover:bg-sky-500  cursor-pointer transition duration-100"
            />
        </form>
    );
};

export default Form;
