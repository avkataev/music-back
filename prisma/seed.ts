import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from 'prisma/config';
import { seedArtists } from './seeds/artist.seed';
import { seedAlbums } from './seeds/album.seed';
import { seedTracks } from './seeds/track.seed';
import { seedGenres } from './seeds/genre.seed';
import { seedConcerts } from './seeds/concert.seed';
import { seedNews } from './seeds/news.seed';

const connectionString = env('POSTGRES_URI');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  // Очищаем и сбрасываем последовательности
  await prisma.track.deleteMany();
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE tracks_id_seq RESTART WITH 1`);
  
  await prisma.albumRating.deleteMany();
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE album_ratings_id_seq RESTART WITH 1`);
  
  await prisma.artistLike.deleteMany();
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE artist_likes_id_seq RESTART WITH 1`);
  
  await prisma.news.deleteMany();
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE news_id_seq RESTART WITH 1`);
  
  await prisma.concert.deleteMany();
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE concerts_id_seq RESTART WITH 1`);

  await prisma.genre.deleteMany();
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE genres_id_seq RESTART WITH 1`);
  
  await prisma.album.deleteMany();
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE albums_id_seq RESTART WITH 1`);
  
  await prisma.artist.deleteMany();
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE artists_id_seq RESTART WITH 1`);

  // 1. Создаем жанры
  console.log('🎵 Создание жанров...');
  await prisma.genre.createMany({ data: seedGenres });
  console.log(`✅ Создано ${seedGenres.length} жанров`);

  // 2. Создаем артистов
  console.log('🎤 Создание артистов...');
  await prisma.artist.createMany({ data: seedArtists });
  console.log(`✅ Создано ${seedArtists.length} артистов`);

  // 3. Создаем альбомы
  console.log('💿 Создание альбомов...');
  await prisma.album.createMany({ data: seedAlbums });
  console.log(`✅ Создано ${seedAlbums.length} альбомов`);

  // 4. Создаем связи артист-альбом
  console.log('🔗 Создание связей артист-альбом...');
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (1, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (2, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (3, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (4, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (5, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (6, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (7, 1)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "_artist_albums" ("A", "B") VALUES (8, 1)`);
  console.log('✅ Создано 8 связей артист-альбом');

  // 5. Создаем треки
  console.log('🎶 Создание треков...');
  await prisma.track.createMany({ data: seedTracks });
  console.log(`✅ Создано ${seedTracks.length} треков`);

  // 6. Создаем концерты
  console.log('🎸 Создание концертов...');
  await prisma.concert.createMany({ data: seedConcerts });
  console.log(`✅ Создано ${seedConcerts.length} концертов`);

  // 7. Создаем новости (привязываем к артистам)
  console.log('📰 Создание новостей...');
  await prisma.news.createMany({ data: seedNews });
  console.log(`✅ Создано ${seedNews.length} новостей`);
}

main()
  .then(async () => {
    console.log('🎉 Сидирование завершено успешно!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Ошибка при сидировании:', e);
    await prisma.$disconnect();
    process.exit(1);
  });