import '../styles/index.scss';

declare global {
  interface Window { BSCompatibilityLayer: any }
}

class BSCompatibilityLayer {
  init(): void {
    console.log('test');
  }
}

window.BSCompatibilityLayer = new BSCompatibilityLayer();

export default new BSCompatibilityLayer();
