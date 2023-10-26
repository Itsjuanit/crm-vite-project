import { useNavigate, Form, useActionData } from "react-router-dom";
import Formulario from "../componentes/Formulario";
import Error from "../componentes/Error";

export async function action({ request }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");

  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("todos los campos son obligatorios.");
  }

  let regex = new RegExp(
    "([!#-'+/-9=?A-Z^-~-]+(.[!#-'+/-9=?A-Z^-~-]+)|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'+/-9=?A-Z^-~-]+(.[!#-'+/-9=?A-Z^-~-]+)|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("El email no es valido");
  }
  if (Object.keys(errores).length) {
    console.log("si hay errores");
    return errores;
  }
}

function NuevoCliente() {
  const navigate = useNavigate();
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-purple-500">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todo los campos para registrar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-purple-500 text-white px-3 py-1 font bold uppercase rounded-md"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post">
          <Formulario />
          <input
            type="submit"
            className="mt-5 w-full bg-purple-500 p-3 uppercase font-bold text-white text-lg rounded-md"
            value="Registrar cliente"
          />
        </Form>
      </div>
    </>
  );
}

export default NuevoCliente;
