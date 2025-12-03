import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from 'prisma/config';
import { seedArtists } from './seeds/artist.seed';
import { seedAlbums } from './seeds/album.seed';
import { seedTracks } from './seeds/track.seed';

const connectionString = env('POSTGRES_URI');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  await prisma.artist.deleteMany()
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE artists_id_seq RESTART WITH 1`);
  await prisma.artist.createMany({ data: seedArtists });
  await prisma.album.deleteMany()
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE albums_id_seq RESTART WITH 1`);
  await prisma.album.createMany({ data: seedAlbums });

  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (1, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (2, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (3, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (4, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (5, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (6, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (7, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (8, 1)`);

  await prisma.$executeRawUnsafe(`ALTER SEQUENCE tracks_id_seq RESTART WITH 1`);
  await prisma.track.deleteMany()
  await prisma.track.createMany({ data: seedTracks });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })