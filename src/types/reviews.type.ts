export interface Review {
  id: string;
  rating: number;
  comment?: string;
  customer: {
    id: string;
    user: {
      name: string;
      image?: string;
    };
  };
}

export interface ReviewFormValues {
  rating: number;
  comment: string;
}
