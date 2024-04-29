import { ComponentProps } from "react";
//importação para alterar uma propriedade do className e não substituir a anterior
import { twMerge } from 'tailwind-merge'

interface TableCellProps extends ComponentProps<'td'>{

} 


export function TableCell(props: TableCellProps){
  return(
    //fazendo o merge do className, é importante ...props vir primeiro se não vai
    // acabar continuando a substituir o merge.
    <td  {...props} className={twMerge('py-3 px-4 text-sm text-zinc-300', props.className)}>
    </td>
  );
}