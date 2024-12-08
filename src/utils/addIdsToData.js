export default function addIdsToData(data) {
  let itemId = 1;
  return data.map((category, categoryIndex) => ({
    ...category,
    id: category.id || categoryIndex + 1,
    items: category.items.map((item) => ({
      ...item,
      id: item.id || itemId++,
    })),
  }));
}
