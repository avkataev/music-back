import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';

@Entity({
  name: 'artists',
})
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  dateStart?: number;
  @Column({ nullable: true })
  type?: string;
  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  genres?: string[];
  @Column({ nullable: true })
  description?: string;
  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  countries?: string[];
  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  cities?: string[];
  @Column({ nullable: true })
  imageUrl?: string;
  @ManyToMany(() => AlbumEntity, (album) => album.artists, {})
  albums: AlbumEntity[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
