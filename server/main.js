import { Meteor } from "meteor/meteor";
import { PatientsCollection } from "/imports/api/PatientsCollection";

const insertPatient = (data) =>
    PatientsCollection.insert({
        nombres: data.nombres,
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno,
        rut: data.rut,
        codigoPostal: data.codigoPostal,
        region: data.region,
        comuna: data.comuna,
        createdAt: new Date(),
    });

Meteor.startup(async () => {
    if (PatientsCollection.find().count() === 0) {
        [
            {
                nombres: "Laura ",
                apellidoPaterno: "Olmedo",
                apellidoMaterno: "Verdu",
                rut: "20649963-k",
                codigoPostal: 7850000,
                region: "Región Metropolitana de Santiago",
                comuna: "La Reina",
            },
            {
                nombres: "Rodolfo  ",
                apellidoPaterno: "Arce",
                apellidoMaterno: "Galvez",
                rut: "16356304-5",
                codigoPostal: 7750000,
                region: "Región Metropolitana de Santiago",
                comuna: "Ñuñoa",
            },
        ].forEach(insertPatient);
    }
});
