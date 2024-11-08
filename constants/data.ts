import { NavItem } from '@/types';

export type CarType = {
  seller: string;
  contact: string;
  title: string;
  description: string;
  price: number;
  publishedAt: Date;
  images: [
    {
      id: string;
      url: string;
    }
  ];
};

export enum MessageType {
  From = 'from',
  To = 'to'
}

export type DirectType = {
  id: number;
  name: string;
  phone: string;
  messages?: {
    type: MessageType;
    text: string;
  }[];
  messagesCount: number;
};

export type DirectsType = {
  id: number;
  name: string;
  phone: string;
  messagesCount: number;
}[];

export const directsWithMessagesMockedData: DirectType[] = [
  {
    id: 1,
    name: 'Alice Silva',
    phone: '11987654321',
    messagesCount: 23,
    messages: [
      {
        type: MessageType.From,
        text: 'mensagem de texto recebida, olá como vai?'
      },
      {
        type: MessageType.To,
        text: 'mensagem de texto enviada, olá como vai?'
      }
    ]
  },
  {
    id: 2,
    name: 'Bruno Costa',
    phone: '11987654322',
    messagesCount: 2,
    messages: [
      {
        type: MessageType.From,
        text: 'Olá, como está você?'
      },
      {
        type: MessageType.To,
        text: 'Estou bem, obrigado!'
      }
    ]
  },
  {
    id: 3,
    name: 'Carla Pereira',
    phone: '11987654323',
    messagesCount: 16,
    messages: [
      {
        type: MessageType.To,
        text: 'Oi, tudo certo?'
      }
    ]
  }
];

export const directsMockedData: DirectsType = [
  {
    id: 1,
    name: 'Alice Silva',
    phone: '11987654321',
    messagesCount: 23
  },
  {
    id: 2,
    name: 'Bruno Costa',
    phone: '11987654322',
    messagesCount: 2
  },
  {
    id: 3,
    name: 'Carla Pereira',
    phone: '11987654323',
    messagesCount: 16
  },
  {
    id: 4,
    name: 'Diego Santos',
    phone: '11987654324',
    messagesCount: 22
  },
  {
    id: 5,
    name: 'Elaine Rocha',
    phone: '11987654325',
    messagesCount: 5
  },
  {
    id: 6,
    name: 'Fernando Almeida',
    phone: '11987654326',
    messagesCount: 3
  },
  {
    id: 7,
    name: 'Gabriela Souza',
    phone: '11987654327',
    messagesCount: 14
  }
];

export type ContactType = {
  id: number;
  name: string;
  phone: string;
  product?: CarType;
};

export const contactsMockedData: ContactType[] = [
  {
    id: 1,
    name: 'Alice Silva',
    phone: '11987654321',
    product: {
      seller: 'Alice Veículos',
      contact: '11987654321',
      title: 'Sedan Executivo',
      description: 'Um sedan confortável com ótimo desempenho.',
      price: 95000,
      publishedAt: new Date('2024-02-01'),
      images: [
        {
          id: 'img1',
          url: 'https://example.com/sedan.jpg'
        }
      ]
    }
  },
  {
    id: 2,
    name: 'Bruno Costa',
    phone: '11987654322',
    product: {
      seller: 'Bruno Automóveis',
      contact: '11987654322',
      title: 'Hatch Compacto',
      description: 'Veículo econômico ideal para a cidade.',
      price: 45000,
      publishedAt: new Date('2024-02-10'),
      images: [
        {
          id: 'img2',
          url: 'https://example.com/hatch.jpg'
        }
      ]
    }
  },
  {
    id: 3,
    name: 'Carla Pereira',
    phone: '11987654323',
    product: {
      seller: 'Carla Motors',
      contact: '11987654323',
      title: 'SUV de Luxo',
      description: 'SUV com alto desempenho e interior luxuoso.',
      price: 120000,
      publishedAt: new Date('2024-03-05'),
      images: [
        {
          id: 'img3',
          url: 'https://example.com/suv.jpg'
        }
      ]
    }
  },
  {
    id: 4,
    name: 'Diego Santos',
    phone: '11987654324',
    product: {
      seller: 'Diego Autos',
      contact: '11987654324',
      title: 'Picape Off-Road',
      description: 'Ideal para aventuras fora da estrada.',
      price: 150000,
      publishedAt: new Date('2024-03-15'),
      images: [
        {
          id: 'img4',
          url: 'https://example.com/picape.jpg'
        }
      ]
    }
  },
  {
    id: 5,
    name: 'Elaine Rocha',
    phone: '11987654325',
    product: {
      seller: 'Elaine Veículos',
      contact: '11987654325',
      title: 'Conversível Esportivo',
      description: 'Carro conversível para aproveitar o verão.',
      price: 200000,
      publishedAt: new Date('2024-04-01'),
      images: [
        {
          id: 'img5',
          url: 'https://example.com/conversivel.jpg'
        }
      ]
    }
  },
  {
    id: 6,
    name: 'Fernando Almeida',
    phone: '11987654326',
    product: {
      seller: 'Fernando Carros',
      contact: '11987654326',
      title: 'Moto Custom',
      description: 'Moto customizada com estilo único.',
      price: 75000,
      publishedAt: new Date('2024-04-10'),
      images: [
        {
          id: 'img6',
          url: 'https://example.com/moto.jpg'
        }
      ]
    }
  },
  {
    id: 7,
    name: 'Gabriela Souza',
    phone: '11987654327',
    product: {
      seller: 'Gabriela Automóveis',
      contact: '11987654327',
      title: 'Van de Passageiros',
      description: 'Van espaçosa para transporte de passageiros.',
      price: 90000,
      publishedAt: new Date('2024-04-15'),
      images: [
        {
          id: 'img7',
          url: 'https://example.com/van.jpg'
        }
      ]
    }
  }
];

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Employee',
    url: '/dashboard/employee',
    icon: 'user',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen'
      },
      {
        title: 'Login',
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    isActive: false,
    items: [] // No child items
  }
];
