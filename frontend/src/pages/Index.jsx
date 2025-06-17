import Main from "@/components/Main.jsx";
import Title from "@/components/Title.jsx";
import Subtitle from "@/components/Subtitle.jsx";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";
import {Mail, CodeXml} from "lucide-react";
import PyCharm from "@/components/icons/PyCharm.jsx";
import VSCode from "@/components/icons/VSCode.jsx";
import Django from "@/components/icons/Django.jsx";
import React from "@/components/icons/React.jsx";
import GitHub from "@/components/icons/GitHub.jsx";
import Tailwind from "@/components/icons/Tailwind.jsx";
import Lucide from "@/components/icons/Lucide.jsx";
import SQLite from "@/components/icons/SQLite.jsx";
import Shadcn from "@/components/icons/Shadcn.jsx";
import Python from "@/components/icons/Python.jsx";
import JavaScript from "@/components/icons/JavaScript.jsx";
import Notion from "@/components/icons/Notion.jsx";
import {GraduationCap} from "lucide-react";

function Index() {
    const {userName, userRol, isLoggedIn} = useCurrentUser()

    return (
        <div className="flex">
            <Main>
                <Title className="text-esteril-blue">Sistema de Trazabilidad EsterilMed</Title>
                <Subtitle>Bienvenido{ isLoggedIn ? `, ${userName}` : ""}</Subtitle>

                <section className="bg-neutral-100 rounded-lg shadow-md p-6 mb-6">
                    <p className="flex items-center mb-2 text-esteril-blue font-bold"><Mail className="mr-1" /> Mensaje de introducción</p>

                    <p className="mb-4 text-gray-700">
                        Este sistema ha sido desarrollado para modernizar y optimizar la trazabilidad de productos médicos, reemplazando el uso de hojas de cálculo tradicionales. Ofrece una plataforma más rápida, eficiente y fácil de usar, evitando problemas comunes como la duplicación de datos, la eliminación accidental de información y la falta de control de usuarios. Con esta solución, se mejora la gestión, la velocidad y la confiabilidad del proceso, brindando una experiencia más robusta y adaptada a las necesidades actuales del equipo.
                    </p>
                    <p className="mb-2 font-semibold text-esteril-blue">Cada empleado está asignado a uno de los 4 cargos existentes:</p>
                    <ul className="list-disc list-inside mb-4 text-gray-800">
                        <li>Administrador</li>
                        <li>Operador</li>
                        <li>Coordinador</li>
                        <li>Instrumentista</li>
                    </ul>
                    {isLoggedIn ? (
                        <p className="mb-4 text-gray-70">
                            Usted es un: <span className="font-medium text-esteril-blue">{userRol}</span>
                        </p>
                    ) : ""}
                    <p className="mb-2 text-gray-700">
                        Cada cargo tiene un menú ligeramente diferente a la izquierda, con las opciones designadas a su cargo. Le invitamos a navegar por las opciones disponibles.
                    </p>
                    <p className="mb-4 text-gray-700">
                        Cualquier duda, consulta, reclamo, sugerencia o felicitación, lo invitamos a contactarse <a href="#" className="text-esteril-blue underline hover:text-esteril-dark">Aquí</a>.
                    </p>
                    <p className="text-gray-700">
                        Consejo: La barra lateral se puede ocultar o mostrar haciendo click en el icono de menú en la parte superior izquierda, o con el atajo <kbd className="bg-gray-200 px-2 py-1 rounded whitespace-nowrap">Ctrl + B</kbd>.
                    </p>

                    <hr className="my-6"/>

                    <div className="text-center mt-auto flex flex-col">
                        <span className="text-lg font-bold text-esteril-blue mb-1 mx-auto flex items-center"><CodeXml className="mr-2"/> Proyecto de Integración</span>

                        <span className="flex mx-auto my-2 gap-2 text-3xl">
                            <GitHub />
                            <Notion />
                            <PyCharm />
                            <VSCode />
                            <Django />
                            <SQLite />
                            <React />
                            <Tailwind />
                            <Shadcn />
                            <Lucide />
                        </span>

                        <p className="text-gray-600 font-medium">Josefa Aravena, Brian Puente & Evan Reyes</p>
                        <span className="text-gray-600 mt-1 mx-auto flex items-center"><GraduationCap className="mr-2"/>José Martínez Opazo</span>

                    </div>
                </section>
            </Main>
        </div>
    );
}

export default Index;
