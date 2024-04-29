import { api } from ".";
import { ROUTES } from "./routes";

export default{
  events:{
    getOne: async (id: string) => await api.get(ROUTES.events.getOne(id)) 
  }
}

