import { useState, useEffect } from 'react';

import { api } from '../../services/api';

import { FormatCategory, FormatProof } from '../../utils/formatDatas';

import { Button } from '../Button';
import { Input } from '../Input';
import { Table } from '../Table';

import { ModalOverlay, Title } from './styles';

export function Modal({ isOpen, onClose, content, category, proof }) {
  if (!isOpen) return null;

  const [competitorsWithHorses, setCompetitorsWithHorses] = useState();

  const larguras = {
    competitor_order: "50px",
    competitor: "",
    horse: "",
    button: "30px"
  }
  const header = {
    competitor_order: "Ordem",
    competitor_id: "Competidor",
    horse_id: "Cavalo",
    button: ""
  }

  const rows = Array.isArray(competitorsWithHorses) ? competitorsWithHorses.map((row, index) => {
    return (
      <tr key={index}>
        {Object.keys(header).map((field, subIndex) => {
          if (field === 'competitor_order') {
            return <td key={subIndex}>{index}</td>; 
          }
          return (
            <td key={subIndex}>{row[field]}</td>
          );
        })}
      </tr>
    );
  }) : [];

  useEffect(() => {
    async function fethCompetitors() {
      const res = await api.get(`/categoryRegisters/${category.id}`);

      setCompetitorsWithHorses(res.data.competitorHorses);
      console.log(res.data.competitorHorses)
    }
    fethCompetitors();

  }, []);

  return (
    <ModalOverlay>
      <div className="modal">
        <Title>
          <div>
            <h3>Prova: </h3>
            <h1>{FormatProof(proof)}</h1>
          </div>

          <div>
            <h3>Categoria:</h3>
            <h1>{FormatCategory(category.name)}</h1>
          </div>

        </Title>

        <Button
          className="noBackground auto-width exit"
          onClick={onClose}
        >X</Button>

        <div className="flex">
          <Input title={"Competidor"} ></Input>
          <Input title={"Cavalo"} ></Input>
          <Button>Salvar</Button>
        </div>

        <Table
          header={header}
          widths={larguras}
          rows={rows}
        />
      </div>
    </ModalOverlay>
  );
};
