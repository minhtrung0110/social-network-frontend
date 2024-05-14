/*-----------POST CARD-------------*/
import { MoreActionType } from '@/types/common';

export const ACTIONS_POST_CARD: MoreActionType[] = [
  {
    key: 1,
    action: 'save',
    label: 'Save',
    onAction: () => {
    },
  },
  {
    key: 1,
    action: 'share',
    label: 'Share',
    onAction: () => {
    },
  },
  {
    key: 1,
    action: 'go-to-post',
    label: 'Go to Post',
    onAction: () => {
    },
  },
];
export const listComments = [
  {
    id: 1,
    content: 'should have made the car the same way they made the helmet',
    userId: 1,
    user: {
      id: 1,
      username: 'user1',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714065670486_42363032_116216219344284_1732310080281378816_n.jpg?alt=media',
    },
    postId: 1,
    replyId: null,
    updatedAt: new Date(),
  },
  {
    id: 2,
    content: 'When the helmet looks better than the car… 🫣',
    userId: 2,
    user: {
      id: 2,
      username: 'user2',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714065670486_42363032_116216219344284_1732310080281378816_n.jpg?alt=media',
    },
    postId: 1,
    replyId: null,
    updatedAt: new Date(),
  },
  {
    id: 3,
    content: 'It\'s giving lightning mqueen dinaco 💙❤️',
    userId: 10,
    user: {
      id: 10,
      username: 'user10',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714065670486_42363032_116216219344284_1732310080281378816_n.jpg?alt=media',
    },
    postId: 1,
    replyId: null,
    updatedAt: new Date(),
  },
  {
    id: 4,
    content:
      'Ohhh @charles_leclerc that was a great donut back in P1 😂 wish you 1st place this weekend 🙌🔥',
    userId: 10,
    user: {
      id: 10,
      username: 'user10',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714065670486_42363032_116216219344284_1732310080281378816_n.jpg?alt=media',
    },
    postId: 1,
    replyId: null,
    updatedAt: new Date(),
  },
  {
    id: 5,
    content:
      'Everyone hating on the car have all ready the rumours wrong. As it was said to have shades of blue. And the car looks good btw',
    userId: 10,
    user: {
      id: 10,
      username: 'user10',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714065670486_42363032_116216219344284_1732310080281378816_n.jpg?alt=media',
    },
    postId: 1,
    replyId: null,
    updatedAt: new Date(),
  },
  {
    id: 6,
    content: 'The Red Bull gives you wiiings!🪽😉\n' + '\n' + '@jschk.zsozso @redbullracing❤️',
    userId: 10,
    user: {
      id: 10,
      username: 'user10',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714065670486_42363032_116216219344284_1732310080281378816_n.jpg?alt=media',
    },
    postId: 1,
    replyId: null,
    updatedAt: new Date(),
  },
  {
    id: 7,
    content:
      'E Leclerc e melhor você começar há reagir porque o Sainz está jantando você sem dó 😂😂😂😂',
    userId: 10,
    user: {
      id: 10,
      username: 'user10',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714065670486_42363032_116216219344284_1732310080281378816_n.jpg?alt=media',
    },
    postId: 1,
    replyId: null,
    updatedAt: new Date(),
  },
  {
    id: 8,
    content:
      'E Leclerc e melhor você começar há reagir porque o Sainz está jantando você sem dó 😂😂😂😂',
    userId: 10,
    user: {
      id: 10,
      username: 'user10',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714065670486_42363032_116216219344284_1732310080281378816_n.jpg?alt=media',
    },
    postId: 1,
    replyId: 2,
    updatedAt: new Date(),
  },
  {
    id: 9,
    content:
      'E Leclerc e melhor você começar há reagir porque o Sainz está jantando você sem dó 😂😂😂😂',
    userId: 10,
    user: {
      id: 10,
      username: 'user10',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714065670486_42363032_116216219344284_1732310080281378816_n.jpg?alt=media',
    },
    postId: 1,
    replyId: 2,
    updatedAt: new Date(),
  },
  {
    id: 10,
    content: 'Comment 10',
    userId: 10,
    user: {
      id: 10,
      username: 'user10',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714065670486_42363032_116216219344284_1732310080281378816_n.jpg?alt=media',
    },
    postId: 1,
    replyId: null,
    updatedAt: new Date(),
  },
  {
    id: 11,
    content: 'Reply 4',
    userId: 10,
    user: {
      id: 10,
      username: 'user10',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714065670486_42363032_116216219344284_1732310080281378816_n.jpg?alt=media',
    },
    postId: 1,
    replyId: 4,
    updatedAt: new Date(),
  },
];

export const TEMP_LIST_POST = [
  {
    id: 5,
    caption: 'Beach saide',
    tags: 'vintage, beach',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1715249630510_261167.jpg?alt=media',
    scope: 'public',
    _count: {
      Like: 1,
      comments: 2,
    },
    createdAt: '2024-04-25T16:50:28.431Z',
    updatedAt: '2024-05-09T10:14:55.722Z',
    status: 1,
  },
  {
    id: 4,
    caption: 'The beautiful of the sea. You and me . Love you so much ',
    tags: 'vintage, beach',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714676402941_7.jpg?alt=media',
    scope: 'public',
    _count: {
      Like: 1,
      comments: 14,
    },
    createdAt: '2024-04-25T04:44:02.503Z',
    updatedAt: '2024-05-02T19:00:04.463Z',
    status: 1,
  },
  {
    id: 6,
    caption: 'Tan Tuc Highschool Memmories ',
    tags: 'highschool',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714365913655_MixIMG.jpeg?alt=media',
    scope: 'public',
    _count: {
      Like: 2,
      comments: 1,
    },
    createdAt: '2024-04-25T17:00:45.668Z',
    updatedAt: '2024-05-09T09:02:47.146Z',
    status: 1,
  },
  {
    id: 2,
    caption: 'The SF90 Stradale delivers the most efficient aerodynamic performance of any road-going car in Ferrari\'s history, making it comparable only to that of the LaFerrari supercar.',
    tags: 'hy',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714677661085_wp4570855.jpg?alt=media',
    scope: 'public',
    _count: {
      Like: 3,
      comments: 5,
    },
    createdAt: '2024-04-20T08:36:56.104Z',
    updatedAt: '2024-05-02T19:21:02.317Z',
    status: 1,
  },
];
