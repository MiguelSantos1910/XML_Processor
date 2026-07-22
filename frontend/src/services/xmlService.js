import api from "./api";

export async function uploadXML(formData) {

    return api.post("/xml/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export async function buscarResumo() {
    return api.get("/dashboard/resumo");
}

export async function buscarNaoIdentificados() {
    return api.get("/xml/nao-identificados");
}