/**
 * Cloudinary Integration Service for Aanuore Portfolio
 */

const DEFAULT_CLOUD_NAME = 'aanuore';
const DEFAULT_TAG = 'aanuore_portfolio';

export function getCloudinaryConfig() {
  return {
    cloudName: localStorage.getItem('aanuore_cloudinary_cloud') || DEFAULT_CLOUD_NAME,
    uploadPreset: localStorage.getItem('aanuore_cloudinary_preset') || '',
    tag: DEFAULT_TAG
  };
}

export function saveCloudinaryConfig(cloudName, uploadPreset) {
  localStorage.setItem('aanuore_cloudinary_cloud', cloudName.trim());
  localStorage.setItem('aanuore_cloudinary_preset', uploadPreset.trim());
}

/**
 * Upload image to Cloudinary using Unsigned Upload Preset
 */
export async function uploadToCloudinary(file, { cloudName, uploadPreset } = {}) {
  const config = getCloudinaryConfig();
  const activeCloud = cloudName || config.cloudName;
  const activePreset = uploadPreset || config.uploadPreset;

  if (!activePreset) {
    throw new Error('Please enter your Cloudinary Unsigned Upload Preset in Admin Settings.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', activePreset);
  formData.append('tags', DEFAULT_TAG);
  formData.append('context', `caption=${encodeURIComponent(file.name)}`);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${activeCloud}/image/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || 'Cloudinary upload failed');
  }

  const data = await response.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    format: data.format
  };
}

/**
 * Fetch all images tagged with 'aanuore_portfolio' from Cloudinary
 * Note: In Cloudinary Dashboard -> Settings -> Security -> Ensure "Resource list" is enabled.
 */
export async function fetchCloudinaryPortfolio(cloudName) {
  const activeCloud = cloudName || getCloudinaryConfig().cloudName;
  if (!activeCloud) return null;

  try {
    const response = await fetch(`https://res.cloudinary.com/${activeCloud}/image/list/${DEFAULT_TAG}.json`);
    if (!response.ok) return null;

    const data = await response.json();
    if (data && Array.isArray(data.resources)) {
      return data.resources.map((res, index) => ({
        id: res.public_id,
        image: `https://res.cloudinary.com/${activeCloud}/image/upload/q_auto,f_auto/${res.public_id}.${res.format}`,
        serial: (index + 1).toString().padStart(2, '0'),
        title: `Photograph ${(index + 1).toString().padStart(2, '0')}`,
        createdAt: res.created_at
      }));
    }
  } catch (err) {
    console.warn('Could not fetch Cloudinary image list (using local / bundled images):', err);
  }
  return null;
}
