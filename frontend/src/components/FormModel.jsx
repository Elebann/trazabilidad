import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export function FormModel({schema, fields, onSubmit, defaultValues, disabled}) {
    const form = useForm({
        ...(schema ? {resolver: zodResolver(schema)} : {}),
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {fields.map((field) => (
                    <FormField
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        render={({field: f}) => (
                            <FormItem>
                                <FormLabel>{field.label}</FormLabel>
                                <FormControl>
                                    {field.type === "select" ? (
                                        <Select
                                            onValueChange={f.onChange}
                                            defaultValue={f.value}
                                            disabled={disabled}
                                        >
                                            <SelectTrigger disabled={disabled}>
                                                <SelectValue placeholder={field.placeholder}>
                                                    {f.value
                                                        ? field.options.find((opt) => opt.value === f.value)?.label
                                                        : ""}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.options.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            type={field.type || "text"}
                                            placeholder={field.placeholder}
                                            disabled={disabled || field.disabled}
                                            readOnly={field.readOnly}
                                            {...f}
                                            {...(field.type === "number" ? {
                                                onChange: (e) => f.onChange(e.target.value === "" ? "" : Number(e.target.value)),
                                                value: f.value ?? ""
                                            } : {})}
                                        />
                                    )}
                                </FormControl>
                                {field.description && (
                                    <FormDescription>{field.description}</FormDescription>
                                )}
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                ))}
                <Button type="submit" disabled={disabled}>Enviar</Button>
            </form>
        </Form>
    );
}