import { useEffect, useState } from "react";
import { getUsuarios, type Usuario } from "../api/usuarioApi";

export default function Painel() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    getUsuarios().then(setUsuarios);
  }, []);

  return (
    <>
      <h1>Painel de Impressões</h1>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>{usuario.nome} - {usuario.email}</li>
        ))}
      </ul>
    </>
  );
}