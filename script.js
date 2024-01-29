document.addEventListener('DOMContentLoaded', function () {
    const switchElement = document.getElementById('switch');

    switchElement.addEventListener('change', function () {
        const statusElement = document.getElementById('status');
        const isChecked = switchElement.checked;

        if (isChecked) {
            statusElement.textContent = 'Encendido';
            updateConfigFile('1');
        } else {
            statusElement.textContent = 'Apagado';
            updateConfigFile('0');
        }
    });
});

async function updateConfigFile(value) {
    const apiUrl = 'https://api.github.com/repos/jucscl/wol/contents/flag';
    let authToken = atob('Z2l0aHViX3BhdF8xMUFZQTdKTVkwRlh4NGtFckhucGQ1X21CeVYyYW5RQmJFMkZnNnA3RWs5NkpjN1VlNHo2NlB5NEhYcjdqbTVod3dITVkyQVc2S0JKNGI3VU5P');

    try {
        // Obtén el contenido actual del archivo
        const responseGet = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const dataGet = await responseGet.json();
        const currentSha = dataGet.sha;

        // Actualiza el contenido del archivo
        const responsePatch = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Actualizando archivo config',
                content: btoa(value), // Codifica el valor a base64
                sha: currentSha
            })
        });

        const dataPatch = await responsePatch.json();

        // Maneja la respuesta de la API como sea necesario
        console.log(dataPatch);
    } catch (error) {
        console.error('Error al actualizar el archivo:', error);
    }
}
