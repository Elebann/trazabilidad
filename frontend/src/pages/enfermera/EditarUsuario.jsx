import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {getUser, updateUser} from "@/api/trazabilidad.api.js";
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {userEditColumns} from "@/features/columns.jsx";
import {DataTable} from "@/components/DataTable.jsx";
import {FormModel} from "@/components/FormModel.jsx";
import {useParams} from "react-router-dom";
import {z} from "zod";
import {useFetchSelectOptions} from "@/hooks/useFetchSelectOptions.js";

export function EditarUsuario() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    // get user "rut" from URL params
    const { rut: userRut } = useParams();
    const { roles} = useFetchSelectOptions();

    useEffect(() => {
        console.log("Ruta del usuario:", userRut);

        if (!userRut) {
            toast.error("ID de usuario no válido.");
            return navigate("/");
        }

        // Function to load user data
        async function loadUser() {
            try {
                const {data} = await getUser(userRut);
                setUser(data);
            } catch {
                toast.error("Error al obtener los datos del usuario.");
                navigate("/");
            }
        }

        loadUser();
    }, []);

    const schema = z.object({
        rol: z
        .string()
        .min(1, {message: "Debe seleccionar un cargo."})
        .transform((val) => parseInt(val, 10)),
        rut: z.number().int(),
        nombre: z.string().min(3, {message: "Debe tener al menos 3 caracteres."}),
    });

    const onSubmit = async (data) => {
        const userData = {
            rut: data.rut,
            nombre: data.nombre,
            rol_id: data.rol,
            // password: data.password,
        };

        console.log(userData)

        try {
            const response = await updateUser(userRut, userData);
            console.log("Usuario creado exitosamente: ", response);
            toast.success(`Usuario "${userData.nombre}" actualizado exitosamente`);
            navigate("/usuarios");
        } catch (error) {
            // todo está pidiendo una contraseña, pero no se está enviando en el formulario: arreglar
            console.error("Error al actualizar el usuario:", error.response?.data || error);
            toast.error("Error al actualizar el usuario. Inténtelo nuevamente");
            navigate("/usuarios");
        }
    };

    const fields = [
        {
            name: "rut",
            label: "RUT del usuario",
            placeholder: "Ingrese el rut del usuario",
            type: "number",
            disabled: true,
            description: "El RUT no se puede modificar una vez creado el usuario.",
        },
        {
            name: "nombre",
            label: "Nombre del usuario",
            placeholder: "Ingrese el nombre del usuario",
            type: "text",
        },
        {
            name: "rol",
            label: "Rol del usuario",
            placeholder: "Seleccione el rol del usuario",
            type: "select",
            options: roles.map(r => ({
                value: r.id.toString(),
                label: r.rol
            })),
        },
        //todo if there is time before the deadline. make the password changeable
        /*{
            name: "password",
            label: "Contraseña",
            placeholder: "Mínimo 8 caracteres (opcional)",
            type: "password",
        },*/
    ];

    return (
        <Main>
            <Title>
                Editando {user?.nombre ? <span>{user.nombre}</span> : "usuario"}
            </Title>

            {user && (
                <>
                    <DataTable data={[user]} columns={userEditColumns}/>

                    <h2 className="text-2xl font-bold my-4">Nuevos Datos</h2>

                    <FormModel
                        key={user.rut}
                        schema={schema}
                        onSubmit={onSubmit}
                        fields={fields}
                        defaultValues={{
                            rut: user.rut,
                            nombre: user.nombre,
                            rol: user.rol?.id?.toString() || "4", // Default to "4" (Instrumentista) if no role is set
                            /*password: "",*/
                        }}
                    />
                </>
            )}
        </Main>
    );
}
