import InfiniteScroll from 'react-infinite-scroll-component';
import { Modal } from '../ui/modal';
import { ContactType } from '@/constants/data';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatCurrency } from '@/lib/utils';

interface ForwardMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onNext: (offset: number) => void;
  toggleContactSelection: (contact: ContactType) => void;
  selectedContacts: ContactType[];
  contacts: ContactType[];
}

export function ForwardMessageModal({
  isOpen,
  onClose,
  onConfirm,
  onNext,
  toggleContactSelection,
  contacts,
  selectedContacts
}: ForwardMessageModalProps) {
  const taxPerContact = 5;

  return (
    <Modal title="Encaminhar Mensagem" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center p-4">
        <div className="mb-4 flex w-full">
          <p className="rounded-md bg-blue-100 px-3 py-1 font-semibold text-blue-700 shadow-sm">
            Cotação: {formatCurrency(selectedContacts.length * taxPerContact)}
          </p>
        </div>
        <div
          id="scrollableArea"
          className="flex max-h-72 w-full flex-col overflow-y-auto rounded-lg border-2 p-4 shadow-lg"
        >
          <p className="mb-2 font-semibold">
            Selecione os contatos para encaminhar a mensagem
          </p>
          <InfiniteScroll
            dataLength={contacts.length}
            next={() => onNext(contacts.length)}
            hasMore={true}
            loader={
              <div className="flex items-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Carregando
              </div>
            }
            scrollableTarget="scrollableArea"
          >
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between border-b py-2 last:border-b-0"
              >
                <div className="flex items-center">
                  <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage
                      src={contact.product?.images?.[0].url}
                      alt="Avatar"
                    />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {contact.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {contact.product?.title}
                    </p>
                  </div>
                </div>
                <Checkbox
                  key={selectedContacts.length}
                  checked={selectedContacts.includes(contact)}
                  onCheckedChange={() => toggleContactSelection(contact)}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
        <Button onClick={onConfirm} className="mt-4 bg-blue-600 text-white">
          Encaminhar Mensagem
        </Button>
      </div>
    </Modal>
  );
}
