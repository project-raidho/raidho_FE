export interface MainProps extends MainContentProps {
  pageParams?: undefined | number;
  content?: MainContentProps[];
  last?: boolean;
  nextPage?: number;
}

export interface MainContentProps {
  id: number;
  commentCount: number;
  createdAt?: string;
  heartCount: number;
  isHeartMine: boolean;
  isImages: boolean;
  memberImage: string;
  memberName: string;
  modifiedAt?: string;
  multipartFiles: string;
}
