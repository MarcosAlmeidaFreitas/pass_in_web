import { Search, MoreHorizontal, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import { IconButton } from './icon-button';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br'
import { Table } from './table/table';
import { TableHeader } from './table/table-header';
import { TableCell } from './table/table-cell';
import { TableRow } from './table/table-row';
import { ChangeEvent, useState } from 'react';
import { attendees } from '../data/attendees';
import { useQuery } from '@tanstack/react-query';
import { requests } from '../api';

//fazendo com que a biblioteca de tempo dayjs utilize o tempo relativo
dayjs.extend(relativeTime);
//fazendo com a biblioteca utilize o padrão brasileiro de data
dayjs.locale('pt-br')

export function AttendeeList() {
  //estamos declarando uma variável dessa forma pois se não ela não apareceria na tela
  //pois o react não fica alterando o estado de cada variável quando muda, por não ser perfomático
  //o primeiro é a variavel que vai salvar o valor e o segundo é a função que vai atualizar o valor
  const [search, setSearch] = useState('');

  //a variável é utilizada para salvar a página que o usuário está da tabela
  const [page, setPage] = useState(1);

  const totalPage = Math.ceil(attendees.length / 10);

  //a função recebe um evento que é do changeEvent que é disparado por um input do html
  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>){
    setSearch(event.target.value);
  }

  //Função para mudar para a próxima página 
  function goToNextPage(){
    if(page < totalPage){
      setPage(page + 1);
    }
  }

  //Função para retornar a página anterior
  function goToPreviusPage(){
    if(page > 1){
      setPage(page - 1);
    }
  }

  function goToFristPage(){
    setPage(1);
  }

  function goToLastPage(){
    setPage(totalPage);
  }

  const id = '1c899263-53f2-487a-a0d0-6cb50ec47547';
  const {data, isLoading} = useQuery({
    queryKey: ['events', id], 
    queryFn: () => requests.events.getOne(id),
    
  });

  console.log(data);

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className='size-4 text-emerald-300' />
          <input onChange={onSearchInputChanged} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
            placeholder="Buscar participante..." />
        </div>
          {search}
      </div>

      <Table>
          <thead>
            <tr className='border-b border-white/10'>
              <TableHeader style={{ width: 48 }}>
                <input type='checkbox' className='size-4 bg-black/20 rounded border border-white/10' />
              </TableHeader>
              <TableHeader>Código</TableHeader>
              <TableHeader>Participante</TableHeader>
              <TableHeader>Data de inscrição</TableHeader>
              <TableHeader>Data do check-in</TableHeader>
              <TableHeader style={{ width: 64 }}></TableHeader>
            </tr>
          </thead>

          <tbody>
            {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
              return (
                <TableRow key={attendee.id}>
                  <TableCell>
                    <input type="checkbox" className='size-4 bg-black/20 rounded border border-white/10' />
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span className='font-semibold text-white'>{attendee.name}</span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>

                  <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                  <TableCell>
                    <IconButton transparent={true}>
                      <MoreHorizontal className='size-4'/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <TableCell colSpan={3}>
                Mostrando {page * 10} de {attendees.length} itens
              </TableCell>
              <TableCell className='text-right' colSpan={3}>
                <div className='inline-flex items-center gap-8'>
                  <span>Página {page} de {totalPage}</span>
                  <div className='flex gap-1.5'>
                    <IconButton onClick={goToFristPage} disabled={page === 1}>
                      <ChevronsLeft className='size-4 ' />
                    </IconButton>
                    <IconButton onClick={goToPreviusPage} disabled={page === 1}>
                      <ChevronLeft className='size-4 ' />
                    </IconButton>
                    <IconButton onClick={goToNextPage} disabled={page === totalPage}>
                      <ChevronRight className='size-4 ' />
                    </IconButton>
                    <IconButton onClick={goToLastPage} disabled={page === totalPage}>
                      <ChevronsRight className='size-4 ' />
                    </IconButton>

                  </div>
                </div>
              </TableCell>
            </tr>
          </tfoot>
        </Table>
      </div>
  );
}