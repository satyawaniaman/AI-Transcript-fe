import api from "@/utils/axios";

const uploadAsset = async ( content: string, type: "FILE" | "TEXT", organizationId: string ) => {
    const response = await api.post('/api/callasset', { 
        content, type, organizationId, 
     });
    return response.data;
};

export { uploadAsset };