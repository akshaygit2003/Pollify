export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getPollBookmarked = (pollId, userBookmarks = []) => {
  return userBookmarks.includes(pollId);
};
