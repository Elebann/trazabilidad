import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {getUser} from "@/api/trazabilidad.api.js";
import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import {userEditColumns} from "@/features/columns.jsx";
import {DataTable} from "@/components/DataTable.jsx";
import {FormModel} from "@/components/FormModel.jsx";

export function EditarUsuario() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userRut = window.location.pathname.split("/").pop();
        if (!userRut) {
            toast.error("ID de usuario no válido.");
            return navigate("/");
        }

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

    const onSubmit = async (data) => {
        const userData = {
            rut: data.rut,
            nombre: data.nombre,
            rol: data.rol,
            password: data.password,
        };

        console.log(userData)

        // todo PUT the form on the database
    };

    const fields = [
        {
            name: "rut",
            label: "RUT del usuario",
            placeholder: "Ingrese el rut del usuario",
            type: "text",
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
            options: [
                {value: "1", label: "Administrador"},
                {value: "2", label: "Operador"},
                {value: "3", label: "Coordinador"},
                {value: "4", label: "Instrumentista"},
            ],
        },
        {
            name: "password",
            label: "Contraseña",
            placeholder: "Mínimo 8 caracteres (opcional)",
            type: "password",
        },
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
                        onSubmit={onSubmit}
                        fields={fields}
                        defaultValues={{
                            rut: user.rut,
                            nombre: user.nombre,
                            rol: user.rol?.id?.toString() || "4",
                            password: "",
                        }}
                    />
                </>
            )}
        </Main>
    );
}
