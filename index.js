const imageInput = document.getElementById('imageInput');
const fileNameDisplay = document.getElementById('file-name');
const originalImage = document.getElementById('originalImage');
const removedImage = document.getElementById('removedImage');
const downloadLink = document.getElementById('downloadLink');
const resultSection = document.getElementById('resultSection');

function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  fileNameDisplay.textContent = file.name;

  const reader = new FileReader();
  reader.onload = () => {
    originalImage.src = reader.result;
    resultSection.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

async function removeBackground() {
  const file = imageInput.files[0];
  if (!file) return alert("Please upload an image first.");

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": "sDsrAbwKNyqaNEZfVfnsd74e" // Replace with your actual key
    },
    body: formData
  });

  if (!response.ok) {
    alert("Error removing background.");
    return;
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  removedImage.src = url;
  downloadLink.href = url;
  resultSection.style.display = 'flex';
}
