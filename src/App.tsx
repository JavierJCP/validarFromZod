import { useState } from "react";
import "./App.css";
import { Plan } from "./types/plan";
import { validateForm } from "./validations/form.validatation";

interface Error {
  name: string[];
  email: string[];
  password: string[];
  confirmPassword: string[];
  edad: string[];
  plan: string[];
}

export default function App() {
  const [errors, setErrors] = useState<Error>({} as Error);
  const [iqualPassword, setIqualPassword] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = validateForm(data);
    if (result.error) {
      setErrors(result.error.flatten().fieldErrors as Error);
    }
    if (result.data?.password !== result.data?.confirmPassword) {
      setIqualPassword(false);
    } else {
      setIqualPassword(true);
    }
    // if (result.success) console.log(result.data);
    // console.log(result.error?.flatten().fieldErrors);
    if (result.success) {
      setErrors({} as Error);
    }
  };

  return (
    <div className="form__container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        {errors?.name && <p className="error">{errors.name[0]}</p>}

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        {errors?.email && <p className="error">{errors.email[0]}</p>}

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        {errors?.password && <p className="error">{errors.password[0]}</p>}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
        {errors?.confirmPassword && (
          <p className="error">{errors.confirmPassword[0]}</p>
        )}

        {!iqualPassword && (
          <p className="error">Las contraseñas no coinciden</p>
        )}

        <label htmlFor="edad">Edad:</label>
        <input type="number" id="edad" name="edad" />
        {errors?.edad && <p className="error">{errors.edad[0]}</p>}

        <label htmlFor="plan">Plan:</label>
        <select id="plan" name="plan">
          {Object.values(Plan).map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
        {errors?.plan && <p className="error">{errors.plan[0]}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
