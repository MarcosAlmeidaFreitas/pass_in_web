// // Formando o tipo de atributo (interface) que a função meu botão deve receber
// interface MeuBotaoProps{
//   texto: string;
// }
// function MeuBotao(props: MeuBotaoProps){
//   return(<button>{props.texto}</button>)
// }

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AttendeeList } from "./components/attendee-list";
import { Header } from "./components/header";


export function App() {
  const queryCliente = new QueryClient();

  return (
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <QueryClientProvider client={queryCliente}>
        <Header/>
        <AttendeeList/>
      </QueryClientProvider>
    </div>
  )
}

