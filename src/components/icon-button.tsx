import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface PropsIconButton extends ComponentProps<'button'>{
  transparent?: boolean
}

//aqui ele recebe a propriedade transparente pois se for igual a true 
//os botoes vão ter o background transparente diferenciando dos botões da paginação. 
export function IconButton({ transparent, ...props}: PropsIconButton){
  return(
    <button 
      {...props} 
      // className={
      //   transparent 
      //   ? 'bg-black/20 border border-white/10 rounded-md p-1.5'
      //   : 'bg-white/10 border border-white/10 rounded-md p-1.5'
      className={twMerge(
        'border border-white/10 rounded-md p-1.5',
        transparent ? 'bg-black/20' : 'bg-white/10',
        props.disabled ? 'opacity-50' : null
      )
      }
    />
  );
}