import { useState, useEffect } from 'react';

import { FaRegTrashCan } from "react-icons/fa6";

import { api } from '../../../services/api';

import { FormatCategory, FormatProof, FormatStatus } from '../../../utils/formatDatas';

import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Table } from '../../../components/Table';
import { SearchDropdown } from '../../../components/SearchDropdown';

import { ModalOverlay, Title, MainForm, Status } from './styles';

import { ModalConfirm } from '../../../components/ModalConfirm';

export function Modal({ isOpen, onClose, category}) {
  if (!isOpen) return null;

  const [status, setStatus] = useState({ proof_name: "", categorie_name: "", categorie_state: "" });
  const [refresh, setRefresh] = useState(false);
  const [clearSelection, setClearSelection] = useState(false);
  const [selectedHorseId, setSelectedHorseId] = useState(null);
  const [competitorsWithHorses, setCompetitorsWithHorses] = useState();
  const [selectedCompetitorId, setSelectedCompetitorId] = useState(null);

  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [registerToDelete, setRegisterToDelete] = useState({ id: "", horse: "", competitor: "" });

  const larguras = {
    competitor_order: "50px",
    competitor: "",
    horse: "",
    button: "30px"
  }
  const header = {
    competitor_order: "Ordem",
    competitor_name: "Competidor",
    horse_name: "Cavalo",
    button: ""
  }
  const rows = Array.isArray(competitorsWithHorses) ? competitorsWithHorses.map((row, index) => {
    return (
      <tr key={index}>
        {Object.keys(header).map((field, subIndex) => {
          if (field === 'competitor_order') {
            return <td key={subIndex}>{index}</td>;
          }
          if (field === 'button') {
            return (
              <td key={subIndex}>
                <Button className={"noBackground auto-width"} onClick={() => handleModalConfirm({ id: row.id, competitor: row.competitor_name, horse: row.horse_name })}>
                  <FaRegTrashCan />
                </Button>
              </td>
            );
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
      setStatus(res.data.status)
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

  const handleModalConfirm = (competitor) => {
    setIsModalConfirmVisible(!isModalConfirmVisible);
    { competitor && setRegisterToDelete(competitor) }
  }

  const handleDeleteRegister = async (id) => {
    try {
      const res = await api.delete(`/categoryRegisters/${id}`);
      alert("Registro excluído com sucesso!");
      setRefresh(prev => !prev)
      setSelectedCompetitorId(null);
      setSelectedHorseId(null);
      setClearSelection(true);
      setTimeout(() => setClearSelection(false), 0);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      alert(errorMessage)
    }
    handleModalConfirm()
  };

  const handleStateCategory = async (state) => {
    if(state == "finished_inscriptions") {
      try {
        await api.put (`categoryRegisters/${category.id}`);
        await api.put(`/categories/${category.id}`, { state });
        alert("Status atualizado com sucesso!");
        setRefresh(prev => !prev)
        setSelectedCompetitorId(null);
        setSelectedHorseId(null);
        setClearSelection(true);
        setTimeout(() => setClearSelection(false), 0);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        alert(errorMessage);
      }
    }
    else {
      try {
        await api.put(`/categories/${category.id}`, { state });
        alert("Status atualizado com sucesso!");
        setRefresh(prev => !prev)
        setSelectedCompetitorId(null);
        setSelectedHorseId(null);
        setClearSelection(true);
        setTimeout(() => setClearSelection(false), 0);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        alert(errorMessage);
      }
    }
  };

  return (
    <ModalOverlay>

      <ModalConfirm
        title={"Você têm certeza que deseja excluir o registro? "}
        subTitle={`Competidor: ${registerToDelete.competitor}    ->    Cavalo: ${registerToDelete.horse}`}
        visible={isModalConfirmVisible}
        onClose={handleModalConfirm}
        onConfirm={() => handleDeleteRegister(registerToDelete.id)}
      />

      <div className="modal">

        <MainForm>
          <Title>
            <div>
              <h3>Prova: </h3>
              <h1>{FormatProof(status.proof_name)}</h1>
            </div>

            <div>
              <h3>Categoria:</h3>
              <h1>{FormatCategory(status.categorie_name)}</h1>
            </div>

          </Title>

          <Button
            className="noBackground auto-width exit"
            onClick={onClose}
          >X</Button>

          {(status.categorie_state === "active" || status.categorie_state === "making_registrations") &&
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
              <Button onClick={handleSave} className={"larger-width"}>Adicionar</Button>
            </div>
          }

          <div className="registers">
            <Table
              header={header}
              widths={larguras}
              rows={rows}
            />
          </div>
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
              value={FormatStatus(status.categorie_state)}
              disabled
              status
            />

            {(status.categorie_state === "active" || status.categorie_state === "making_registrations") &&
              <Button onClick={() => handleStateCategory("finished_inscriptions")}>Encerrar inscrições</Button>
            }

          </div>

          {(status.categorie_state === "active" || status.categorie_state === "making_registrations") &&
            <Button className={"danger"} onClick={() => handleStateCategory("inative")}>Inativar</Button>
          }

          {(status.categorie_state === "inative" || status.categorie_state === "finished_inscriptions") &&
            <Button onClick={() => handleStateCategory("active")}>Reativar</Button>
          }

        </Status>
      </div>
    </ModalOverlay>
  );
};
