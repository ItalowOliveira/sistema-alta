import "./Botao.css";

type BotaoProps = {
  texto: string;         
  onClick?: () => void;    
};

function Botao({ texto, onClick }: BotaoProps) {
  return <button onClick={onClick}>{texto}</button>;
}

export default Botao;