"use client"

import {Label, TextInput} from "flowbite-react"
import {useFormContext} from "react-hook-form"
import {HiCheck} from "react-icons/hi";

const ValidatedTextInput = ({name, label, defaultValue}: {
    name: string,
    label: string,
    defaultValue?: string
}) => {
    const {register, getValues, formState: {errors}} = useFormContext()

    return (
        <div className="flex flex-col">
            <Label
                htmlFor={name}
                className={`mb-1 text-left ${errors[name] ? "text-red-500" : "text-gray-700"}`}
                color={errors[name] ? "failure" : "success"}
                value={label}
            />
            <TextInput
                id={name}
                {...register(name)}
                color={errors[name] ? "failure" : "success"}
                rightIcon={getValues(name) && !errors[name] && HiCheck}
                defaultValue={defaultValue}
                className="block w-full rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                helperText={errors[name] && (
                    <span className="font-medium">
                        {(errors[name] as { message?: string }).message}
                    </span>
                )}
            />
        </div>
    )
}

export default ValidatedTextInput