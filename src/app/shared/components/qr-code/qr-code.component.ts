import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent {

  /**
   * The URL the QR Code will be targeting
   *
   * This should be the current URL so that it can still work even if hosting
   * differs
   */
  public readonly targetUrl = window.location.href;

  /**
   * Save the image wrapped by the wrapper to the device
   * @param qrCodeWrapper HTML Element wrapping the QR Code's image
   */
  openAsImage(qrCodeWrapper: any) {
    const qrCodeImage = qrCodeWrapper
      .qrcElement
      .nativeElement
      .querySelector('img')
      .src;

    const extracted = this.toBase64(qrCodeImage);

    const encodedImage = new Blob([extracted], { type: 'image/png' });
    this.openInANewTab(encodedImage);
  }

  /**
   * Download the provided blob
   * @param blob Content to be downloaded
   */
  private openInANewTab(blob: Blob): void {
    // Prepare the link that will be used to trigger the download
    const link = document.createElement('a');

    // Pass the image as an object URL as the target
    const url = window.URL.createObjectURL(blob);

    // Open the resulting image in a new tab
    window.open(url);
  }

  /**
   * Extract the image from the provided element and convert is to base 64
   * @param imageElement Extracted source of the image
   * @returns A Blob containing the digested image
   */
  private toBase64(imageElement: any): Blob {
    const parts = imageElement.split(';base64,');

    const decodedData = window.atob(parts[1]);
    const decoded = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; ++i) {
      decoded[i] = decodedData.charCodeAt(i);
    }

    const imageType = parts[0].split(':')[1];
    return new Blob([decoded], { type: imageType });
  }

}
