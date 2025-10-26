import {
  branch_options,
  club_dept_options,
  position_options,
} from '@prisma/client';
import { JWT } from 'jsonwebtoken';
import { User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      info?: User;
      token: JWT;
    };
  }

  interface User {
    id: string;
    rollNo: string;
    image: string?;
    name: string?;
    branch: branch_options?;
    position: position_options?;
    clubDept?: club_dept_options[]?;
    joinedAt?: Date;
    batch?: string?;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
  }
}
