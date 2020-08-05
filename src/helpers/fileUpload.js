

export const fileUpload = async (file) => {
    // return url de la imagen

    const cloudUrl = 'https://api.cloudinary.com/v1_1/img-matias/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const respuesta = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        if (respuesta.ok) {
            const cloudResp = await respuesta.json();
            return cloudResp.secure_url;
        } else {
            throw await respuesta.json();
        }
    } catch (error) {
        throw error;
    }

}