'use client';

import { ArrowDownUp, MessageCircle, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { useBreakpoint } from '@/hooks/useBreakPoints';
import {
  contactsMockedData,
  ContactType,
  directsMockedData,
  DirectsType,
  directsWithMessagesMockedData,
  DirectType,
  MessageType
} from '@/constants/data';
import { ForwardMessageModal } from './forward-message-modal';

const PAGE_SIZE = 8;

export default function ChatWidget() {
  const breakpoint = useBreakpoint('md');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDirect, setSelectedDirect] = useState<DirectType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatMode, setChatMode] = useState<boolean>(true);

  /* Direct/Conversa aberta no momento */
  const [currentDirect, setCurrentDirect] = useState<DirectType>();

  /* Histórico de directs (lateral do chat) */
  const [directs, setDirects] = useState<DirectsType>(directsMockedData);

  /* Contatos para encaminhar msg (pelo modal de forward message) */
  const [contacts, setContacts] = useState<ContactType[]>(contactsMockedData);

  /* Contatos selecionados para encaminhar msg */
  const [selectedContacts, setSelectedContacts] = useState<ContactType[]>([]);

  const handleForwardMessage = () => {
    setIsModalOpen(true);
  };

  const handleSendForwardedMessage = () => {
    console.log(
      `Mensagem encaminhada para: ${contacts.filter(
        (contacts, i) => contacts.id === selectedContacts[i].id
      )}`
    );
    setIsModalOpen(false);
  };

  const getContacts = (offset: number = 0) => {
    const newContacts = contacts.slice(offset, offset + PAGE_SIZE);

    setContacts((prev) => [...prev, ...newContacts]);
  };

  const toggleContactSelection = (contact: ContactType) => {
    setSelectedContacts((prev) =>
      prev.some((prevContact) => prevContact.id === contact.id)
        ? prev.filter((prevContact) => prevContact.id !== contact.id)
        : [...prev, contact]
    );
  };

  useEffect(() => {
    if (selectedDirect) {
      fetchDirect(selectedDirect.id);
    }
  }, [selectedDirect]);

  const fetchDirect = (directId: number) => {
    const direct = directsWithMessagesMockedData.find(
      (direct) => direct.id === directId
    );

    setCurrentDirect(direct);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-500 focus:outline-none"
        >
          <MessageCircle size={24} />
        </Button>
      )}

      {isOpen && (
        <div className="mt-3 flex h-[600px] overflow-hidden rounded-lg bg-white shadow-xl md:w-[600px]">
          {(breakpoint.isAboveMd || (breakpoint.isBelowMd && !chatMode)) && (
            <div className="overflow-y-auto border-r bg-gray-100 p-4 md:w-1/3">
              <h2 className="mb-3 text-lg font-semibold text-gray-700">
                Conversas
              </h2>
              <div className="space-y-3">
                {breakpoint.isBelowMd && (
                  <Button
                    variant="secondary"
                    className="w-full font-semibold"
                    onClick={() => setChatMode(!chatMode)}
                  >
                    <ArrowDownUp /> {chatMode ? 'Conversas' : 'Chat'}
                  </Button>
                )}
                <div className="mt-4 cursor-pointer text-center font-medium text-blue-500 hover:underline">
                  + Nova Conversa
                </div>
                {directs.map((direct, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedDirect(direct)}
                    className={`cursor-pointer rounded-lg p-3 ${
                      selectedDirect?.id === direct.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <p className="overflow-hidden text-ellipsis text-nowrap text-sm font-medium leading-none">
                        {direct.name}
                      </p>
                      <p className="text-sm">({direct.messagesCount}x)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(breakpoint.isAboveMd || (breakpoint.isBelowMd && chatMode)) && (
            <div className="flex flex-col md:w-2/3">
              <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
                <div>
                  <span className="block font-semibold">
                    {selectedDirect?.name || 'Selecione uma conversa'}
                  </span>
                  {breakpoint.isBelowMd && (
                    <Button
                      variant="secondary"
                      className="font-semibold"
                      onClick={() => setChatMode(!chatMode)}
                    >
                      <ArrowDownUp /> {chatMode ? 'Conversas' : 'Chat'}
                    </Button>
                  )}
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="text-white focus:outline-none"
                >
                  &times;
                </Button>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto p-4">
                {currentDirect && (
                  <>
                    <div className="text-left">
                      {currentDirect.messages
                        ?.filter(
                          (messages) => messages.type === MessageType.From
                        )
                        .map((message, index) => (
                          <div
                            key={index}
                            className="relative rounded-lg bg-gray-100 p-3 text-gray-700"
                          >
                            {message.text}
                            <DropdownMenu>
                              <DropdownMenuTrigger className="absolute right-2 top-1">
                                <MoreHorizontal size={16} />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={handleForwardMessage}
                                >
                                  Encaminhar mensagem
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                    </div>

                    <div className="text-right">
                      {currentDirect.messages
                        ?.filter((messages) => messages.type === MessageType.To)
                        .map((message, index) => (
                          <div
                            key={index}
                            className="relative rounded-lg bg-blue-600 p-3 text-white"
                          >
                            {message.text}
                            <DropdownMenu>
                              <DropdownMenuTrigger className="absolute right-2 top-1">
                                <MoreHorizontal size={16} />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={handleForwardMessage}
                                >
                                  Encaminhar mensagem
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center border-t p-3">
                <input
                  type="text"
                  placeholder="Escreva sua mensagem..."
                  className="h-12 flex-1 rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="ml-3 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
                  Enviar
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal para Encaminhar Mensagem */}
      <ForwardMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contacts={contacts}
        selectedContacts={selectedContacts}
        toggleContactSelection={toggleContactSelection}
        onConfirm={handleSendForwardedMessage}
        onNext={getContacts}
      />
    </div>
  );
}
