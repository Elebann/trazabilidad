export const tipocontrol = (tiposControl) => ({
    name: "tipocontrol",
    label: "Tipo de Control",
    laceholder: "Tipo de Control",
    type: "checkbox-group",
    options: tiposControl.map(tc => ({
        value: tc.id.toString(),
        label: tc.tipo_control_material
    }))
})