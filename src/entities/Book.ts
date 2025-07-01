import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Wishlist } from "./Wishlist";

@Entity("book", { schema: "brilliantemporium" })
export class Book {
  @PrimaryGeneratedColumn({ type: "int", name: "book_id", unsigned: true })
  bookId: number;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("varchar", { name: "author", length: 255 })
  author: string;

  @Column("varchar", { name: "genre", length: 255 })
  genre: string;

  @Column("varchar", { name: "price", length: 45 })
  price: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.book)
  wishlists: Wishlist[];
}
