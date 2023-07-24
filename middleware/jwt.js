import { SignJWT, jwtVerify } from "jose";

let estructuras = {
  usuario:{
    "tel": null,
    "nombre_completo": null,
    "password":null,
    "apodo": null,
    "genero_id": null,
    "edad": null,
    "ciudad_id": null,
    "direccion": null,
    "descripcion": null,
    "image": null
  },
  post:{
    "info": null,
    "image": null,
    "apodo_usuario": null,
  },
  comentarios:{
    "apodo_usuario": null,
    "info": null,
    "post": null,
  },
  reaccion:{
    "tipo_reaccion": null,
    "post": null,
  }
}

export const generateToken = async (req, res, next) => {
  try {
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT(req.body);
    req.token = await jwtconstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("4h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    next();
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};


export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ token: "Error. Generar token" });
  try {
    const encoder = new TextEncoder();
    req.data = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    next();
  } catch (error) {
    res.status(401).send({ token: "Algo salio mal en el token, genere uno nuevo" });
  }
};

