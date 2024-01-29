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
    const authToken = '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';

    try {
        // Obtén el contenido actual del archivo
        const responseGet = await fetch(apiUrl, {
            headers: {
                'Authorization': 'token ${authToken}',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        // Actualiza el contenido del archivo
        const responsePatch = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': 'token ${authToken',
                'X-GitHub-Api-Version': '2022-11-28',
                'Content-Type': 'text/plain'
            },
            body: value
        });

        const dataPatch = await responsePatch.json();

        // Maneja la respuesta de la API como sea necesario
        console.log(dataPatch);
    } catch (error) {
        console.error('Error al actualizar el archivo:', error);
    }
}
