import {z} from "zod";
import {FormModel} from "@/components/FormModel.jsx";
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {createUser} from "@/api/trazabilidad.api.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const schema = z.object({
    rut: z.number().int(),
    name: z.string().min(3, {message: "Debe tener al menos 3 caracteres."}),
    cargo: z
        .string()
        .min(1, {message: "Debe seleccionar un cargo."})
        .transform((val) => parseInt(val, 10)),
    password: z.string().min(5, {message: "Debe tener al menos 8 caracteres."}),
});

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
        options: [
          { value: "1", label: "Administrador" },
          { value: "2", label: "Operador" },
          { value: "3", label: "Coordinador" },
          { value: "4", label: "Instrumentista" },
        ],
    },
    {
        name: "password",
        label: "Contraseña",
        placeholder: "Mínimo 8 carácteres",
        type: "password",
    },
];

export function NuevoUsuario() {
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const userData = {
            rut: data.rut,
            nombre: data.name,
            rol: data.cargo,
            password: data.password,
        };

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