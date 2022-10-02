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

export interface MeetingContentProps {
  createdAt?: null | string;
  departLocation: string;
  desc: string;
  endDate: string;
  id: number;
  isAlreadyJoin: boolean;
  isMine: boolean;
  isStarMine: boolean;
  meetingStatus: number;
  meetingTags: string[];
  memberCount: number;
  memberImage: string;
  memberName: string;
  modifiedAt?: null | string;
  people: number;
  roomCloseDate: string;
  startDate: string;
  themeCategory: string;
  title: string;
  themeList: ThemeListProps[];
  onClickTheme: (theme: string) => Promise<void>;
}

export interface ThemeListProps {
  themeName: string;
  themeImage: string;
  themePath: string;
}
