import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Index("fk_wishlist_book_idx", ["bookId"], {})
@Index("fk_wishlist_user_idx", ["userId"], {})
@Entity("wishlist", { schema: "brilliantemporium" })
export class Wishlist {
  @PrimaryGeneratedColumn({ type: "int", name: "wishlist_id", unsigned: true })
  wishlistId: number;

  @Column("int", { name: "book_id", unsigned: true })
  bookId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Book, (book) => book.wishlists, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "book_id", referencedColumnName: "bookId" }])
  book: Book;

  @ManyToOne(() => User, (user) => user.wishlists, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
