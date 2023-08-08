export const getCookieByName = (name) => {
  const value = `; ${document.cookie}`;
  console.log(value);
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export function removeCookieByKey(cookieKey) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const [key, value] = cookie.split('=');
    if (key === cookieKey) {
      document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      break; // Stop iterating after finding and removing the desired cookie
    }
  }
}
