export default function addIdsToData() {
  const generateUniqueId = () =>
    `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  return {
    id: generateUniqueId(),
  };
}
