
// Télécharger un fichier
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');

uploadBtn.addEventListener('click', () => {
    fileInput.click(); // Ouvrir le dialogue de fichier lors du clic sur le bouton
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]; // Récupérer le premier fichier sélectionné
    if (file) {
        clearUI();
        showSpinner();

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            generateQRCode(dataUrl, 300); // Taille par défaut : 300x300
        };
        reader.readAsDataURL(file);

    }
});

// Form Inputs
const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value.trim();
    const size = document.getElementById('size').value;

    if (url === '') {
        alert('Veuillez entrer votre Texte ou URL');
    } else {
        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQRCode(url, size);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);

        }, 1000);
    }
}

// Generate QR Code
// const generateQRCode = (url, size) => {
//     const qrcode = new QRCode("qrcode", {
//         text: url,
//         width: size,
//         height: size,
//     });
// }

// NEW Générer le QR Code et appeler createSaveBtn avec les bonnes dimensions
const generateQRCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
    });

    // Obtenir le canvas contenant le QR Code généré
    const canvas = document.querySelector('#qrcode canvas');

    // Créer le bouton de téléchargement avec le canvas
    createSaveBtn(canvas);
}

// Spinner
const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}

hideSpinner();

// Clear QR Code
const clearUI = () => {
    // Effacer l'Image QR Code
    qr.innerHTML = '';

    // Effacer le bouton de téléchargement
    const saveLink = document.getElementById('save-link');
    if (saveLink) {
        saveLink.remove();
    }
}

// Button Save ou téléchargement
// const createSaveBtn = (saveUrl) => {
//     const link = document.createElement('a');
//     link.id = 'save-link';
//     link.classList = 'bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';

//     link.href = saveUrl;
//     link.download = 'qrcode';
//     link.innerHTML = "Télécharger l'image";

//     document.getElementById('generated').appendChild(link);
// }

// NEW Button Save ou téléchargement Avec les bonnes dimensions
const createSaveBtn = (canvas) => {

    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';

    // Convertir le canvas en URL de données
    const dataURL = canvas.toDataURL();

    link.href = dataURL;
    link.download = 'qrcode.png'; // Nom de fichier pour le téléchargement
    link.innerHTML = "Télécharger l'image";

    document.getElementById('generated').appendChild(link);
}

form.addEventListener('submit', onGenerateSubmit);