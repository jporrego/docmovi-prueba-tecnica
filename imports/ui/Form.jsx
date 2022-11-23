import React from "react";
import { useForm } from "react-hook-form";

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
            <input
                defaultValue="nombre"
                {...register("nombres", { required: true })}
                className="w-80 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
            />
            <input
                defaultValue="test"
                {...register("apellidoPaterno", { required: true })}
                className="w-80 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
            />
            <input
                defaultValue="test"
                {...register("apellidoMaterno", { required: true })}
                className="w-80 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
            />
            <input
                defaultValue="test"
                {...register("rut", { required: true })}
                className="w-80 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
            />
            <input
                defaultValue="test"
                {...register("codigoPostal", { required: true })}
                className="w-80 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
            />

            <input
                {...register("exampleRequired", { required: true })}
                className="w-80 px-3 py-1 bg-slate-100 rounded-md outline outline-2 outline-slate-300 hover:outline-sky-500 focus:outline-sky-500"
            />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" />
        </form>
    );
};

export default Form;
