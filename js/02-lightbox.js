import { galleryItems } from "./gallery-items.js";

document.querySelector("ul.gallery").insertAdjacentHTML(
  "afterbegin",
  galleryItems
    .map(
      ({ preview, original, description }) => `
        <li>
            <a class="gallery__item" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
        </li>
    `
    )
    .join("")
);

new SimpleLightbox("ul.gallery a", {
  captionsData: "alt",
  captionPosition: "outside",
  captionDelay: 250,
});

