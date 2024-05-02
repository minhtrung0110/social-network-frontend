/**
 * Returns a formatted date/time string for a post based on its creation and update time.
 * @param {string} createdAt The creation time of the post (as a string).
 * @param {string} updatedAt The update time of the post (as a string).
 * @returns {string} The formatted date/time string of the post.
 */
export function getDateTimePost(createdAt: string, updatedAt: string): string {
  const date =
    new Date(createdAt).getTime() !== new Date(updatedAt).getTime()
      ? new Date(updatedAt)
      : new Date(createdAt);

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

/**
 * Formats a date string into a human-readable date and time representation.
 * @param {string} dateString The date string to format.
 * @returns {string} The formatted date and time string.
 */
export function formatDateString(dateString: string): string {
  // Options for formatting the date
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  // Options for formatting the time
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
  };

  // Convert the date string to a Date object
  const date = new Date(dateString);

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);

  // Format the time
  const formattedTime = date.toLocaleTimeString([], timeOptions);

  // Return the formatted date and time string
  return `${formattedDate} at ${formattedTime}`;
}

/**
 * Formats a timestamp into a human-readable relative time representation.
 * If the timestamp is more than 30 days old, it formats it as a date string.
 * @param {string} timestamp The timestamp to format (default: current time).
 * @returns {string} The formatted relative time string.
 */
export const multiFormatDateString = (timestamp: string = ''): string => {
  // Convert timestamp to seconds
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);

  // Convert timestamp to Date object
  const date: Date = new Date(timestampNum * 1000);

  // Get current date
  const now: Date = new Date();

  // Calculate time difference in milliseconds
  const diff: number = now.getTime() - date.getTime();

  // Calculate time difference in seconds, minutes, hours, and days
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  // Determine the format based on the time difference
  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp); // Use formatDateString function for dates older than 30 days
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return 'Just now';
  }
};