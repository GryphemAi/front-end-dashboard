'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GalleryVerticalEnd } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
import ThemeToggle from './ThemeToggle/theme-toggle';

export const company = {
  name: 'Auto Shop',
  logo: GalleryVerticalEnd
};

export default function AppTopbar({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 items-center justify-between p-2 bg-sidebar">
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground items-center">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <company.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{company.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={session?.user?.image || ''}
                alt={session?.user?.name || ''}
              />
              <AvatarFallback className="rounded-lg">
                {session?.user?.name?.slice(0, 2)?.toUpperCase() || 'CN'}
              </AvatarFallback>
            </Avatar>
          ) : (
            <>
              <Link href="/login" className="text-sm">
                Login
              </Link>
              <Link href="/register" className="text-sm">
                Registro
              </Link>
            </>
          )}
          <div className="flex items-center gap-2 px-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
