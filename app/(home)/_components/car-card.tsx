'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card';
import { formatPhoneNumber } from '@/lib/utils';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale';
import Image from 'next/image';
import { CarModal } from './car-modal';
import { useState } from 'react';

export default function CarCard({
  title,
  description,
  seller,
  contact,
  price,
  publishedAt
}: {
  title: string;
  seller: string;
  contact: string;
  description: string;
  price: number;
  publishedAt: Date;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CarModal
        details={{
          name: title,
          seller,
          contact,
          price,
          year: 2022,
          kilometer: 3243.2,
          location: 'São Paulo, Brazil'
        }}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <Card className="w-full  overflow-hidden rounded-lg shadow-lg">
        <Image
          src="/vercel.svg"
          alt="Card Image"
          className="h-48 w-full object-cover"
          width="300"
          height="200"
          style={{ objectFit: 'contain' }}
        />
        <CardContent className="space-y-4 p-6">
          <div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="text-gray-500">
              <span className="block">Anunciante: {seller}</span>
              <span className="block">
                Contato: {formatPhoneNumber(contact)}
              </span>
              {description}
              <span className="mt-2 block">
                {format(publishedAt, 'dd.MM.yyyy HH:mm', { locale: fi })}
              </span>
            </CardDescription>
            <CardDescription className="mt-2 text-lg font-bold text-blue-600">
              {price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
              })}
            </CardDescription>
          </div>
          <div className="flex items-center justify-between">
            <Button className="bg-blue-600 text-white hover:bg-blue-500">
              Adicionar ao carrinho
            </Button>
            <Button onClick={() => setOpen(true)}>Mais detalhes</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
