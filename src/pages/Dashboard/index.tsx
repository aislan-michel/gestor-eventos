import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { Total, Formulario, Tabela, Container, Remover, Descurtir, Curtir, Salvar, Entrada } from './style';

import IEventoRequest from '../../interfaces/IEventoRequest';
import IEventoResponse from '../../interfaces/IEventoResponse';

import urlAPI from '../../utils/urlAPI';

const Dashboard: React.FC = () => {
  const [nomeevento, setNomeEvento] = useState('');
  const [local, setLocal] = useState('');
  const [diasemana, setDiaSemana] = useState('');
  const [horario, setHorario] = useState('');
  const [like, setLike] = useState(1);
  const [dislike, setDislike] = useState(1);
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

  function cadastrar(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const novoEvento: IEventoRequest = {
      nomeevento,
      local,
      diasemana,
      horario
    }

    axios({
      method: 'post',
      url: `${urlAPI}/events`,
      data: novoEvento
    }).then((response: AxiosResponse<IEventoResponse>) => {
      setEventos([...eventos, response.data]);
    }).catch((error: AxiosError) => {
      console.log(error);
    });
  }

  function remover(id: string): void {
    axios({
      method: 'delete',
      url: `${urlAPI}/events/${id}`
    }).then(() => {
      setEventos(eventos.filter(e => e.id !== id));
    }).catch((error: AxiosError) => {
      console.log(error);
    });
  }

  function curtir(id: string): void {
    axios({
      method: 'post',
      url: `${urlAPI}/events/like/${id}`
    }).then((response: AxiosResponse<IEventoResponse>) => {
      eventos.map(e => {
        if (e.id === id) {
          setLike(e.like += 1);
        }
      });
    }).catch((error: AxiosError) => {
      console.log(error);
    });
  }

  function descurtir(id: string): void {
    axios({
      method: 'post',
      url: `${urlAPI}/events/dislike/${id}`
    }).then((response: AxiosResponse<IEventoResponse>) => {
      eventos.map(e => {
        if (e.id === id) {
          setDislike(e.dislike += 1);
        }
      });
    }).catch((error: AxiosError) => {
      console.log(error);
    });
  }

  return (
    <Container>
      <h1>Gestor de Eventos</h1>
      <br />

      <Formulario onSubmit={cadastrar}>
        <Entrada type='text' placeholder='Nome do Evento' value={nomeevento} onChange={(e: any) => { setNomeEvento(e.target.value); }} />
        <Entrada type='text' placeholder='Local do Evento' value={local} onChange={(e: any) => { setLocal(e.target.value); }} />
        <Entrada type='text' placeholder='Dia da Semana' value={diasemana} onChange={(e: any) => { setDiaSemana(e.target.value); }} />
        <Entrada type='text' placeholder="Horário" value={horario} onChange={(e: any) => { setHorario(e.target.value); }} />

        <Salvar type="submit">Salvar</Salvar>

        <Total type='button'>
          <Link to={`/total`}>Total</Link>
        </Total>
      </Formulario>

      <br /><br />

      <Tabela>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Local</td>
            <td>Dia da semana</td>
            <td>Horário</td>
            <td>Likes</td>
            <td>Dislikes</td>
          </tr>
        </thead>

        <tbody>
          {
            eventos.map(e => {
              return (
                <tr key={e.id}>
                  <td>{e.nomeevento}</td>
                  <td>{e.local}</td>
                  <td>{e.diasemana}</td>
                  <td>{e.horario}</td>
                  <td>{e.like}</td>
                  <td>{e.dislike}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Remover type='button' onClick={() => { remover(e.id); }}>
                      Remover
                    </Remover>
                    <Curtir type='button' onClick={() => { curtir(e.id) }}>
                      Like
                    </Curtir>
                    <Descurtir type='button' onClick={() => { descurtir(e.id) }}>
                      Dislike
                    </Descurtir>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Tabela>
    </Container>
  )
}

export default Dashboard
