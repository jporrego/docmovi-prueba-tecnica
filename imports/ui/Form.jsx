import React from "react";
import { useForm } from "react-hook-form";
import { regiones } from "./regiones";

const Form = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it

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
                <select name="region">
                    {regiones.map((reg) => (
                        <option value={reg.region} key={reg.region}>
                            {reg.region}
                        </option>
                    ))}
                </select>
                {errors.region && <span>Debe ingresar un código postal</span>}
            </div>

            <div className="flex flex-col gap-1 font-medium">
                <label htmlFor="comuna">Comuna </label>
                <select name="comuna">
                    {regiones.map((reg) => (
                        <option value={reg.region} key={reg.region}>
                            {reg.region}
                        </option>
                    ))}
                </select>
                {errors.region && <span>Debe ingresar un código postal</span>}
            </div>

            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" />
        </form>
    );
};

export default Form;
