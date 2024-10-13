import { useState } from 'react';
import { BarcodeScanner } from '@thewirv/react-barcode-scanner';
import React from 'react';

export const BarcodeScannerComponent = ({ onScan }) => {
  const [data, setData] = useState('No result');

  const handleScanSuccess = (text) => {
    setData(text);
    onScan(text);  // Enviar el texto escaneado al componente padre
  };

  return (
    <>
      <BarcodeScanner
        onSuccess={handleScanSuccess}
        onError={(error) => {
          if (error) {
            console.error(error.message);
          }
        }}
        onLoad={() => console.log('Video feed has loaded!')}
        containerStyle={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  );
};

export default BarcodeScannerComponent;
