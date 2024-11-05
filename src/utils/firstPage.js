export default function firstPage(userData) {
  const userFirstPage = userData?.first_page || "default"; // Додаємо перевірку

  switch (userFirstPage) {
    case "crm":
      return "/crm";
    case "carReport":
      return "/report";
    case "Settings":
      return "/settings";
    case "v-c":
      return "/video-control";
    case "default":
    default:
      return "/video-control";
  }
}
