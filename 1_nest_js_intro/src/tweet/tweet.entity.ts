import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Hashtag } from 'src/hashtag/hashtag.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.tweets)
  user: User;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.tweets)
  @JoinTable({
    name: 'tweets_hashtags',
    joinColumn: {
      name: 'tweet_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'hashtag_id',
      referencedColumnName: 'id',
    },
  })
  hashtags: Hashtag[];

  @CreateDateColumn()
  createdAt: Date;
}
