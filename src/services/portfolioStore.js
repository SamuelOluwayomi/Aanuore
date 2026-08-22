import { fetchCloudinaryPortfolio, getCloudinaryConfig } from './cloudinaryService';

// Initial bundled portfolio images
export const DEFAULT_IMAGES = [
  { id: 'wa-0073', image: '/pictures/IMG-20260814-WA0073.jpg', serial: '01', title: 'Studio Session 01', source: 'github', enabled: true },
  { id: 'wa-0039', image: '/pictures/IMG-20260814-WA0039.jpg', serial: '02', title: 'Studio Session 02', source: 'github', enabled: true },
  { id: 'wa-0090', image: '/pictures/IMG-20260814-WA0090.jpg', serial: '03', title: 'Studio Session 03', source: 'github', enabled: true },
  { id: 'wa-0067', image: '/pictures/IMG-20260814-WA0067.jpg', serial: '04', title: 'Editorial 04', source: 'github', enabled: true },
  { id: 'wa-0092', image: '/pictures/IMG-20260814-WA0092.jpg', serial: '05', title: 'Editorial 05', source: 'github', enabled: true },
  { id: 'wa-0066', image: '/pictures/IMG-20260814-WA0066.jpg', serial: '06', title: 'Portrait 06', source: 'github', enabled: true },
  { id: 'wa-0098', image: '/pictures/IMG-20260814-WA0098.jpg', serial: '07', title: 'Portrait 07', source: 'github', enabled: true },
  { id: 'wa-0096', image: '/pictures/IMG-20260814-WA0096.jpg', serial: '08', title: 'Portrait 08', source: 'github', enabled: true },
  { id: 'wa-0075', image: '/pictures/IMG-20260814-WA0075.jpg', serial: '09', title: 'Creative Session 09', source: 'github', enabled: true },
  { id: 'wa-0106', image: '/pictures/IMG-20260814-WA0106.jpg', serial: '10', title: 'Creative Session 10', source: 'github', enabled: true },
  { id: 'wa-0053', image: '/pictures/IMG-20260814-WA0053.jpg', serial: '11', title: 'Commercial 11', source: 'github', enabled: true },
  { id: 'wa-0071', image: '/pictures/IMG-20260814-WA0071.jpg', serial: '12', title: 'Commercial 12', source: 'github', enabled: true },
  { id: 'wa-0084', image: '/pictures/IMG-20260814-WA0084.jpg', serial: '13', title: 'Commercial 13', source: 'github', enabled: true },
  { id: 'wa-0091', image: '/pictures/IMG-20260814-WA0091.jpg', serial: '14', title: 'On Location 14', source: 'github', enabled: true },
  { id: 'wa-0099', image: '/pictures/IMG-20260814-WA0099.jpg', serial: '15', title: 'On Location 15', source: 'github', enabled: true },
  { id: 'wa-0100', image: '/pictures/IMG-20260814-WA0100.jpg', serial: '16', title: 'On Location 16', source: 'github', enabled: true },
  { id: 'wa-0103', image: '/pictures/IMG-20260814-WA0103.jpg', serial: '17', title: 'Editorial 17', source: 'github', enabled: true },
  { id: 'wa-0105', image: '/pictures/IMG-20260814-WA0105.jpg', serial: '18', title: 'Editorial 18', source: 'github', enabled: true },
  { id: 'wa-0107', image: '/pictures/IMG-20260814-WA0107.jpg', serial: '19', title: 'Editorial 19', source: 'github', enabled: true }
];

const STORAGE_KEY = 'aanuore_portfolio_images_v2';

class PortfolioStore {
  constructor() {
    this.listeners = new Set();
    this.images = this.loadImages();
    this.syncLiveCatalog();
  }

  loadImages() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter((img) => img.enabled !== false);
        }
      }
    } catch (err) {
      console.warn('Failed to load portfolio images from storage:', err);
    }
    return [...DEFAULT_IMAGES];
  }

  async syncLiveCatalog() {
    // Fetch from Cloudinary tag list — source of truth for uploaded photos
    const config = getCloudinaryConfig();
    if (!config.cloudName) return;

    const cloudImages = await fetchCloudinaryPortfolio(config.cloudName);
    if (cloudImages && cloudImages.length > 0) {
      const existingIds = new Set(cloudImages.map((c) => c.id));
      const nonCloud = this.images.filter((img) => !existingIds.has(img.id));
      this.saveImages([...cloudImages, ...nonCloud]);
    }
  }

  saveImages(images) {
    this.images = images.map((item, idx) => ({
      ...item,
      serial: (idx + 1).toString().padStart(2, '0')
    }));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.images));
    } catch (err) {
      console.warn('Failed to persist portfolio images to storage:', err);
    }
    this.notify();
  }

  getImages() {
    return this.images;
  }

  addImage(imageUrl, title = '', id = null) {
    const newItem = {
      id: id || ('img_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)),
      image: imageUrl,
      serial: (this.images.length + 1).toString().padStart(2, '0'),
      title: title || `Photograph ${(this.images.length + 1).toString().padStart(2, '0')}`,
      createdAt: new Date().toISOString()
    };
    this.saveImages([newItem, ...this.images]); // Add to beginning of showcase
    return newItem;
  }

  deleteImage(id) {
    const filtered = this.images.filter((img) => img.id !== id);
    this.saveImages(filtered);
  }

  moveImage(fromIndex, toIndex) {
    if (toIndex < 0 || toIndex >= this.images.length) return;
    const reordered = [...this.images];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    this.saveImages(reordered);
  }

  resetToDefaults() {
    this.saveImages([...DEFAULT_IMAGES]);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.images));
  }
}

export const portfolioStore = new PortfolioStore();

