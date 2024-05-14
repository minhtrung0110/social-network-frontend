import { UseFormSetError } from 'react-hook-form';
import { EntityError } from '@/utils/http';
// @ts-ignore
import jwt from 'jsonwebtoken';

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach(item => {
      setError(item.field, {
        type: 'server',
        message: item.message,
      });
    });
  } else {
    return error;
  }
};

/**
 * Removes a leading slash from a path if it exists.
 * @param {string} path The path to normalize.
 * @returns {string} The normalized path.
 */
export const normalizePath = (path: string): string => {
  return path.startsWith('/') ? path.slice(1) : path;
};

/**
 * Decodes a JSON Web Token (JWT) and returns its payload.
 * @template Payload The type of the payload contained in the JWT.
 * @param {string} token The JWT to decode.
 * @returns {Payload} The decoded payload.
 */
export const decodeJWT = <Payload = any>(token: string): Payload => {
  return jwt.decode(token) as Payload;
};

/**
 * Inspect if the path is a private route.
 * @param fullPath The full path to inspect.
 * @param privateRoutes An array of private route paths.
 * @returns A boolean indicating whether the path is a private route.
 */
/**
 * Checks if a given path corresponds to a private route based on a list of private routes.
 * @param {string} fullPath The full path to check.
 * @param {string[]} privateRoutes An array of private routes.
 * @returns {boolean} `true` if the path corresponds to a private route, `false` otherwise.
 */
export const checkPrivateRoute = (fullPath: string, privateRoutes: string[]): boolean => {
  if (fullPath === '/') {
    return true;
  }
  const filteredRoutes = privateRoutes.filter(route => route !== '/');
  return filteredRoutes.some(path => fullPath.startsWith(path));
};

/**
 * Converts a File object to a URL representing the file's data.
 * @param {File} file The File object to convert.
 * @returns {string} The URL representing the file's data.
 */
export const convertFileToUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Builds a query string from an object of parameters.
 * @param {Object} params - The object containing the parameters.
 * @returns {string} The generated query string.
 * @throws {Error} If params is not an object.
 */
export function buildQueryString(params: any) {
  if (typeof params !== 'object' || params === null) {
    throw new Error('Params must be an object');
  }

  const encodedParams = [];

  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const value = params[key];

      if (Array.isArray(value)) {
        value.forEach(item => {
          encodedParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
        });
      } else {
        encodedParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }

  return encodedParams.join('&');
}

/**
 * Render Tree Comment in Post Detail
 * @param {Array} array - The object containing the parameters.
 * @returns {string} The generated query string.
 * @throws {Error} If params is not an object.
 */

export interface Comment {
  id: number;
  content: string;
  userId: number;
  user: {
    id: number;
    username: string;
    avatar: string;
  };
  postId: number;
  replyId: number | null;
  updatedAt: Date;
}

export interface CommentWithChildren extends Comment {
  children?: CommentWithChildren[];
}

export const listComments: Comment[] = [
  // Danh sách comment như đã cung cấp
];

export const buildCommentTree = (comments: Comment[]): CommentWithChildren[] => {
  const commentMap: { [key: number]: CommentWithChildren } = {};
  const commentTree: CommentWithChildren[] = [];

  comments.forEach(comment => {
    commentMap[comment.id] = { ...comment, children: [] };
  });

  comments.forEach(comment => {
    if (comment.replyId !== null && commentMap[comment.replyId]) {
      commentMap[comment.replyId].children?.push(commentMap[comment.id]);
    } else {
      commentTree.push(commentMap[comment.id]);
    }
  });

  return commentTree;
};

// Sử dụng hàm để tạo cây comment
// const commentTree = buildCommentTree(listComments);
// console.log(commentTree);

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}


export const handleCheckUserExist = (array: { userId: number }[], userId: number, key = 'userId') => {
  return array?.some(item => item[key] === userId);
};