'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { formatPhoneNumber } from '@/lib/utils';

interface CarModalProps {
  details: {
    name: string;
    seller: string;
    contact: string;
    location: string;
    price: number;
    year: number;
    kilometer: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const CarModal: React.FC<CarModalProps> = ({
  details,
  isOpen,
  onClose
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={`Detalhes - ${details.name} ${details.year}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full items-center justify-center gap-4">
        <div className="mx-auto max-w-md space-y-4 overflow-hidden rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between text-gray-600">
            <span className="font-semibold">Nome:</span>
            <span className="text-gray-800">{details.name}</span>
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <span className="font-semibold">Vendedor:</span>
            <span className="text-gray-800">{details.seller}</span>
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <span className="font-semibold">Contato:</span>
            <span className="text-gray-800">
              {formatPhoneNumber(details.contact)}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <span className="font-semibold">Localização:</span>
            <span className="text-gray-800">{details.location}</span>
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <span className="font-semibold">Preço:</span>
            <span className="text-gray-800">
              {details.price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
              })}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <span className="font-semibold">Ano:</span>
            <span className="text-gray-800">{details.year}</span>
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <span className="font-semibold">Quilometragem:</span>
            <span className="text-gray-800">{details.kilometer} km</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
