export type MemberType = {
  id: string;
  memberName: string;
}

export type WorkspaceType = {
  id: string;
  workspaceName: string;
  iconImgSrc?: string;
  boards: BoardType[];
  participants?: string[];
}

export type BoardType = {
  id: string;
  boardName: string;
  bgImgSrc?: string;
  lists?: ListType[];
}

export type ListType = {
  id: string;
  listName: string;
  cards?: CardType[];
}

export type CardType = {
  id: string;
  cardName: string;
  description?: string;
  comments?: Comment[];
  participants?: string[];
  deadline?: string;
  attachment?: string;
};

export type CommentType = {
  id: string;
  sender: string;
  comment: string;
};