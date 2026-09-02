export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
  dates?: {
    maximum: string;
    minimum: string;
  };
}

export interface TMDBErrorResponse {
  status_code: number;
  status_message: string;
  success?: boolean;
}

export interface PaginationParams {
  page?: number;
  language?: string;
  region?: string;
}
