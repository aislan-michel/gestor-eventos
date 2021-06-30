import IEventoRequest from "./IEventoRequest";

interface IEventoResponse extends IEventoRequest {
  id: string;
  like: number;
  dislike: number;
}

export default IEventoResponse;
