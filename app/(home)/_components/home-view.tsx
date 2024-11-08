'use client';

import { Metadata } from 'next';
import CarCard from './car-card';
import ChatWidget from '@/components/chat/chat-widget';
import { CarType } from '@/constants/data';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

export const metadata: Metadata = {
  title: 'Homepage view',
  description: 'Selling cars homepage view.'
};

// Configuração de página e quantidade de itens por página
const PAGE_SIZE = 8;

// Função para simular a obtenção de carros com paginação
const getCars = (offset: number = 0): { results: CarType[] } => {
  const cars = Array.from(
    { length: PAGE_SIZE },
    (_, i) =>
      ({
        seller: 'Next',
        contact: '358406576544',
        title: `Carro Modelo ${i + 1 + offset}`,
        description: 'Descrição breve do produto.',
        price: 99.99 + i,
        publishedAt: new Date(),
        images: [
          {
            id: String(i),
            url: ''
          }
        ]
      }) as CarType
  );

  return { results: cars };
};

const CarList = ({ cars }: { cars: CarType[] }) => {
  return (
    <>
      {cars.map((car, index) => (
        <CarCard
          key={index}
          seller={car.seller}
          contact={car.contact}
          title={car.title}
          description={car.description}
          price={car.price}
          publishedAt={car.publishedAt}
        />
      ))}
    </>
  );
};

export default function HomeView() {
  const initialCars = getCars(0);
  const [cars, setCars] = useState<CarType[]>(initialCars.results);

  const loadMore = () => {
    const carsData = getCars(cars.length);

    setCars((prevCars) => [...prevCars, ...carsData.results]);
  };

  return (
    <div
      id="scrollable-container"
      className="h-[calc(100dvh-52px)] overflow-y-auto"
    >
      <div className="mx-6 h-full space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Ofertas 👋</h2>
        </div>
        <div>
          <div className="w-full">
            <InfiniteScroll
              className="grid h-full w-full grid-cols-1 place-items-center gap-6 gap-y-24 md:grid-cols-4"
              dataLength={cars.length}
              next={() => loadMore()}
              hasMore={true}
              scrollThreshold={0.9}
              loader={
                <div className="flex items-center">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Carregando
                </div>
              }
              scrollableTarget="scrollable-container"
            >
              <CarList cars={cars} />
            </InfiniteScroll>
          </div>
        </div>
        <ChatWidget />
      </div>
    </div>
  );
}
