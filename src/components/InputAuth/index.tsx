import type { InputHTMLAttributes } from 'react'

interface InputAuthPropsType extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput: string
  classNameError: string
  classNameWrap?: string
  register: any
  errorMessage?: string
}

function InputAuth({
  type,
  placeholder,
  classNameInput,
  classNameError,
  name,
  id,
  register,
  errorMessage,
  classNameWrap
}: InputAuthPropsType) {
  return (
    <div className={classNameWrap}>
      <input
        autoComplete='off'
        type={type}
        placeholder={placeholder}
        className={classNameInput}
        name={name}
        {...register(name)}
        id={id}
      />
      <p className={classNameError}>{errorMessage}</p>
    </div>
  )
}

export default InputAuth
