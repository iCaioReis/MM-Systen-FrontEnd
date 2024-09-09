import { api } from '../services/api';

export async function updateProfilePicture({ id, table, avatarFile }) {
  try {
    const fileUploadForm = new FormData();
    
    // Adicionar o arquivo de avatar ao FormData
    fileUploadForm.append('avatar', avatarFile);
    
    // Adicionar id e table ao FormData
    fileUploadForm.append('id', id);
    fileUploadForm.append('table', table);
    
    // Fazer a requisição para a API
    const response = await api.patch('/avatar', fileUploadForm, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Avatar atualizado com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao atualizar avatar:', error.response ? error.response.data : error.message);
  }
}
