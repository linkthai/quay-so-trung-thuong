export default function useSEO(
  title: string,
  data: { description?: string; image?: string } = {}
) {
  return {
    title,
    description: data.description,
    image: data.image,
    openGraph: {
      images: [
        {
          url: data.image,
        },
      ],
    },
  };
}
