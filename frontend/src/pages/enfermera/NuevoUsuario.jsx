import {z} from "zod";
import {FormModel} from "@/components/FormModel.jsx";
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {createUser} from "@/api/trazabilidad.api.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useFetchSelectOptions} from "@/hooks/useFetchSelectOptions.js";

const schema = z.object({
    rut: z.number().int(),
    name: z.string().min(3, {message: "Debe tener al menos 3 caracteres."}),
    cargo: z
        .string()
        .min(1, {message: "Debe seleccionar un cargo."})
        .transform((val) => parseInt(val, 10)),
    password: z.string().min(5, {message: "Debe tener al menos 8 caracteres."}),
});

export function NuevoUsuario() {
    const { roles } = useFetchSelectOptions(); // Custom hook to fetch select options
    const navigate = useNavigate();
    const fields = [
        {
            name: "rut",
            label: "RUT del empleado",
            placeholder: "Ingrese el RUT del empleado (sin puntos ni guión). No podrá cambiarlo después.",
            type: "number",
        },
        {
            name: "name",
            label: "Nombre del empleado",
            placeholder: "Ingrese el nombre y apellido del empleado (Máximo X carácteres)"
        },
        {
            name: "cargo",
            label: "Cargo del empleado",
            placeholder: "Seleccione el cargo del empleado",
            type: "select",
            // todo Options for the select input, these should ideally come from an API
            options: roles.map(rol => ({
                value: rol.id.toString(),
                label: rol.rol
            }))
        },
        {
            name: "password",
            label: "Contraseña",
            placeholder: "Mínimo 8 carácteres",
            type: "password",
        },
    ];

    const onSubmit = async (data) => {
        const userData = {
            rut: data.rut,
            nombre: data.name,
            rol_id: data.cargo,
            password: data.password,
        };

        console.log("Datos del nuevo usuario:", userData);

        try {
            const response = await createUser(userData);
            console.log("Usuario creado exitosamente:", response);
            toast.success(`Usuario "${userData.nombre}" creado exitosamente`);
            navigate("/usuarios");
        } catch (error) {
            console.error("Error al crear el usuario:", error.response?.data || error);
            toast.error("Error al crear el usuario. Revisa los datos.");
        }
    };

    return (
        <Main>

            <Title>Nuevo Usuario</Title>

            <FormModel
                schema={schema}
                fields={fields}
                onSubmit={onSubmit}
                defaultValues={{
                    cargo: "4", // 4 is the lower rol 'Instrumentista'.
                }}
            />
        </Main>
    );
}