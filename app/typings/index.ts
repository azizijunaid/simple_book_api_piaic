export type BookResponse = {
  author_id: string;
  book_name: string;
  created_at?: Date;
  published_at?: Date;
}

export type Params = {
  bookId?: string;
};



export type OrderResource = {
  createdBy?: string;
  bookId: string;
  customer_name: string;
  quantity?: number;
}

export type OrderBody = {
  createdBy?: string;
  bookId: string;
  customer_name: string;
  quantity?: number;
}
