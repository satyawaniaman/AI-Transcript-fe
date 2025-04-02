import api from "@/utils/axios";

const uploadAsset = async ( content: string, type: string, status: string, transcript: string, userId: string ) => {
    const response = await api.post('/api/callasset', { 
        content, type, status, transcript, userId 
     });
    return response.data;
};

export { uploadAsset };