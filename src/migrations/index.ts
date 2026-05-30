import * as migration_20260530_171804 from './20260530_171804';

export const migrations = [
  {
    up: migration_20260530_171804.up,
    down: migration_20260530_171804.down,
    name: '20260530_171804'
  },
];
