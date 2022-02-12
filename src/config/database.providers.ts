import { createConnection } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATABASE_CONNECTION',
//     useFactory: async () =>
//       await createConnection({
//         type: 'mysql',
//         host: 'localhost',
//         port: 3306,
//         username: 'root',
//         password: '',
//         database: 'nesttest',
//         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//         synchronize: true,
//         migrationsRun: false,
//       }),
//   },
// ];

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        url: 'postgres://ykwweiypamzxxu:dab6f2e4596e6316c3753731ca3f4fe189515852ec0a0661c3412ca89a83955b@ec2-34-194-171-47.compute-1.amazonaws.com:5432/d10rrks7l6u9ic',
        type: 'postgres',
        host: 'ec2-34-194-171-47.compute-1.amazonaws.com',
        port: 5432,
        username: 'ykwweiypamzxxu',
        password:
          'dab6f2e4596e6316c3753731ca3f4fe189515852ec0a0661c3412ca89a83955b',
        database: 'd10rrks7l6u9ic',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        migrationsRun: false,
      }),
  },
];

// export const databaseProviders = [
//   {
//     provide: 'DATABASE_CONNECTION',
//     useFactory: async () =>
//       await createConnection({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5432,
//         username: 'postgres',
//         password: 'sql',
//         database: 'nesttest',
//         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//         synchronize: true,
//         migrationsRun: false,
//       }),
//   },
// ];
