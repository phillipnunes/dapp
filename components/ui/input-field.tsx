import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {ChangeEventHandler} from "react";

type InputFieldProps = {
  label: string
  id: string
  type?: string,
  value: string | number;
  onChange:  ChangeEventHandler<HTMLInputElement> | undefined
  placeholder: string
}

const InputField = ({ label, id, type = "text", value, onChange, placeholder }: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export {InputField}
