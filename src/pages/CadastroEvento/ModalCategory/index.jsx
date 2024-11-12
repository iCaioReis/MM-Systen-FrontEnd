import { FaRegTrashCan, FaPencil, FaArrowTurnDown, FaArrowTurnUp } from "react-icons/fa6";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

import { api } from '../../../services/api';

import { FormatCategory, FormatProof, FormatStatus } from '../../../utils/formatDatas';
import { sortCategoryRegisters } from '../../../utils/sortCategoryRegisters';

import { Input } from '../../../components/Input';
import { Table } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { ModalConfirm } from '../../../components/ModalConfirm';
import { SearchDropdown } from '../../../components/SearchDropdown';

import { ModalOverlay, Title, MainForm, Status } from './styles';

export function ModalCategory({ isOpen, onClose, category }) {
  if (!isOpen) return null;

  const [status, setStatus] = useState({ proof_name: "", categorie_name: "", categorie_state: "" });
  const [refresh, setRefresh] = useState(false);
  const [clearSelection, setClearSelection] = useState(false);
  const [selectedHorseId, setSelectedHorseId] = useState(null);
  const [competitorsWithHorses, setCompetitorsWithHorses] = useState();
  const [selectedCompetitorId, setSelectedCompetitorId] = useState(null);
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [registerToDelete, setRegisterToDelete] = useState({ id: "", horse: "", competitor: "" });
  const [showModalEditRegister, setShowModalEditRegister] = useState(false);
  const [registerToEdit, setRegisterToEdit] = useState([{ "id": 0, "name": "" }, { "id": 0, "name": "" }]);
  const [editCompetitorId, setEditCompetitorId] = useState(null);
  const [editHorseId, setEditHorseId] = useState(null);
  const [editRegisterId, setEditRegisterId] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const larguras = {
    competitor_order: "50px",
    competitor: "",
    horse: "",
    button: "30px"
  };
  const header = {
    competitor_order: "Ordem",
    competitor_name: "Competidor",
    horse_name: "Cavalo",
    button: ""
  };

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
          "competitor_id": selectedCompetitorId.id, //Ajustar posteriormente
          "horse_id": selectedHorseId.id, //Ajustar posteriormente
          "categorie_id": category.id,
          "competitor_order": competitorsWithHorses.length + 1
        });
      setRefresh(prev => !prev)
      setSelectedCompetitorId(null);
      setSelectedHorseId(null);
      setClearSelection(true);
      setTimeout(() => setClearSelection(false), 0);
      toast.success("Registro cadastrado com sucesso!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage)
    }
  };
  const handleModalConfirm = (competitor) => {
    setIsModalConfirmVisible(!isModalConfirmVisible);
    { competitor && setRegisterToDelete(competitor) }
  };
  const handleModalEditRegister = (register) => {
    setEditRegisterId(register.id);
    setEditCompetitorId(register.competitor_id);
    setEditHorseId(register.horse_id);
    setEditCategoryId(register.categorie_id);
    setRegisterToEdit([
      { id: register.competitor_id, name: register.competitor_name },
      { id: register.horse_id, name: register.horse_name }]);

    if (showModalEditRegister) {
      setEditHorseId(null);
      setEditRegisterId(null);
      setEditCompetitorId(null);
      setEditCategoryId(null);
    }

    setShowModalEditRegister(!showModalEditRegister);
  };
  const handleDeleteRegister = async (id) => {
    try {
      const registerToDelete = competitorsWithHorses.find(register => register.id == id);

      const newOrder = competitorsWithHorses.map((competitor) => {

        if (competitor.competitor_order > registerToDelete.competitor_order) {
          competitor.competitor_order--
        }

        return competitor
      })
      await api.delete(`/categoryRegisters/${id}`);
      setRefresh(prev => !prev)
      setSelectedCompetitorId(null);
      setSelectedHorseId(null);
      setClearSelection(true);
      saveNewOrder(newOrder);

      setTimeout(() => setClearSelection(false), 0);
      toast.success("Registro excluído com sucesso!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage)
    }
    handleModalConfirm()
  };
  const handleStateCategory = async (state) => {
    if (state == "finished_inscriptions") {
      try {
        await api.put(`/categories/${category.id}`, { state });
        setRefresh(prev => !prev)
        setSelectedCompetitorId(null);
        setSelectedHorseId(null);
        setClearSelection(true);
        setTimeout(() => setClearSelection(false), 0);
        toast.success("Status atualizado com sucesso!");
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      }
    }
    else {
      try {
        await api.put(`/categories/${category.id}`, { state });
        setRefresh(prev => !prev)
        setSelectedCompetitorId(null);
        setSelectedHorseId(null);
        setClearSelection(true);
        setTimeout(() => setClearSelection(false), 0);
        toast.success("Status atualizado com sucesso!");
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      }
    }
  };
  const handleEditRegister = async () => {
    try {
      await api.put(`categoryRegisters/${editRegisterId}`, { "competitor_id": editCompetitorId, "horse_id": editHorseId, "categorie_id": editCategoryId });

      setRefresh(prev => !prev);
      toast.success("Registro salvo com sucesso!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  };
  const handleAutoSortCategory = async () => {
    const orderedRecords = sortCategoryRegisters(competitorsWithHorses);

    try {
      await api.put(`/sortCategoryRegisters`, orderedRecords);
      setRefresh(prev => !prev);
      toast.success("Registros ordenados com sucesso!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  };
  const handleOrderRegister = ({ direction, order }) => {
    if (direction == "up") {
      if (order == 1) {
        return
      }
      const newOrder = competitorsWithHorses;

      newOrder[order - 1].competitor_order -= 1;
      newOrder[order - 2].competitor_order += 1;
      saveNewOrder(newOrder);
    }

    if (direction == "down") {
      if (order == competitorsWithHorses.length) {
        return
      }
      const newOrder = competitorsWithHorses;

      newOrder[order - 1].competitor_order += 1;
      newOrder[order].competitor_order -= 1;
      saveNewOrder(newOrder);
    }
  };
  const saveNewOrder = async (order) => {
    try {
      await api.put(`/sortCategoryRegisters`, order);
      setRefresh(prev => !prev);
      toast.success("Registros ordenados com sucesso!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <ModalOverlay>
      <Modal
        visible={showModalEditRegister}
        onClose={handleModalEditRegister}
        content={
          <div className='content'>
            <h2>Editar Registro</h2>
            <div className="flex">
              <SearchDropdown
                tabindex="0"
                table="competitors"
                initialId={2}
                initialData={registerToEdit[0]}
                onItemSelected={(item) => setEditCompetitorId(item.id)}
              />
              <SearchDropdown
                tabindex="1"
                table="horses"
                initialData={registerToEdit[1]}
                onItemSelected={(item) => setEditHorseId(item.id)}
              />
              <Button onClick={() => handleEditRegister()}>Salvar</Button>
            </div>
          </div>
        }
      />

      <ModalConfirm
        title={"Você têm certeza que deseja excluir o registro? "}
        subTitle={`Competidor: ${registerToDelete.competitor}    ->    Cavalo: ${registerToDelete.horse}`}
        visible={isModalConfirmVisible}
        onClose={handleModalConfirm}
        onConfirm={() => handleDeleteRegister(registerToDelete.id)}
      />

      <div className="modalCategory">
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

          <div className={`registers ${status.categorie_state}`}>
            <Table
              header={header}
              widths={larguras}
              rows={Array.isArray(competitorsWithHorses) ? competitorsWithHorses.map((row, index) => {
                return (
                  <tr key={index}>
                    {Object.keys(header).map((field, subIndex) => {
                      if (field === 'competitor_order') {
                        return <td key={subIndex}>
                          <div className="flex-buttons">
                            <button className='up' onClick={() => handleOrderRegister({ direction: "up", order: row.competitor_order })}><FaArrowTurnUp /></button>

                            {row.competitor_order}

                            <button className='down' onClick={() => handleOrderRegister({ direction: "down", order: row.competitor_order })}><FaArrowTurnDown /></button>
                          </div>
                        </td>;
                      }
                      if (field === 'button') {
                        return (
                          <td key={subIndex}>
                            {status.categorie_state == 'active' &&
                              <div className="flex-buttons">
                                <button
                                  className='edit'
                                  onClick={() => handleModalEditRegister(row)}
                                ><FaPencil /></button>

                                <button
                                  className={"delete"}
                                  onClick={() => handleModalConfirm({
                                    id: row.id,
                                    competitor: row.competitor_name,
                                    horse: row.horse_name
                                  })}>
                                  <FaRegTrashCan />
                                </button>
                              </div>
                            }
                          </td>
                        );
                      }
                      return (
                        <td key={subIndex}>{row[field]}</td>
                      );
                    })}
                  </tr>
                );
              }) : []}
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
            {(status.categorie_state === "active" || status.categorie_state === "making_registrations") &&
              <Button onClick={() => handleAutoSortCategory()}>Ordenar Registros</Button>
            }

          </div>

          {(status.categorie_state === "active" || status.categorie_state === "making_registrations") &&
            <Button className={"danger"} onClick={() => handleStateCategory("inative")}>Inativar</Button>
          }

          {(status.categorie_state != "active") &&
            <Button onClick={() => handleStateCategory("active")}>Reativar</Button>
          }

        </Status>
      </div>
    </ModalOverlay>
  );
};