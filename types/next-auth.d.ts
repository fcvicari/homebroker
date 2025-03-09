import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      name: string
      email: string
      avatar: string
      accessToken: string
    }
  }
}
