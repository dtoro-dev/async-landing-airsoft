const content = null || document.getElementById("content");
const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UC2x6RDYBozG5US_FpdoX5WQ&part=snippet%2Cid&order=date&maxResults=10";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1a514db300msh432eb45328a6d9ep100e5fjsnf89b888c5ea2",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function $(url) {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
}

(async () => {
  try {
    const videos = await $(API);

    let view = videos.items
      .map(
        (video) => `
      <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
        >
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.thumbnails.high.description}" class="w-full" />
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
    `
      )
      .slice(0, 4)
      .join("");

    content.innerHTML = view;
  } catch (error) {
    console.error(error);
    content.innerHTML = `<p>API no disponible</p>`;
  }
})();
