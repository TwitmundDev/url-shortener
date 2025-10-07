import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // Remplace "any" par le type de ton payload JWT si besoin
  }
}

