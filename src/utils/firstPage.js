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
    case "rec":
      return "/recommendations";
    case "clients-general":
      return "/accounting/clients/clients-list-general";
    case "clients-pending":
      return "/accounting/clients/clients-list-in-work";
    case "distributors":
      return "/accounting/distributors";
    case "invoices":
      return "/accounting/invoices/goods";
    case "main":
      return "/main"
    case "default":
    default:
      return "/video-control";
  }
}
