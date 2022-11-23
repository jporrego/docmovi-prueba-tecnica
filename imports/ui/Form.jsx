import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { regiones } from "./regiones";

const Form = () => {
    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

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
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mx-auto h-fit p-5 rounded-lg bg-slate-50"
        >
            <div className="flex flex-col gap-1 font-medium">
                <label htmlFor="nombres">Nombres</label>
                <input
                    {...register("nombres", { required: true })}
                    className="w-80 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.nombres && <span>Debe ingresar un nombre</span>}
            </div>

            <div className="flex flex-col gap-1 font-medium">
                <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                <input
                    {...register("apellidoPaterno", { required: true })}
                    className="w-80 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.apellidoPaterno && (
                    <span>Debe ingresar un apellido paterno</span>
                )}
            </div>

            <div className="flex flex-col gap-1 font-medium">
                <label htmlFor="apellidoMaterno">Apellido Materno</label>
                <input
                    {...register("apellidoMaterno", { required: false })}
                    className="w-80 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.apellidoMaterno && (
                    <span>Debe ingresar un apellido materno</span>
                )}
            </div>

            <div className="flex flex-col gap-1 font-medium">
                <label htmlFor="rut">RUT</label>
                <input
                    {...register("rut", { required: true })}
                    className="w-80 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.rut && <span>Debe ingresar un RUT valido</span>}
            </div>

            <div className="flex flex-col gap-1 font-medium">
                <label htmlFor="codigoPostal">Código Postal</label>
                <input
                    type="number"
                    {...register("codigoPostal", { required: true })}
                    className="w-80 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
                />
                {errors.codigoPostal && (
                    <span>Debe ingresar un código postal</span>
                )}
            </div>

            <div className="flex flex-col gap-1 font-medium">
                <label htmlFor="region">Región </label>
                <select
                    {...register("region")}
                    value={region}
                    onChange={(e) => {
                        resetField("comuna");
                        return setRegion(e.target.value);
                    }}
                >
                    {sortRegiones().map((reg) => (
                        <option value={reg.region} key={reg.region}>
                            {reg.region}
                        </option>
                    ))}
                </select>
                {errors.region && <span>Debe seleccionar una region</span>}
            </div>

            <div className="flex flex-col gap-1 font-medium">
                <label htmlFor="comuna">Comuna </label>

                <select {...register("comuna", { required: true })}>
                    {sortComunas()}
                </select>
                {errors.comuna && <span>Debe seleccionar una comuna</span>}
            </div>

            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" />
        </form>
    );
};

export default Form;
