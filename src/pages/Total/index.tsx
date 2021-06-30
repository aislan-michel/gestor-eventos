import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import IEventoResponse from '../../interfaces/IEventoResponse';

import urlAPI from '../../utils/urlAPI';

const Total: React.FC = () => {
  const [eventos, setEventos] = useState<IEventoResponse[]>([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${urlAPI}/events`
    }).then((response: AxiosResponse<IEventoResponse[]>) => {
      setEventos(response.data);
    }).catch((error: AxiosError) => {
      console.log(error);
    });
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Local</td>
            <td>Quantidade</td>
            <td>Dia da semana</td>
            <td>Quantidade</td>
          </tr>
        </thead>
        <tbody>
          {
            eventos.map(e => {
              return (
                <tr key={e.id}>
                  <td>{e.local}</td>
                  <td>{ }</td>
                  <td>{e.diasemana}</td>
                  <td>{ }</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default Total



