import { useState, useEffect } from 'react';

import { api } from '../../services/api';

import { FormatCategory, FormatProof, FormatStatus } from '../../utils/formatDatas';

import { Button } from '../Button';
import { Input } from '../Input';
import { Table } from '../Table';
import { SearchDropdown } from '../SearchDropdown';

import { ModalOverlay, Title, MainForm, Status } from './styles';

export function Modal({ isOpen, onClose, category, proof }) {
  if (!isOpen) return null;

  const [competitorsWithHorses, setCompetitorsWithHorses] = useState();
  const [selectedCompetitorId, setSelectedCompetitorId] = useState(null);
  const [selectedHorseId, setSelectedHorseId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [clearSelection, setClearSelection] = useState(false);

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
    }
    fethCompetitors();

  }, [refresh]);

  const handleSave = async () => {
    try {
        const res = await api.post('/categoryRegisters', 
          {
            "competitor_id": selectedCompetitorId, 
            "horse_id": selectedHorseId,
            "categorie_id": category.id
          });
          alert("Registro cadastrado com sucesso!");

          setRefresh(prev => !prev)
          setSelectedCompetitorId(null);
          setSelectedHorseId(null);
          setClearSelection(true);
          setTimeout(() => setClearSelection(false), 0);
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        alert(errorMessage)
    }
};

  return (
    <ModalOverlay>
      <div className="modal">

        <MainForm>
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
            <SearchDropdown
              table="competitors"
              onItemSelected={(id) => setSelectedCompetitorId(id)}
              clearSelection={clearSelection}
            />
            <SearchDropdown
              table="horses"
              onItemSelected={(id) => setSelectedHorseId(id)}
              clearSelection={clearSelection}
            />
            <Button onClick={handleSave}>Salvar</Button>
          </div>

          <Table
            header={header}
            widths={larguras}
            rows={rows}
          />
        </MainForm>

        <Status>
          <div className="inputs">
            <Input
              title={"Número único"}
              value={category.id}
              disabled
              status
            />
            <Input
              title={"Status"}
              value={FormatStatus(category.state)}
              disabled
              status
            />

            <Button>Encerrar inscrições</Button>
          </div>

          <Button className={"danger"}>Inativar</Button>

        </Status>
      </div>
    </ModalOverlay>
  );
};
