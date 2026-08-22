/**
 * Client-Side Image Processor & Cloudinary CDN Uploader
 */

export async function compressImage(file, maxWidth = 2000, quality = 0.88) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({
          dataUrl: compressedDataUrl,
          width,
          height,
          originalSize: file.size,
          compressedLength: compressedDataUrl.length
        });
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export async function uploadToCloudinary(file, { cloudName, uploadPreset } = {}) {
  const activeCloud = cloudName || localStorage.getItem('aanuore_cloudinary_cloud');
  const activePreset = uploadPreset || localStorage.getItem('aanuore_cloudinary_preset');

  if (activeCloud && activePreset) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', activePreset);
      formData.append('tags', 'aanuore_portfolio');

      const response = await fetch(`https://api.cloudinary.com/v1_1/${activeCloud}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error?.message || 'Cloudinary upload rejected');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      console.warn('Cloudinary upload failed, using optimized local data:', err);
    }
  }

  const { dataUrl } = await compressImage(file);
  return dataUrl;
}
