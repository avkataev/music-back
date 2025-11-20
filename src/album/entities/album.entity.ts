import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';

@Entity({ name: 'albums' })
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  releaseYear: number;
  @Column({ nullable: true })
  coverUrl?: string;
  @Column({ type: 'int', nullable: true })
  duration?: number;

  @ManyToMany(() => ArtistEntity, (artist) => artist.albums, {
    cascade: false,
  })
  @JoinTable({
    name: 'album_performers', // название таблицы-связки
    joinColumn: {
      name: 'album_id', // поле, указывающее на Album
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'performer_id', // поле, указывающее на Performer
      referencedColumnName: 'id',
    },
  })
  artists: ArtistEntity[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
